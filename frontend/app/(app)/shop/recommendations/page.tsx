"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/AuthProvider';
import { API } from '../../../../lib/api';

// Beauty-relevant Unsplash fallback images — used when Amazon CDN returns a placeholder
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=600&auto=format&fit=crop", // skincare
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop", // makeup
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop", // hair
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop", // fragrance
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop", // nails
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", // skincare 2
  "https://images.unsplash.com/photo-1614859324967-bdf32bfbc04c?q=80&w=600&auto=format&fit=crop", // body
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop", // tools
];

function getFallbackImage(itemId: number): string {
  return FALLBACK_IMAGES[itemId % FALLBACK_IMAGES.length];
}

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
              className={`group flex flex-col bg-gray-900 rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isTopMatch 
                  ? 'border-indigo-500/30 hover:border-indigo-500/60 hover:shadow-indigo-500/10' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Product Image */}
              <div className="h-48 w-full relative overflow-hidden bg-gray-800">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onLoad={(e) => {
                      // Amazon sometimes returns a 200 OK with a tiny 1x1 placeholder.
                      // Detect it by checking rendered dimensions.
                      const img = e.currentTarget;
                      if (img.naturalWidth < 50 || img.naturalHeight < 50) {
                        img.src = getFallbackImage(item.item_id);
                      }
                    }}
                    onError={(e) => {
                      e.currentTarget.src = getFallbackImage(item.item_id);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                )}
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md shadow-sm backdrop-blur-md ${
                    isTopMatch 
                      ? 'bg-indigo-500/90 text-white' 
                      : 'bg-gray-900/80 text-gray-300'
                  }`}>
                    {isTopMatch ? 'Strong Match' : 'Good Match'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-white leading-snug mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-800/50">
                  <p className="text-xs text-gray-500">
                    Confidence Score
                  </p>
                  <p className="text-xs font-mono font-medium text-gray-400">
                    {(item.score * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
