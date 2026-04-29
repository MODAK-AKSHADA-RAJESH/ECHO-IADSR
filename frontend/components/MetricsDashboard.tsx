"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function MetricsDashboard({ metrics }: { metrics: any }) {
  if (!metrics || !metrics.IADSR_plus_ECHO || !metrics.paper_baselines) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-900 rounded-xl border border-gray-800">
        <p className="mb-2 text-lg">Evaluation metrics not available yet.</p>
        <p className="text-sm">Run <code className="bg-gray-800 px-1 rounded">python -m ml.evaluate</code> after training.</p>
      </div>
    );
  }

  const { IADSR_plus_ECHO: echo, paper_baselines: baselines } = metrics;
  const original = baselines.IADSR_original_paper;
  const gru = baselines.GRU4Rec_base;

  const data = [
    { name: 'HR@5',  'GRU4Rec': gru["5"]?.HR || 0.0153, 'IADSR (Paper)': original["5"]?.HR || 0.0300, 'ECHO (Ours)': echo["5"]?.HR || 0 },
    { name: 'HR@10', 'GRU4Rec': gru["10"]?.HR || 0.0246, 'IADSR (Paper)': original["10"]?.HR || 0.0396, 'ECHO (Ours)': echo["10"]?.HR || 0 },
    { name: 'HR@20', 'GRU4Rec': gru["20"]?.HR || 0.0390, 'IADSR (Paper)': original["20"]?.HR || 0.0486, 'ECHO (Ours)': echo["20"]?.HR || 0 },
  ];

  const ndcgData = [
    { name: 'NDCG@5',  'GRU4Rec': gru["5"]?.NDCG || 0.0087, 'IADSR (Paper)': original["5"]?.NDCG || 0.0196, 'ECHO (Ours)': echo["5"]?.NDCG || 0 },
    { name: 'NDCG@10', 'GRU4Rec': gru["10"]?.NDCG || 0.0117, 'IADSR (Paper)': original["10"]?.NDCG || 0.0259, 'ECHO (Ours)': echo["10"]?.NDCG || 0 },
    { name: 'NDCG@20', 'GRU4Rec': gru["20"]?.NDCG || 0.0143, 'IADSR (Paper)': original["20"]?.NDCG || 0.0321, 'ECHO (Ours)': echo["20"]?.NDCG || 0 },
  ];

  const tooltipStyle = { borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#111827', color: '#f9fafb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)' };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-6 text-center">Hit Ratio (HR@K)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
              <Bar dataKey="GRU4Rec" fill="#475569" radius={[4, 4, 0, 0]} />
              <Bar dataKey="IADSR (Paper)" fill="#818cf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ECHO (Ours)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-6 text-center">Normalized Discounted Cumulative Gain (NDCG@K)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ndcgData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }} />
              <Bar dataKey="GRU4Rec" fill="#475569" radius={[4, 4, 0, 0]} />
              <Bar dataKey="IADSR (Paper)" fill="#818cf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ECHO (Ours)" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
