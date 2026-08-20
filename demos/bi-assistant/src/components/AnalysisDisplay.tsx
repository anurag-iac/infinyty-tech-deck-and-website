import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Copy, Table as TableIcon, 
  BarChart3, ShieldCheck, ArrowUpRight, ArrowDownRight, 
  Layers, Check, FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart as ReLineChart, Line, BarChart as ReBarChart, Bar, 
  AreaChart as ReAreaChart, Area, PieChart as RePieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart 
} from 'recharts';
import { AnalysisResult } from '../types';

interface AnalysisDisplayProps {
  analysis: AnalysisResult;
}

const COLOR_PALETTE = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899', '#f97316'];

const renderFormattedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({
  analysis
}) => {
  const [viewTab, setViewTab] = useState<'chart' | 'table'>('chart');
  const [copied, setCopied] = useState(false);
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Copy handler
  const handleCopy = () => {
    const textToCopy = `
Question: ${analysis.question}
Summary: ${analysis.summary}

Key Findings:
${analysis.keyFindings.map(f => `• ${f}`).join('\n')}

Key Insights:
${analysis.insights.map(i => `• ${i}`).join('\n')}

Recommendations:
${analysis.recommendations.map(r => `• ${r.title}: ${r.desc}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // CSV Export handler
  const handleExportCSV = () => {
    if (!analysis.tableHeaders || !analysis.tableRows) return;
    const headers = analysis.tableHeaders.join(',');
    const rows = analysis.tableRows.map(r => 
      analysis.tableHeaders.map(h => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${analysis.questionId}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter supporting data table
  const filteredRows = (analysis.tableRows || []).filter(row => {
    if (!tableSearch) return true;
    return Object.values(row).some(v => 
      String(v).toLowerCase().includes(tableSearch.toLowerCase())
    );
  });

  const pageSize = 5;
  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Render chart based on chartType
  const renderChart = () => {
    const { chartType, chartData, chartConfig } = analysis;
    if (!chartData || chartData.length === 0) return null;

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <ReLineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={chartConfig.xAxisKey} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />
              {chartConfig.dataKeys.map((dk, idx) => (
                <Line
                  key={dk.key}
                  type="monotone"
                  dataKey={dk.key}
                  name={dk.name}
                  stroke={dk.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </ReLineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <ReAreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={chartConfig.xAxisKey} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />
              {chartConfig.dataKeys.map((dk, idx) => (
                <Area
                  key={dk.key}
                  type="monotone"
                  dataKey={dk.key}
                  name={dk.name}
                  stroke={dk.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                  fill={dk.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              ))}
            </ReAreaChart>
          </ResponsiveContainer>
        );

      case 'donut':
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <RePieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Pie
                data={chartData}
                dataKey={chartConfig.dataKeys[0]?.key || 'Revenue'}
                nameKey={chartConfig.xAxisKey}
                cx="50%"
                cy="50%"
                innerRadius={chartType === 'donut' ? 50 : 0}
                outerRadius={80}
                paddingAngle={3}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                ))}
              </Pie>
            </RePieChart>
          </ResponsiveContainer>
        );

      case 'composed':
        return (
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={chartConfig.xAxisKey} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />
              <Bar dataKey="Revenue" name="Revenue ($)" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="Profit" name="Profit ($)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'bar':
      default:
        return (
          <ResponsiveContainer width="100%" height={240}>
            <ReBarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={chartConfig.xAxisKey} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />
              {chartConfig.dataKeys.map((dk, idx) => (
                <Bar
                  key={dk.key}
                  dataKey={dk.key}
                  name={dk.name}
                  fill={dk.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </ReBarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Executive Summary */}
      <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-[11px] uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Executive Briefing
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/60 text-slate-600 dark:text-slate-300 transition-colors"
            title="Copy response"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <p>{renderFormattedText(analysis.summary)}</p>
      </div>

      {/* KPI Cards Grid */}
      {analysis.kpis && analysis.kpis.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {analysis.kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-2xs"
            >
              <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                {kpi.label}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {kpi.value}
              </div>
              
              {kpi.change && (
                <div className={`mt-0.5 flex items-center gap-0.5 text-[10px] font-semibold ${
                  kpi.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {kpi.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{kpi.change}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Chart & Table Card Container */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-2xs">
        
        <div className="p-2.5 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2 flex-wrap bg-slate-50/50 dark:bg-slate-900/40">
          <div className="text-xs font-bold text-slate-900 dark:text-white">
            {analysis.chartConfig.title}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 text-[10px]">
              <button
                onClick={() => setViewTab('chart')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all ${
                  viewTab === 'chart'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>Chart</span>
              </button>

              <button
                onClick={() => setViewTab('table')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded font-semibold transition-all ${
                  viewTab === 'table'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <TableIcon className="w-3 h-3" />
                <span>Table</span>
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Export Table CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>
        </div>

        <div className="p-2.5">
          {viewTab === 'chart' ? (
            <div>
              {renderChart()}
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Search table rows..."
                value={tableSearch}
                onChange={(e) => { setTableSearch(e.target.value); setCurrentPage(1); }}
                className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-44 text-xs focus:outline-none"
              />

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 text-[10px]">
                    <tr>
                      {analysis.tableHeaders.map((header) => (
                        <th key={header} className="px-2.5 py-1.5 whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono text-[10px]">
                    {paginatedRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                        {analysis.tableHeaders.map((header) => (
                          <td key={header} className="px-2.5 py-1.5 whitespace-nowrap">
                            {row[header] !== undefined ? String(row[header]) : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Key Findings & Strategic Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
        
        {/* Key Findings */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Key Data Findings</span>
          </div>
          <ul className="space-y-1 text-slate-600 dark:text-slate-300">
            {analysis.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                <span>{renderFormattedText(finding)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Recommendations */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>AI Recommendations</span>
          </div>
          <div className="space-y-1.5">
            {analysis.recommendations.map((rec, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white mb-0.5 text-[11px]">
                  <span>{renderFormattedText(rec.title)}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-bold">
                    {rec.priority}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[10px] leading-relaxed">
                  {renderFormattedText(rec.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Math Governance Footer */}
      <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-0.5">
        <button
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="hover:underline flex items-center gap-1 text-slate-500"
        >
          <Layers className="w-3 h-3 text-slate-400" />
          <span>{showCalculationDetails ? 'Hide math governance' : 'How was this calculated?'}</span>
        </button>

        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
          ✓ {analysis.confidence} Confidence
        </span>
      </div>

      {showCalculationDetails && (
        <div className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-800/50 text-[10px] text-slate-600 dark:text-slate-400 space-y-1">
          <p>{analysis.calculationExplanation}</p>
        </div>
      )}

    </div>
  );
};

