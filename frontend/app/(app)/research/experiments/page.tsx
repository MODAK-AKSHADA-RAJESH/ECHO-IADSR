"use client"
import React, { useEffect, useState } from 'react';
import { MetricsDashboard } from '../../../../components/MetricsDashboard';
import { API } from '../../../../lib/api';

export default function ExperimentsPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/metrics`).then(r => r.json()),
      fetch(`${API}/stats`).then(r => r.json()),
    ]).then(([m, s]) => {
      setMetrics(m);
      setStats(s);
      setLoading(false);
    }).catch(() => setLoading(false));
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
        <h1 className="text-2xl font-bold text-white mb-2">Experiment Results</h1>
        <p className="text-gray-400">Performance comparison of ECHO (IADSR+) against baseline models on the Amazon Beauty dataset.</p>
      </div>

      {/* Dataset Info */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Dataset</span>
            <span className="text-lg font-bold text-white">{stats.dataset}</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Users</span>
            <span className="text-lg font-bold text-white">{stats.total_users?.toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Items</span>
            <span className="text-lg font-bold text-white">{stats.total_items?.toLocaleString()}</span>
          </div>
          <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Avg Sequence</span>
            <span className="text-lg font-bold text-white">{stats.avg_seq_len} items</span>
          </div>
        </div>
      )}

      {/* Charts */}
      <MetricsDashboard metrics={metrics} />

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">Why ECHO outperforms GRU4Rec</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            The cross-modal denoising mechanism successfully identifies and masks noisy interactions, 
            resulting in a 22% improvement in HR@20 and 44% improvement in NDCG@20 over the un-denoised baseline.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
          <h3 className="text-sm font-semibold text-indigo-400 mb-2">Why ECHO is slightly below original IADSR</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            The original IADSR uses Llama-3.1-8B (8B params, 4096-dim). ECHO uses BGE-Large (335M params, 1024-dim) — 
            a 24× reduction. Despite this, ECHO achieves 88% of the original's HR@20 while enabling real-time inference.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
          <h3 className="text-sm font-semibold text-purple-400 mb-2">The attention mechanism's role</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            By learning to weight semantic, behavioral, and cross-modal signals dynamically rather than summing them 
            uniformly, the attention mechanism adapts its noise detection strategy per-user, improving precision.
          </p>
        </div>
      </div>
    </div>
  );
}
