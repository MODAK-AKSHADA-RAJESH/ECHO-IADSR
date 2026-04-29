"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

const shopperLinks = [
  { href: '/shop/recommendations', label: 'My Recommendations', icon: '✨' },
  { href: '/shop/history', label: 'My History', icon: '📜' },
  { href: '/shop/profile', label: 'My Taste Profile', icon: '🎯' },
  { href: '/shop/how-it-works', label: 'How ECHO Works', icon: '💡' },
];

const managerLinks = [
  { href: '/admin/overview', label: 'System Overview', icon: '📊' },
  { href: '/admin/users', label: 'User Explorer', icon: '👥' },
  { href: '/admin/impact', label: 'Impact Report', icon: '📈' },
];

const researcherLinks = [
  { href: '/research/experiments', label: 'Experiments', icon: '📊' },
  { href: '/research/ablation', label: 'Ablation Study', icon: '🔬' },
  { href: '/research/methodology', label: 'Methodology', icon: '📄' },
];

const roleLabels = {
  shopper: 'Shopper',
  manager: 'Platform Manager',
  researcher: 'Researcher',
};

const roleColors = {
  shopper: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  manager: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  researcher: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export function Sidebar() {
  const { role, userId, logout } = useAuth();
  const pathname = usePathname();

  if (!role) return null;

  const links = role === 'shopper' ? shopperLinks
              : role === 'manager' ? managerLinks
              : researcherLinks;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-indigo-400 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/><path d="M14.5 12h-5"/><path d="M14.5 8h-5"/><path d="M14.5 4h-5"/></svg>
          ECHO
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-4">
        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border inline-block ${roleColors[role]}`}>
          {roleLabels[role]}
        </div>
        {userId && (
          <p className="text-xs text-gray-500 mt-2">Logged in as <span className="text-gray-300 font-medium">{userId}</span></p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
          API Online
        </div>
        <button
          onClick={logout}
          className="w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
        >
          ← Switch Role
        </button>
      </div>
    </aside>
  );
}
