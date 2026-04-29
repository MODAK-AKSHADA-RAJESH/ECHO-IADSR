"use client"
import React from 'react';

const ablationData = [
  { config: 'GRU4Rec (no denoising)', hr5: '0.0153', hr10: '0.0246', hr20: '0.0390', ndcg5: '0.0087', ndcg10: '0.0117', ndcg20: '0.0143', notes: 'Baseline — no semantic signal' },
  { config: 'GRU4Rec + BGE-Large (uniform sum)', hr5: '0.0198', hr10: '0.0295', hr20: '0.0405', ndcg5: '0.0125', ndcg10: '0.0156', ndcg20: '0.0180', notes: 'Contribution 1 alone' },
  { config: 'ECHO (BGE-Large + Attention)', hr5: '0.0229', hr10: '0.0330', hr20: '0.0427', ndcg5: '0.0149', ndcg10: '0.0181', ndcg20: '0.0206', notes: 'Full system — both contributions', highlight: true },
];

export default function AblationPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Ablation Study</h1>
        <p className="text-gray-400">Isolating the impact of each novel contribution to understand where improvements come from.</p>
      </div>

      {/* Ablation Table */}
      <div className="rounded-xl border border-gray-800 overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 text-xs text-gray-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3">Configuration</th>
              <th className="text-center px-3 py-3">HR@5</th>
              <th className="text-center px-3 py-3">HR@10</th>
              <th className="text-center px-3 py-3">HR@20</th>
              <th className="text-center px-3 py-3">NDCG@5</th>
              <th className="text-center px-3 py-3">NDCG@10</th>
              <th className="text-center px-3 py-3">NDCG@20</th>
              <th className="text-left px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {ablationData.map((row, i) => (
              <tr key={i} className={`border-t border-gray-800 ${row.highlight ? 'bg-indigo-500/5' : ''}`}>
                <td className={`px-4 py-3 font-medium ${row.highlight ? 'text-indigo-300' : 'text-gray-300'}`}>
                  {row.config}
                </td>
                <td className="text-center px-3 py-3 text-gray-400 font-mono text-xs">{row.hr5}</td>
                <td className="text-center px-3 py-3 text-gray-400 font-mono text-xs">{row.hr10}</td>
                <td className={`text-center px-3 py-3 font-mono text-xs ${row.highlight ? 'text-emerald-400 font-bold' : 'text-gray-400'}`}>{row.hr20}</td>
                <td className="text-center px-3 py-3 text-gray-400 font-mono text-xs">{row.ndcg5}</td>
                <td className="text-center px-3 py-3 text-gray-400 font-mono text-xs">{row.ndcg10}</td>
                <td className={`text-center px-3 py-3 font-mono text-xs ${row.highlight ? 'text-emerald-400 font-bold' : 'text-gray-400'}`}>{row.ndcg20}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
          <h3 className="text-sm font-bold text-indigo-400 mb-3">Novel Contribution #1: Lightweight Semantic Encoder</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Replacing Llama-3.1-8B (8B params, 4096-dim) with BGE-Large (335M params, 1024-dim) achieves <span className="text-white font-medium">88% of the original's accuracy</span> while 
            enabling real-time web inference on consumer hardware.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">24× fewer parameters</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">Sub-second inference</span>
          </div>
        </div>
        <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
          <h3 className="text-sm font-bold text-purple-400 mb-3">Novel Contribution #2: Attention-Weighted Scoring</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            The original IADSR uses uniform sum: <code className="text-xs bg-gray-800 px-1 rounded">score = c₁ + c₂ + c₃</code>. 
            ECHO introduces a learnable attention layer: <code className="text-xs bg-gray-800 px-1 rounded">score = w₁c₁ + w₂c₂ + w₃c₃</code> where weights are learned per-dataset.
          </p>
          <p className="text-xs text-gray-500">
            This allows the model to autonomously learn which modality (semantic, behavioral, cross-modal) is the most reliable noise indicator.
          </p>
        </div>
      </div>
    </div>
  );
}
