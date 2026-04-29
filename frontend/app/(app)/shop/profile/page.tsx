"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/AuthProvider';
import { API } from '../../../../lib/api';

export default function ProfilePage() {
  const { userId, email } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`${API}/users/${userId}/signal-quality`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setProfile(data);
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

  if (!profile) return null;

  const pct = Math.round(profile.signal_quality_pct);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header Profile Section */}
      <div className="flex items-center gap-6 p-8 rounded-3xl bg-gray-900 border border-gray-800">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
          {email ? email.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{email || 'Shopper Profile'}</h1>
          <p className="text-gray-400">Your AI-curated taste profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Signal Clarity */}
        <div className="col-span-1 p-8 rounded-3xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Signal Clarity</h2>
          <p className="text-sm text-gray-400 mb-8">How much of your click history actually represents your true taste?</p>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Donut */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1f2937" strokeWidth="8" />
              {/* Progress circle */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="url(#gradient)" 
                strokeWidth="8" 
                strokeDasharray={`${pct * 2.51} 251.2`} 
                strokeLinecap="round" 
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white">{pct}%</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Genuine</span>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-between w-full text-sm">
            <div className="text-center">
              <span className="block text-xl font-bold text-white">{profile.genuine_count}</span>
              <span className="text-gray-500">True Clicks</span>
            </div>
            <div className="w-px h-8 bg-gray-800"></div>
            <div className="text-center">
              <span className="block text-xl font-bold text-white">{profile.drift_count}</span>
              <span className="text-gray-500">Filtered</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 w-full text-center">
           <span className="text-gray-500 block text-xs uppercase tracking-wider mb-2">Cross-Modal Alignment</span>
             <p className="text-gray-300 text-sm">Your behavioral and semantic profiles have an alignment score of <strong className={`font-bold ${profile.cross_modal_sim >= 0 ? 'text-indigo-400' : 'text-amber-400'}`}>{Math.round(profile.cross_modal_sim * 100)}%</strong>. {profile.cross_modal_sim >= 0.5 ? 'Strong consistency — your actions match your interests well.' : profile.cross_modal_sim >= 0 ? 'Moderate alignment — some browsing doesn\'t reflect your core interests.' : 'Low alignment — significant noise detected in your interaction history.'}</p>
          </div>
        </div>

        {/* Right Col: Categories */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          
          {/* Extracted Interests */}
          <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-2">Detected Interests</h2>
            <p className="text-sm text-gray-400 mb-6">Based on semantic analysis of your genuine interactions.</p>
            
            <div className="space-y-4">
              {profile.top_categories.map(([cat, count]: [string, number], idx: number) => {
                const max = profile.top_categories[0][1];
                const width = `${(count / max) * 100}%`;
                
                return (
                  <div key={idx} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-200 capitalize font-medium">{cat}</span>
                      <span className="text-gray-500">{count} items</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width }}></div>
                    </div>
                  </div>
                );
              })}
              {profile.top_categories.length === 0 && (
                <div className="text-sm text-gray-500 italic">Not enough data to detect interests.</div>
              )}
            </div>
          </div>

          {/* Filtered Moments summary */}
          <div className="p-8 rounded-3xl bg-amber-900/10 border border-amber-900/20">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <span className="text-amber-500">🛡️</span> Protected from Noise
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              ECHO caught {profile.drift_count} interactions that didn't fit your profile. Here are a few things we ignored so your recommendations stay relevant:
            </p>
            <ul className="space-y-2">
              {profile.drift_items.slice(0, 3).map((item: any, i: number) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span className="line-through decoration-gray-600">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Similarity Card */}
          {profile.community_similarity && (
            <div className="p-8 rounded-3xl bg-indigo-900/10 border border-indigo-800/30">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-indigo-400">👥</span> Community Similarity
              </h2>
              <p className="text-sm text-gray-400 mb-5">
                Based on semantic embeddings, ECHO found shoppers with taste profiles similar to yours.
              </p>

              {/* Similarity score ring */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e1b4b" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="transparent"
                      stroke="url(#commGrad)"
                      strokeWidth="10"
                      strokeDasharray={`${Math.round(profile.community_similarity.avg_similarity * 251.2)} 251.2`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="commGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-extrabold text-white">
                      {Math.round(profile.community_similarity.avg_similarity * 100)}%
                    </span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Match</span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">
                    You think like <span className="text-indigo-400">{profile.community_similarity.similar_users.length} other shoppers</span>
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    These users share your semantic interest profile with an average similarity of&nbsp;
                    <strong className="text-indigo-300">{Math.round(profile.community_similarity.avg_similarity * 100)}%</strong>.
                  </p>
                </div>
              </div>

              {/* Similar user list */}
              <div className="space-y-2">
                {profile.community_similarity.similar_users.map(([uid, sim]: [string, number], i: number) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300 font-mono">{uid}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${Math.round(sim * 100)}%` }}
                        />
                      </div>
                      <span className="text-gray-500 w-10 text-right">{Math.round(sim * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
