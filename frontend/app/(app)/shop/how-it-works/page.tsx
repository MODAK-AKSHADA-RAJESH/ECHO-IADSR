"use client"
import React from 'react';

const steps = [
  {
    icon: '🛒',
    title: 'You interact with products',
    desc: 'Every click, view, and purchase becomes part of your digital profile. Algorithms learn from all of it — the good, the bad, and the accidental.',
  },
  {
    icon: '🔍',
    title: 'But not all interactions are real',
    desc: "Gift purchases, curiosity clicks, impulse browsing — these don't reflect who you actually are. Traditional algorithms can't tell the difference.",
  },
  {
    icon: '🧠',
    title: 'ECHO reads between the lines',
    desc: 'Using cross-modal semantic analysis, ECHO compares what you did (your behavior) with what you meant (the semantic meaning of items). When they disagree, it flags a one-off moment.',
  },
  {
    icon: '🎯',
    title: 'Your profile gets cleaned',
    desc: 'One-off moments are filtered out. What remains is a clear picture of your genuine interests — your true taste DNA.',
  },
  {
    icon: '✨',
    title: 'Better recommendations follow',
    desc: 'With a clean profile, your recommendations become sharper, more relevant, and more personal. No more irrelevant suggestions from that one random shopping trip.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">How ECHO Works</h1>
        <p className="text-gray-400">
          A simple explanation of how ECHO makes your recommendations better.
        </p>
      </div>

      <div className="relative pl-8 border-l-2 border-indigo-500/20 space-y-10">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[25px] w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
              {step.icon}
            </div>
            <div className="ml-8 p-6 rounded-xl bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step {i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Social Impact Section */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <h2 className="text-lg font-bold text-white mb-4">Why This Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-indigo-400 mb-2">Filter Bubble Prevention</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              When algorithms over-learn from noisy data, they create narrow, distorted views of user preference. ECHO breaks these bubbles by removing the noise.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-indigo-400 mb-2">Algorithmic Transparency</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              For the first time, you can see exactly which interactions shaped your recommendations and which didn't — with plain-English explanations.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-indigo-400 mb-2">User Agency</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              ECHO gives you visibility into your algorithmic profile. You understand the AI. You can trust the AI. That's responsible AI in practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
