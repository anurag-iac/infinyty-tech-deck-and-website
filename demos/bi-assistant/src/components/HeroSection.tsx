import React from 'react';
import { Sparkles, BarChart3, Database, Layers, CheckCircle2 } from 'lucide-react';
import { ViewMode } from '../types';

interface HeroSectionProps {
  onSelectViewMode: (mode: ViewMode) => void;
  onSelectQuickQuestion?: (questionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectViewMode,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50 to-white dark:from-slate-900/90 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-12 sm:py-16">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-tr from-blue-400/10 via-indigo-400/10 to-cyan-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 border border-blue-200/80 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Enterprise AI Data Analyst Demo</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            AI Business Intelligence Assistant
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Ask questions in plain English and receive instant analytics, interactive visualizations, and actionable business insights from enterprise data.
          </p>

          {/* Key Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm backdrop-blur-sm text-left">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Orders Analyzed</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">10,000</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">100% Math Verified</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm backdrop-blur-sm text-left">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Total Sales Revenue</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">$12.8M</div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">+18.4% YoY Growth</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm backdrop-blur-sm text-left">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Active Customers</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">2,000</div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">VIP & SMB Segments</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm backdrop-blur-sm text-left">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Catalog SKUs</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">500</div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">4 Product Divisions</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onSelectViewMode('assistant')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Assistant</span>
            </button>

            <button
              onClick={() => onSelectViewMode('dashboard')}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>View Executive Dashboard</span>
            </button>

            <button
              onClick={() => onSelectViewMode('dataset')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm border border-slate-200/80 dark:border-slate-700 transition-all flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span>Inspect Sample Excel Data</span>
            </button>
          </div>

          {/* Consistency Checks List */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Automatic Data Structure Detection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Interactive Recharts & Data Tables
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Actionable AI Strategic Recommendations
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
