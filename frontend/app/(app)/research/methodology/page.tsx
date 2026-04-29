"use client"
import React from 'react';

export default function MethodologyPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">Methodology</h1>
        <p className="text-gray-400">Technical architecture and approach behind the ECHO system.</p>
      </div>

      {/* Problem Definition */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">1</span>
          Problem Definition
        </h2>
        <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-300 leading-relaxed">
            Sequential recommendation systems predict a user's next interaction based on their behavioral history. 
            However, user behavior is inherently noisy — accidental clicks, gift purchases, curiosity browsing, and impulse 
            interactions generate data that does not reflect genuine user preferences. When collaborative filtering models 
            like GRU4Rec learn from this noisy data, they produce degraded, inaccurate recommendations. This contributes 
            to filter bubbles, algorithmic manipulation, and erosion of user trust in AI systems.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">2</span>
          System Architecture
        </h2>
        <div className="p-5 rounded-xl bg-gray-900 border border-gray-800 font-mono text-xs text-gray-400 overflow-x-auto">
          <pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                      ECHO Architecture                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Amazon Beauty Dataset (22,363 users, 12,102 items)            │
│          │                                                      │
│          ▼                                                      │
│  ┌──────────────────┐    ┌──────────────────────┐              │
│  │  Item Titles      │──▶│  BGE-Large Encoder    │              │
│  │  (text metadata)  │    │  (335M params)        │              │
│  └──────────────────┘    │  1024-dim embeddings   │              │
│                           └──────────┬───────────┘              │
│                                      │                          │
│  ┌──────────────────┐               │                          │
│  │  User Sequences   │──▶ GRU4Rec ──┤                          │
│  │  (behavioral)     │   (2-layer)   │                          │
│  └──────────────────┘    128-dim     │                          │
│                           hidden     │                          │
│                              │       │                          │
│                              ▼       ▼                          │
│                     ┌─────────────────────┐                    │
│                     │  Cross-Modal        │                    │
│                     │  Alignment          │                    │
│                     │  c₁, c₂, c₃        │                    │
│                     └────────┬────────────┘                    │
│                              │                                  │
│                              ▼                                  │
│                     ┌─────────────────────┐                    │
│                     │  Attention-Weighted  │  ◀── NOVEL        │
│                     │  Noise Scoring       │                    │
│                     │  w₁c₁+w₂c₂+w₃c₃    │                    │
│                     └────────┬────────────┘                    │
│                              │                                  │
│                              ▼                                  │
│                     ┌─────────────────────┐                    │
│                     │  Gumbel-Sigmoid     │                    │
│                     │  Masking            │                    │
│                     │  (differentiable)   │                    │
│                     └────────┬────────────┘                    │
│                              │                                  │
│                              ▼                                  │
│                     Denoised Recommendations                    │
│                              │                                  │
│                              ▼                                  │
│              ┌───────────────────────────────┐                 │
│              │  FastAPI Backend (REST API)    │                 │
│              └───────────────┬───────────────┘                 │
│                              │                                  │
│                              ▼                                  │
│              ┌───────────────────────────────┐                 │
│              │  Next.js 16 Frontend          │                 │
│              │  3-Role Personalized UI       │                 │
│              └───────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
          `}</pre>
        </div>
      </section>

      {/* Training Details */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">3</span>
          Training Details
        </h2>
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {[
                ['Backbone', 'GRU4Rec (2-layer GRU, 128 hidden)'],
                ['Semantic Encoder', 'BAAI/bge-large-en-v1.5 (1024-dim)'],
                ['Embedding Dimension', '64'],
                ['Hidden Dimension', '128'],
                ['Batch Size', '256'],
                ['Learning Rate', '1e-4 (Adam)'],
                ['Epochs', '1000 (with early stopping, patience=10)'],
                ['Loss Function', 'InfoNCE (contrastive) + MSE (reconstruction)'],
                ['Temperature (τ)', '1.0'],
                ['Threshold (θ)', '-0.9'],
                ['Hardware', 'NVIDIA RTX 4050 (CUDA)'],
                ['Training Time', '~16 hours'],
                ['Final Loss', '5.4646'],
              ].map(([key, val]) => (
                <tr key={key} className="border-t border-gray-800">
                  <td className="px-4 py-2.5 text-gray-400 font-medium bg-gray-900/50 w-48">{key}</td>
                  <td className="px-4 py-2.5 text-gray-200">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Novel Contributions */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">4</span>
          Novel Contributions
        </h2>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <h3 className="text-sm font-bold text-emerald-400 mb-2">1. Lightweight Semantic Encoder for Real-Time Deployment</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Replaced Llama-3.1-8B (8B params, 16GB VRAM required) with BAAI/bge-large-en-v1.5 (335M params, runs on consumer GPUs). 
              Achieves 88% of original accuracy with 24× fewer parameters, enabling the first real-time deployed IADSR variant.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <h3 className="text-sm font-bold text-purple-400 mb-2">2. Attention-Weighted Cross-Modal Noise Scoring</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Replaced the uniform sum (c₁ + c₂ + c₃) with a learnable 3→3 attention layer that dynamically weights 
              semantic, behavioral, and cross-modal signals. Allows per-dataset adaptation of noise detection strategy.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
            <h3 className="text-sm font-bold text-indigo-400 mb-2">3. Full-Stack Explainable AI Deployment</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              First end-to-end deployment of IADSR as a web application with three role-based interfaces 
              (Shopper, Manager, Researcher), real-time PyTorch inference via FastAPI, and human-readable 
              explanations for every denoising decision.
            </p>
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center">5</span>
          Social Impact
        </h2>
        <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-300 leading-relaxed">
            ECHO addresses a fundamental challenge in responsible AI: <strong className="text-white">algorithmic accountability</strong>. 
            Recommendation algorithms shape what billions of people see, buy, and believe daily. When these systems learn from 
            noisy behavioral data, they create distorted digital profiles that don't represent users' genuine interests, leading 
            to filter bubbles, consumer manipulation, and erosion of user autonomy. ECHO provides the first deployed mechanism 
            for users to understand, verify, and implicitly correct their algorithmic profiles through transparent, explainable 
            noise detection.
          </p>
        </div>
      </section>
    </div>
  );
}
