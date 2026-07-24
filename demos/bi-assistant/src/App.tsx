import React, { useState, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatInterface } from './components/ChatInterface';
import { QuestionLibrary } from './components/QuestionLibrary';
import { OverviewDashboard } from './components/OverviewDashboard';
import { DatasetInspector } from './components/DatasetInspector';
import { CURATED_QUESTIONS } from './data/questionLibrary';
import { ViewMode } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('assistant');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<{ text: string; id: string; time: number } | null>(null);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDashboardAskQuestion = (qId: string) => {
    const found = CURATED_QUESTIONS.find(q => q.id === qId);
    const text = found ? found.text : "Show detailed business performance analysis";
    setActiveQuestion({ text, id: qId || 'q1', time: Date.now() });
    setViewMode('assistant');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Header */}
      <ChatHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Body */}
      <main className="flex-1 overflow-hidden relative flex flex-row">
        {viewMode === 'assistant' && (
          <>
            {/* Sidebar: Curated Prompt Library */}
            <aside className="w-[380px] lg:w-[420px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto hidden md:block shrink-0">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Question Library</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Click any query below to run automated ledger analysis</p>
              </div>
              <div className="p-4">
                <QuestionLibrary
                  onSelectQuestion={(q) => setActiveQuestion({ text: q.text, id: q.id, time: Date.now() })}
                  activeQuestionId={activeQuestion?.id}
                />
              </div>
            </aside>

            {/* Chat Feed Panel */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <ChatInterface activeQuestion={activeQuestion} />
            </div>
          </>
        )}

        {viewMode === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full">
            <OverviewDashboard onAskQuestion={handleDashboardAskQuestion} />
          </div>
        )}

        {viewMode === 'dataset' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full">
            <DatasetInspector />
          </div>
        )}
      </main>

    </div>
  );
}

