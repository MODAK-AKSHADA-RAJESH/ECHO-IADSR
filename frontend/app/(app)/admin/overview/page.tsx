"use client"
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { API } from '../../../../lib/api';

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/admin/overview`).then(r => r.json()),
      fetch(`${API}/stats`).then(r => r.json()),
    ]).then(([ov, st]) => {
      setOverview(ov);
      setStats(st);
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

  const kpis = [
    { label: 'Total Users', value: overview?.total_users?.toLocaleString() || '—', color: 'text-white' },
    { label: 'Avg Noise Rate', value: `${overview?.avg_noise_rate || 0}%`, color: 'text-amber-400' },
    { label: 'Signal Quality', value: `${overview?.avg_signal_quality || 0}%`, color: 'text-emerald-400' },
    { label: 'Model Status', value: overview?.model_status === 'online' ? 'Online' : 'Offline', color: overview?.model_status === 'online' ? 'text-emerald-400' : 'text-red-400' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">System Overview</h1>
        <p className="text-gray-400">Platform-wide health metrics across {overview?.sampled_users || 0} sampled users.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="p-5 rounded-xl bg-gray-900 border border-gray-800">
            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">{kpi.label}</span>
            <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Noise Distribution */}
      {overview?.noise_distribution && (
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 mb-8">
          <h2 className="text-lg font-bold text-white mb-1">Noise Distribution Across Users</h2>
          <p className="text-sm text-gray-500 mb-6">How many users fall into each noise level bracket.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overview.noise_distribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="range" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#111827', color: '#f9fafb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Social Impact Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <h2 className="text-lg font-bold text-white mb-3">Social Impact Assessment</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Across {overview?.total_users?.toLocaleString() || '22,363'} users, ECHO identified an average of <span className="text-amber-400 font-semibold">{overview?.avg_noise_rate || 0}%</span> of 
          interactions as behavioral noise. Left uncorrected, this noise degrades recommendation quality, 
          contributes to filter bubble formation, and creates distorted algorithmic profiles that don't represent 
          users' genuine interests. ECHO's denoising mechanism improves recommendation relevance by 
          <span className="text-emerald-400 font-semibold"> 22%</span> (HR@20), directly addressing algorithmic accountability.
        </p>
      </div>
    </div>
  );
}
