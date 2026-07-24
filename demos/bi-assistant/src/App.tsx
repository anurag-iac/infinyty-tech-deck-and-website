import React, { useState, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatInterface } from './components/ChatInterface';
import { OverviewDashboard } from './components/OverviewDashboard';
import { DatasetInspector } from './components/DatasetInspector';
import { ViewMode } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('assistant');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {viewMode === 'assistant' && (
          <ChatInterface />
        )}

        {viewMode === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full">
            <OverviewDashboard onAskQuestion={() => setViewMode('assistant')} />
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

