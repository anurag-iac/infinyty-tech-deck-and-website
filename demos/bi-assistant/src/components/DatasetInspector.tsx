import React, { useState } from 'react';
import { Database, Search, FileSpreadsheet, Key, Table as TableIcon, Layers, ShieldCheck } from 'lucide-react';
import { getSampleBusinessDataset } from '../data/sampleDataset';

export const DatasetInspector: React.FC = () => {
  const dataset = getSampleBusinessDataset();
  const [activeSheet, setActiveSheet] = useState<'orders' | 'customers' | 'products' | 'targets'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentData = activeSheet === 'orders' 
    ? dataset.orders 
    : activeSheet === 'customers' 
    ? dataset.customers 
    : activeSheet === 'products' 
    ? dataset.products 
    : dataset.salesTargets;

  // Filter rows based on search
  const filteredData = currentData.filter((row: any) => {
    if (!searchQuery) return true;
    return Object.values(row).some(v => 
      String(v).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getHeaders = () => {
    if (paginatedData.length === 0) return [];
    return Object.keys(paginatedData[0]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Dataset Inspector — sample_business_data.xlsx
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Automated schema recognition, column typing, primary key detection, and full relation mapping.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Demo Dataset Active</span>
        </div>
      </div>

      {/* Semantic Schema Understanding Card */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Automated Semantic Schema Detection</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="font-semibold text-slate-300 mb-0.5">Sheet 1: Orders</div>
            <div className="text-slate-400">10,000 Records • 23 Cols</div>
            <div className="text-[11px] text-blue-400 font-mono mt-1">PK: Order ID | FK: CustID, ProdID</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="font-semibold text-slate-300 mb-0.5">Sheet 2: Customers</div>
            <div className="text-slate-400">2,000 Records • 10 Cols</div>
            <div className="text-[11px] text-purple-400 font-mono mt-1">PK: Customer ID</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="font-semibold text-slate-300 mb-0.5">Sheet 3: Products</div>
            <div className="text-slate-400">500 Records • 7 Cols</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">PK: Product ID</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="font-semibold text-slate-300 mb-0.5">Sheet 4: Sales Targets</div>
            <div className="text-slate-400">120 Records • 4 Cols</div>
            <div className="text-[11px] text-amber-400 font-mono mt-1">Composite Key: Month + Rep</div>
          </div>
        </div>
      </div>

      {/* Sheet Tabs & Table Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden space-y-4 p-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
          
          {/* Sheet Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => { setActiveSheet('orders'); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSheet === 'orders'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Orders ({dataset.orders.length.toLocaleString()})</span>
            </button>

            <button
              onClick={() => { setActiveSheet('customers'); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSheet === 'customers'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Customers ({dataset.customers.length.toLocaleString()})</span>
            </button>

            <button
              onClick={() => { setActiveSheet('products'); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSheet === 'products'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Products ({dataset.products.length.toLocaleString()})</span>
            </button>

            <button
              onClick={() => { setActiveSheet('targets'); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSheet === 'targets'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Sales Targets ({dataset.salesTargets.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeSheet}...`}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 max-h-[480px]">
          <table className="w-full text-left text-xs text-slate-800 dark:text-slate-200">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {getHeaders().map((h) => (
                  <th key={h} className="px-3.5 py-2.5 whitespace-nowrap bg-slate-50 dark:bg-slate-900">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono text-[11px]">
              {paginatedData.map((row: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  {getHeaders().map((h) => (
                    <td key={h} className="px-3.5 py-2 whitespace-nowrap">
                      {row[h] !== undefined ? String(row[h]) : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
          <span>
            Showing {paginatedData.length} of {filteredData.length.toLocaleString()} rows (Page {currentPage} of {totalPages})
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
