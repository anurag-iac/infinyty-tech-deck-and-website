import React, { useState } from 'react';
import { 
  TrendingUp, Users, Package, DollarSign, Globe, Sparkles, 
  Search, ArrowRight, LineChart, Award, BarChart2, Map, Navigation, 
  PieChart, Crown, Grid, Zap, ArrowDownRight, Percent, AlertTriangle, 
  Briefcase, Calculator, Activity, Trophy, Compass, Building2, ShieldAlert, 
  TrendingDown, Target, ShieldCheck, HelpCircle
} from 'lucide-react';
import { QuestionItem, QuestionCategory } from '../types';
import { CATEGORY_METADATA, CURATED_QUESTIONS } from '../data/questionLibrary';

interface QuestionLibraryProps {
  onSelectQuestion: (question: QuestionItem) => void;
  activeQuestionId?: string;
}

// Icon mapper helper
const renderIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Package': return <Package className={className} />;
    case 'DollarSign': return <DollarSign className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'LineChart': return <LineChart className={className} />;
    case 'Award': return <Award className={className} />;
    case 'BarChart2': return <BarChart2 className={className} />;
    case 'Map': return <Map className={className} />;
    case 'Navigation': return <Navigation className={className} />;
    case 'PieChart': return <PieChart className={className} />;
    case 'Crown': return <Crown className={className} />;
    case 'Grid': return <Grid className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'ArrowDownRight': return <ArrowDownRight className={className} />;
    case 'Percent': return <Percent className={className} />;
    case 'AlertTriangle': return <AlertTriangle className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Calculator': return <Calculator className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Trophy': return <Trophy className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'TrendingDown': return <TrendingDown className={className} />;
    case 'Target': return <Target className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

export const QuestionLibrary: React.FC<QuestionLibraryProps> = ({
  onSelectQuestion,
  activeQuestionId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = CURATED_QUESTIONS.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (q.description && q.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Search and Category Filter Bar */}
      <div className="bg-white dark:bg-slate-800/90 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2.5">
        
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Category Dropdown Select */}
          <div className="relative w-full sm:w-44 shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as QuestionCategory | 'all')}
              className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
            >
              <option value="all">All Categories ({CURATED_QUESTIONS.length})</option>
              {CATEGORY_METADATA.map((cat) => {
                const count = CURATED_QUESTIONS.filter(q => q.category === cat.id).length;
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-between px-0.5">
          <span>Showing <strong className="text-slate-800 dark:text-slate-200">{filteredQuestions.length}</strong> questions</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Clear Filter
            </button>
          )}
        </div>

      </div>

      {/* Question Cards List */}
      <div className="grid grid-cols-1 gap-2">
        {filteredQuestions.map((question) => {
          const isActive = activeQuestionId === question.id;

          return (
            <div
              key={question.id}
              onClick={() => onSelectQuestion(question)}
              className={`group relative p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                isActive
                  ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-600 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                }`}>
                  {renderIcon(question.icon, 'w-3.5 h-3.5')}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-xs leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {question.text}
                    </h3>
                    {question.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shrink-0">
                        {question.badge}
                      </span>
                    )}
                  </div>
                  {question.description && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {question.description}
                    </p>
                  )}
                </div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">No matching questions found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Try clearing your search query or selecting a different category tab.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-medium shadow-sm hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
