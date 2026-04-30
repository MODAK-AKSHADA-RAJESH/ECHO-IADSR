"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/AuthProvider';
import { API } from '../../../../lib/api';


export default function RecommendationsPage() {
  const { userId } = useAuth();
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    Promise.all([
      fetch(`${API}/users/${userId}/recommend?k=12`, { cache: 'no-store' }).then(res => res.json()),
      fetch(`${API}/users/${userId}/signal-quality`, { cache: 'no-store' }).then(res => res.json())
    ]).then(([recData, profData]) => {
      setData(recData);
      setProfile(profData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (!data || !data.recommendations) {
    return <div className="p-8 text-white">Failed to load recommendations.</div>;
  }

  const driftCount = profile?.drift_count || 0;
  const topCategory = profile?.top_categories?.[0]?.[0] || 'your favorite items';

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Personalized Welcome Banner */}
      <div className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-gray-900 to-gray-900 border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-6xl opacity-5">✨</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">
          Curated for you.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
          ECHO analyzed your browsing history and filtered out <strong className="text-indigo-400">{driftCount} off-pattern interactions</strong>. 
          Here are your clean, highly relevant recommendations based on your love for {topCategory}.
        </p>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.recommendations.map((item: any, idx: number) => {
          const isTopMatch = idx < 3;
          
          return (
            <a 
              href={item.asin ? `https://www.amazon.com/dp/${item.asin}` : `https://www.amazon.com/s?k=${encodeURIComponent(item.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              key={idx} 
              className={`group flex flex-col bg-gray-900 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isTopMatch 
                  ? 'border-indigo-500/50 hover:border-indigo-400 hover:shadow-indigo-500/10' 
                  : 'border-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                  isTopMatch 
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}>
                  {isTopMatch ? 'Strong Match' : 'Good Match'}
                </span>
                
                <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-indigo-400 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Amazon</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white leading-snug mb-6 line-clamp-3 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-800">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Confidence Score
                </p>
                <p className={`text-sm font-mono font-bold ${isTopMatch ? 'text-indigo-400' : 'text-gray-300'}`}>
                  {(item.score * 100).toFixed(1)}%
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
