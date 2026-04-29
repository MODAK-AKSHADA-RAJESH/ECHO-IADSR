"use client"
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/><path d="M14.5 12h-5"/><path d="M14.5 8h-5"/><path d="M14.5 4h-5"/></svg>
            <span className="text-xl font-extrabold text-white tracking-tight">ECHO</span>
          </div>
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
            Enter App →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-4xl mx-auto mt-16 mb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Algorithms learn from everything you click.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Including the things you didn't mean.
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            ECHO uses cross-modal semantic analysis to separate genuine interest from behavioral noise, making algorithmic recommendations transparent and correctable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="px-8 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
              Explore the System →
            </Link>
          </div>
        </div>

        {/* System Diagram */}
        <div className="w-full max-w-5xl mx-auto mb-32 p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-gray-400">
            <div className="flex flex-col items-center p-4">
              <span className="text-2xl mb-2">🖱️</span>
              <span>Raw Interactions</span>
            </div>
            <div className="hidden md:block text-indigo-500/50">→</div>
            <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl border border-gray-700">
              <span className="text-white">BGE-Large Encoder</span>
              <span className="text-xs text-gray-500 mt-1">Semantic Layer</span>
            </div>
            <div className="hidden md:block text-indigo-500/50">→</div>
            <div className="flex flex-col items-center p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
              <span className="text-indigo-400">Attention Scoring</span>
              <span className="text-xs text-indigo-500/70 mt-1">Signal vs Noise</span>
            </div>
            <div className="hidden md:block text-indigo-500/50">→</div>
            <div className="flex flex-col items-center p-4">
              <span className="text-2xl mb-2">✨</span>
              <span className="text-white">Clean Output</span>
            </div>
          </div>
        </div>

        {/* Social Impact Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 text-left">
          <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">🫧</div>
            <h3 className="text-xl font-bold text-white mb-4">Filter Bubble Prevention</h3>
            <p className="text-gray-400 leading-relaxed">
              When algorithms over-learn from noisy data, they create narrow, distorted views of user preference. ECHO identifies and removes these distortions, promoting healthier, more diverse recommendations.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">🔍</div>
            <h3 className="text-xl font-bold text-white mb-4">Algorithmic Transparency</h3>
            <p className="text-gray-400 leading-relaxed">
              Users deserve to understand why they see what they see. ECHO provides item-level explanations for every recommendation decision — which interactions were trusted, which were flagged, and why.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">🛡️</div>
            <h3 className="text-xl font-bold text-white mb-4">User Agency & Control</h3>
            <p className="text-gray-400 leading-relaxed">
              For the first time, users can see their behavioral profile through the algorithm's eyes and understand how each interaction shaped their recommendations.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="border-t border-gray-800 bg-gray-900 py-8 text-center text-sm text-gray-500">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <span><strong className="text-gray-300">22,363</strong> Users</span>
          <span className="hidden md:inline">•</span>
          <span><strong className="text-gray-300">159,956</strong> Interactions</span>
          <span className="hidden md:inline">•</span>
          <span><strong className="text-gray-300">12,102</strong> Items</span>
          <span className="hidden md:inline">•</span>
          <span className="text-emerald-400 font-medium">HR@20: 4.86%</span>
        </div>
      </footer>
    </div>
  );
}
