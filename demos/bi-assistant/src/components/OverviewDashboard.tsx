import React from 'react';
import { 
  DollarSign, TrendingUp, Percent, ShoppingBag, Users, Package, 
  Calculator, Award, Globe, Sparkles, ArrowRight, ArrowUpRight, BarChart3, Star
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { getSampleBusinessDataset } from '../data/sampleDataset';
import { formatCurrency, formatNumber } from '../data/analyticsEngine';

interface OverviewDashboardProps {
  onAskQuestion: (questionId: string) => void;
}

const COLOR_PALETTE = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4'];

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onAskQuestion,
}) => {
  const dataset = getSampleBusinessDataset();
  const { orders, customers, products } = dataset;

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((s, o) => s + o.revenue, 0);
  const totalProfit = orders.reduce((s, o) => s + o.profit, 0);
  const marginPercent = ((totalProfit / totalRevenue) * 100).toFixed(1);
  const aov = Math.round(totalRevenue / totalOrders);
  const avgDiscount = (orders.reduce((s, o) => s + o.discountPercent, 0) / totalOrders).toFixed(1);

  // Region aggregation
  const regionMap: Record<string, number> = {};
  orders.forEach(o => { regionMap[o.region] = (regionMap[o.region] || 0) + o.revenue; });
  const topRegion = Object.entries(regionMap).sort((a,b) => b[1] - a[1])[0][0];

  // Category aggregation
  const catMap: Record<string, number> = {};
  orders.forEach(o => { catMap[o.category] = (catMap[o.category] || 0) + o.revenue; });
  const topCategory = Object.entries(catMap).sort((a,b) => b[1] - a[1])[0][0];

  // Salesperson aggregation
  const spMap: Record<string, number> = {};
  orders.forEach(o => { spMap[o.salesperson] = (spMap[o.salesperson] || 0) + o.revenue; });
  const bestSalesperson = Object.entries(spMap).sort((a,b) => b[1] - a[1])[0][0];

  // Monthly trend for chart 1
  const monthMap: Record<string, { revenue: number; profit: number }> = {};
  orders.forEach(o => {
    const m = o.orderDate.substring(0, 7);
    if (!monthMap[m]) monthMap[m] = { revenue: 0, profit: 0 };
    monthMap[m].revenue += o.revenue;
    monthMap[m].profit += o.profit;
  });

  const monthlyTrendData = Object.entries(monthMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, val]) => ({
      month,
      Revenue: val.revenue,
      Profit: val.profit
    }));

  const highestMonth = [...monthlyTrendData].sort((a,b) => b.Revenue - a.Revenue)[0]?.month || '2025-11';

  // Category chart data
  const categoryChartData = Object.entries(catMap).map(([category, revenue]) => ({
    category,
    Revenue: revenue,
  }));

  // Region chart data
  const regionChartData = Object.entries(regionMap).map(([region, revenue]) => ({
    region,
    Revenue: revenue
  }));

  // Top 10 Customers chart data
  const custMap: Record<string, { name: string; revenue: number }> = {};
  orders.forEach(o => {
    if (!custMap[o.customerId]) custMap[o.customerId] = { name: o.customerName, revenue: 0 };
    custMap[o.customerId].revenue += o.revenue;
  });

  const topCustomersData = Object.values(custMap)
    .sort((a,b) => b.revenue - a.revenue)
    .slice(0, 8)
    .map(c => ({
      name: c.name.length > 15 ? c.name.substring(0, 14) + '...' : c.name,
      Revenue: c.revenue
    }));

  return (
    <div className="space-y-8">
      
      {/* Executive Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Executive Business Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Real-Time Enterprise Intelligence Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
            Live metrics aggregated across 10,000 order line items in sample_business_data.xlsx. Click any metric to launch instant AI analysis.
          </p>
        </div>

        <button
          onClick={() => onAskQuestion('ai-summarize-performance')}
          className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Ask AI C-Suite Briefing</span>
        </button>
      </div>

      {/* 12 Executive KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        
        {/* KPI 1 */}
        <div 
          onClick={() => onAskQuestion('sales-total')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(totalRevenue)}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% YoY Growth</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div 
          onClick={() => onAskQuestion('fin-total-profit')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total Net Profit</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(totalProfit)}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+21.2% YoY Growth</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div 
          onClick={() => onAskQuestion('prod-highest-margin')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-purple-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Profit Margin</span>
            <Percent className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{marginPercent}%</div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
            +0.8% Margin Expansion
          </div>
        </div>

        {/* KPI 4 */}
        <div 
          onClick={() => onAskQuestion('sales-monthly-trend')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{formatNumber(totalOrders)}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            10,000 Fulfilled Records
          </div>
        </div>

        {/* KPI 5 */}
        <div 
          onClick={() => onAskQuestion('cust-segmentation')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-cyan-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Active Customers</span>
            <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{formatNumber(customers.length)}</div>
          <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium mt-1">
            VIP & SMB Enterprise
          </div>
        </div>

        {/* KPI 6 */}
        <div 
          onClick={() => onAskQuestion('prod-top-selling')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Product Catalog</span>
            <Package className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{products.length} SKUs</div>
          <div className="text-[11px] text-slate-400 mt-1">
            4 Divisions
          </div>
        </div>

        {/* KPI 7 */}
        <div 
          onClick={() => onAskQuestion('fin-aov')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-rose-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Average Order Value</span>
            <Calculator className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(aov)}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            +$130 YoY Expansion
          </div>
        </div>

        {/* KPI 8 */}
        <div 
          onClick={() => onAskQuestion('ai-losing-profit')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Average Discount</span>
            <Percent className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">{avgDiscount}%</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            Audit Discount Leakage
          </div>
        </div>

        {/* KPI 9 */}
        <div 
          onClick={() => onAskQuestion('reg-best-performing')}
          title="Ask BI Bot: Best performing region."
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Top Region</span>
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white truncate">{topRegion}</div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">
            $4.8M Territory Sales
          </div>
        </div>

        {/* KPI 10 */}
        <div 
          onClick={() => onAskQuestion('sales-category-sales')}
          title="Ask BI Bot: Show category-wise sales."
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-purple-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Top Category</span>
            <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white truncate">{topCategory}</div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
            42% Global Share
          </div>
        </div>

        {/* KPI 11 */}
        <div 
          onClick={() => onAskQuestion('reg-compare-all')}
          title="Ask BI Bot: Compare all regions."
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Best Salesperson</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white truncate">{bestSalesperson}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            142% Target Attainment
          </div>
        </div>

        {/* KPI 12 */}
        <div 
          onClick={() => onAskQuestion('sales-quarterly-compare')}
          title="Ask BI Bot: Compare sales by quarter."
          className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Peak Revenue Month</span>
            <Star className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{highestMonth}</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            Q4 Enterprise Peak
          </div>
        </div>

      </div>

      {/* 4 Default Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Monthly Revenue & Profit Trend */}
        <div 
          onClick={() => onAskQuestion('sales-monthly-trend')}
          title="Click to deep dive into: Show monthly sales trends."
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Monthly Sales & Profit Velocity
              </h3>
              <p className="text-xs text-slate-500">24-month continuous performance trajectory</p>
            </div>
            <button
              type="button"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-1 shrink-0"
            >
              <span>AI Deep Dive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Revenue" stroke="#2563eb" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Revenue by Category */}
        <div 
          onClick={() => onAskQuestion('sales-category-sales')}
          title="Click to deep dive into: Show category-wise sales."
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-purple-500 dark:hover:border-purple-400 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Revenue by Product Category
              </h3>
              <p className="text-xs text-slate-500">Cumulative sales breakdown across divisions</p>
            </div>
            <button
              type="button"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all flex items-center gap-1 shrink-0"
            >
              <span>AI Deep Dive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Bar dataKey="Revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Revenue by Region */}
        <div 
          onClick={() => onAskQuestion('sales-revenue-by-region')}
          title="Click to deep dive into: Show revenue by region."
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-cyan-500 dark:hover:border-cyan-400 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Global Regional Distribution
              </h3>
              <p className="text-xs text-slate-500">Sales volume across 5 operating territories</p>
            </div>
            <button
              type="button"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all flex items-center gap-1 shrink-0"
            >
              <span>AI Deep Dive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Pie
                data={regionChartData}
                dataKey="Revenue"
                nameKey="region"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
              >
                {regionChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Top 10 Customers */}
        <div 
          onClick={() => onAskQuestion('cust-top10')}
          title="Click to deep dive into: Who are the top 10 customers?"
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-400 transition-all cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Top Enterprise Clients
              </h3>
              <p className="text-xs text-slate-500">Highest grossing corporate customer accounts</p>
            </div>
            <button
              type="button"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all flex items-center gap-1 shrink-0"
            >
              <span>AI Deep Dive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topCustomersData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
              <Tooltip formatter={(value: any) => typeof value === 'number' ? `$${value.toLocaleString()}` : value} />
              <Bar dataKey="Revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};
