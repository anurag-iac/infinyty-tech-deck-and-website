import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Sparkles, User, Bot, RefreshCw, Paperclip, 
  Trash2, Lightbulb, TrendingUp, BarChart2, PieChart, ShieldCheck
} from 'lucide-react';
import { CURATED_QUESTIONS } from '../data/questionLibrary';
import { QuestionItem, AnalysisResult } from '../types';
import { analyzeBusinessQuestion } from '../data/analyticsEngine';
import { AnalysisDisplay } from './AnalysisDisplay';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content?: string;
  analysisResult?: AnalysisResult;
  isLoading?: boolean;
}

interface ChatInterfaceProps {
  activeQuestion?: { text: string; id: string; time: number } | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ activeQuestion }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  // Listen to external triggers from Question Library sidebar
  useEffect(() => {
    if (activeQuestion) {
      handleSendQuestion(activeQuestion.text, activeQuestion.id);
    }
  }, [activeQuestion]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: "Welcome! I'm your BI Bot. I've indexed 10,000 order transactions across 2,000 customers and 500 products.\n\nSelect a query from the Question Library sidebar to get instant interactive charts, KPIs, and AI recommendations."
        }
      ]);
    }
  }, []);

  // Handle question trigger
  const handleSendQuestion = (questionText: string, questionId?: string) => {
    if (!questionText.trim() || isAnalyzing) return;

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Append User Message
    const userMessage: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      timestamp: now,
      content: questionText
    };

    // 2. Append Loading Assistant Message
    const loadingMessage: ChatMessage = {
      id: assistantMessageId,
      sender: 'assistant',
      timestamp: now,
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputValue('');
    setIsAnalyzing(true);

    // 3. Perform Analysis & Gemini Enrichment
    setTimeout(async () => {
      // Find matching question ID or use 'custom'
      const matchedQ = CURATED_QUESTIONS.find(q => q.text.toLowerCase() === questionText.toLowerCase());
      const qId = questionId || (matchedQ ? matchedQ.id : 'q1');

      const baseResult = analyzeBusinessQuestion(qId, questionText);

      // Attempt backend Gemini enrichment if online
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: questionText,
            contextSummary: {
              category: baseResult.category,
              summary: baseResult.summary,
              kpis: baseResult.kpis
            }
          })
        });
        const data = await res.json();
        if (data.enriched && data.recommendations && data.recommendations.length > 0) {
          baseResult.recommendations = data.recommendations;
        }
      } catch (err) {
        // Fallback to deterministic analytics
      }

      // Update Assistant Message with Analysis Result
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId
            ? {
                ...msg,
                isLoading: false,
                analysisResult: baseResult
              }
            : msg
        )
      );
      setIsAnalyzing(false);
    }, Math.floor(Math.random() * 2000) + 3000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: "Chat history cleared. How can I assist you with your business data today?"
      }
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 max-w-5xl mx-auto w-full relative">
      
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-slate-800 dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble Content */}
            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-tl-xs shadow-xs'
              }`}
            >
              {/* Header inside bubble */}
              <div className="flex items-center justify-between gap-3 text-[10px] opacity-70">
                <span className="font-semibold">
                  {msg.sender === 'user' ? 'You' : 'BI Bot'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Text content */}
              {msg.content && (
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
              )}

              {/* Loading thinking state */}
              {msg.isLoading && (
                <div className="flex items-center gap-3 py-2 text-slate-500 dark:text-slate-400">
                  <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className="text-xs font-medium animate-pulse">
                    Querying 10,000 order transactions & calculating business metrics...
                  </span>
                </div>
              )}

              {/* Embedded Analysis Result Component */}
              {msg.analysisResult && (
                <div className="pt-2">
                  <AnalysisDisplay analysis={msg.analysisResult} />
                </div>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips (when initial chat or idle) */}
      {!isAnalyzing && (
        <div className="px-4 py-2 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Suggested Questions:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CURATED_QUESTIONS.slice(0, 4).map((q) => (
              <button
                key={q.id}
                onClick={() => handleSendQuestion(q.text, q.id)}
                className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Input Form */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuestion(inputValue);
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value=""
              readOnly
              disabled
              placeholder="Select a question from the Question Library sidebar to analyze..."
              className="w-full px-4 py-3 pl-4 pr-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-500 dark:text-slate-400 placeholder-slate-400 dark:placeholder-slate-500 cursor-not-allowed transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={true}
            className="p-3 rounded-xl bg-slate-300 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed transition-all shrink-0 flex items-center justify-center"
            title="Custom input disabled in Demo Mode"
          >
            <Send className="w-4 h-4" />
          </button>

          {messages.length > 1 && (
            <button
              type="button"
              onClick={handleClearChat}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition-all shrink-0"
              title="Clear Chat History"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

    </div>
  );
};
