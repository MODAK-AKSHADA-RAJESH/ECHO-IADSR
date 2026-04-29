"use client"
import React, { useEffect, useState } from 'react';
import { API } from '../../../../lib/api';

export default function UserExplorerPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [expandedData, setExpandedData] = useState<any>(null);
  const limit = 20;

  const loadUsers = (newOffset: number) => {
    setLoading(true);
    fetch(`${API}/users?limit=${limit}&offset=${newOffset}`)
      .then(r => r.json())
      .then(data => {
        setUsers(data.users || []);
        setTotal(data.total || 0);
        setOffset(newOffset);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadUsers(0); }, []);

  const handleExpand = async (userId: string) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      return;
    }
    setExpandedUser(userId);
    try {
      const res = await fetch(`${API}/users/${userId}/signal-quality`);
      const data = await res.json();
      setExpandedData(data);
    } catch {
      setExpandedData(null);
    }
  };

  const filteredUsers = search
    ? users.filter(u => u.user_id.includes(search) || u.display_name.toLowerCase().includes(search.toLowerCase()))
    : users;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">User Explorer</h1>
        <p className="text-gray-400">Browse and inspect individual user profiles across the platform.</p>
      </div>

      {/* Search + Pagination */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by user ID..."
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 w-64"
        />
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Showing {offset + 1}–{Math.min(offset + limit, total)} of {total.toLocaleString()}</span>
          <button onClick={() => loadUsers(Math.max(0, offset - limit))} disabled={offset === 0} className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-30 transition-colors">←</button>
          <button onClick={() => loadUsers(offset + limit)} disabled={offset + limit >= total} className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-30 transition-colors">→</button>
        </div>
      </div>

      {/* User Table */}
      <div className="rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-xs text-gray-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3">User ID</th>
              <th className="text-left px-4 py-3">Interactions</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="text-center py-8 text-gray-500">Loading...</td></tr>
            ) : filteredUsers.map(user => (
              <React.Fragment key={user.user_id}>
                <tr className="border-t border-gray-800 hover:bg-gray-900/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-200 font-medium">{user.user_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{user.interaction_count}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleExpand(user.user_id)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      {expandedUser === user.user_id ? 'Collapse ↑' : 'Inspect ↓'}
                    </button>
                  </td>
                </tr>
                {expandedUser === user.user_id && expandedData && (
                  <tr className="border-t border-gray-800">
                    <td colSpan={3} className="px-4 py-4 bg-gray-900/30">
                      <div className="flex flex-wrap gap-8 text-sm">
                        <div>
                          <span className="text-gray-500 block text-xs mb-1">Signal Quality</span>
                          <span className="text-emerald-400 font-bold text-lg">{expandedData.signal_quality_pct}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-xs mb-1">Categories</span>
                          <span className="text-white">
                            {expandedData.top_categories?.map((c: any) => c[0]).join(', ') || 'None'}
                          </span>
                        </div>
                        <div className="border-l border-gray-800 pl-8">
                          <span className="text-gray-500 block text-xs mb-1">System Credentials</span>
                          <div className="font-mono text-xs text-gray-400">
                            ID: <span className="text-white">{user.user_id}</span>@echo.com<br/>
                            PW: <span className="text-white">{user.user_id}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
