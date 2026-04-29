"use client"
import React, { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      // Redirect based on role
      const session = JSON.parse(localStorage.getItem('echo_session') || '{}');
      if (session.role === 'shopper') router.push('/shop/recommendations');
      else if (session.role === 'manager') router.push('/admin/overview');
      else if (session.role === 'researcher') router.push('/research/experiments');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-white flex items-center gap-2">
        ← Back to Home
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/><path d="M14.5 12h-5"/><path d="M14.5 8h-5"/><path d="M14.5 4h-5"/></svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Sign in to ECHO</h1>
          <p className="text-gray-400 mt-2">Enter your credentials to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="alice@echo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors mt-4"
            >
              Sign In
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Demo Credentials</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400"><span className="text-gray-300">Shopper:</span> alice@echo.com / alice</div>
              <div className="flex justify-between text-gray-400"><span className="text-gray-300">Manager:</span> manager@echo.com / admin</div>
              <div className="flex justify-between text-gray-400"><span className="text-gray-300">Researcher:</span> researcher@echo.com / science</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
