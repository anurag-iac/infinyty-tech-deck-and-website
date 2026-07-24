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
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter business questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredQuestions.length}</span> curated questions
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Questions ({CURATED_QUESTIONS.length})
          </button>

          {CATEGORY_METADATA.map((cat) => {
            const count = CURATED_QUESTIONS.filter(q => q.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as QuestionCategory)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {renderIcon(cat.icon, 'w-3.5 h-3.5')}
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Question Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredQuestions.map((question) => {
          const isActive = activeQuestionId === question.id;

          return (
            <div
              key={question.id}
              onClick={() => onSelectQuestion(question)}
              className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Header row with Icon & Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                  }`}>
                    {renderIcon(question.icon, 'w-4 h-4')}
                  </div>

                  {question.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {question.badge}
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {question.text}
                </h3>

                {/* Description */}
                {question.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                    {question.description}
                  </p>
                )}
              </div>

              {/* Footer action trigger */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs font-medium text-blue-600 dark:text-blue-400">
                <span>Analyze Dataset</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
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
