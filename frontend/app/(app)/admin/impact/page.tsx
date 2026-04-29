"use client"
import React, { useEffect, useState } from 'react';
import { MetricsDashboard } from '../../../../components/MetricsDashboard';
import { API } from '../../../../lib/api';

export default function ImpactPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/metrics`).then(r => r.json()).then(d => { setMetrics(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Impact Report</h1>
        <p className="text-gray-400">Measuring the business impact of ECHO's denoising on recommendation quality.</p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-6 rounded-xl bg-gradient-to-b from-emerald-500/10 to-gray-900 border border-emerald-500/20 text-center">
          <span className="text-3xl font-bold text-emerald-400">+22%</span>
          <p className="text-sm text-gray-400 mt-1">HR@20 Improvement</p>
          <p className="text-xs text-gray-600 mt-2">Over baseline GRU4Rec</p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-b from-indigo-500/10 to-gray-900 border border-indigo-500/20 text-center">
          <span className="text-3xl font-bold text-indigo-400">+44%</span>
          <p className="text-sm text-gray-400 mt-1">NDCG@20 Improvement</p>
          <p className="text-xs text-gray-600 mt-2">Over baseline GRU4Rec</p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-b from-purple-500/10 to-gray-900 border border-purple-500/20 text-center">
          <span className="text-3xl font-bold text-purple-400">24×</span>
          <p className="text-sm text-gray-400 mt-1">Lighter Than Original</p>
          <p className="text-xs text-gray-600 mt-2">335M vs 8B parameters</p>
        </div>
      </div>

      {/* Charts */}
      <MetricsDashboard metrics={metrics} />
    </div>
  );
}
