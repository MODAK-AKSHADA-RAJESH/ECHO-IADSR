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
                
                {/* Thumbnail */}
                <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 relative">
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onLoad={(e) => {
                          // Amazon returns a 1x1 placeholder for missing images — detect & hide it
                          const img = e.currentTarget;
                          if (img.naturalWidth < 50 || img.naturalHeight < 50) {
                            img.style.display = 'none';
                            const parent = img.parentElement;
                            if (parent) {
                              const fb = parent.querySelector('.img-fallback') as HTMLElement;
                              if (fb) fb.style.display = 'flex';
                            }
                          }
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fb = parent.querySelector('.img-fallback') as HTMLElement;
                            if (fb) fb.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="img-fallback w-full h-full absolute inset-0 items-center justify-center text-gray-500 text-xl font-bold bg-gray-800 hidden">
                        {item.title?.charAt(0).toUpperCase() || '?'}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold">
                      {item.title?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
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
