"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/AuthProvider';
import { API } from '../../../../lib/api';

export default function HistoryPage() {
  const { userId } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`${API}/users/${userId}/history`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (data && data.history) {
          // Reverse to show most recent first
          setHistory([...data.history].reverse());
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Interaction History</h1>
        <p className="text-gray-400 text-lg">
          We analyzed your past clicks. See how ECHO decides what truly represents your taste, and what to filter out.
        </p>
      </div>

      <div className="space-y-6">
        {history.map((item, idx) => {
          const isKept = item.kept;
          
          return (
            <div 
              key={idx} 
              className={`flex overflow-hidden rounded-2xl border transition-colors ${
                isKept 
                  ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
                  : 'bg-gray-900/50 border-amber-900/30 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Status Indicator Bar */}
              <div className={`w-2 shrink-0 ${isKept ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              
              {/* Content Area */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 flex-1 items-center">
                
                {/* Minimalist Icon */}
                <div className={`h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-xl border flex items-center justify-center ${
                  isKept 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                    : 'bg-gray-800/50 border-gray-700/50 text-gray-600'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isKept ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {isKept ? 'Used for Recommendations' : 'Filtered Out'}
                    </span>
                  </div>
                  
                  <h3 className={`text-base font-medium mb-2 truncate ${isKept ? 'text-white' : 'text-gray-400 line-through decoration-gray-600'}`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500">
                    {isKept 
                      ? "This item strongly aligns with your established preferences and semantic profile."
                      : "This looked like a one-off moment. It didn't match your usual shopping habits, so we excluded it from your profile."}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
