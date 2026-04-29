"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession, login as authLogin, logout as authLogout } from '../lib/auth';
import { useRouter } from 'next/navigation';

type Role = 'shopper' | 'manager' | 'researcher' | null;

interface AuthContextType {
  role: Role;
  userId: string | null;
  email: string | null;
  login: (e: string, p: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  userId: null,
  email: null,
  login: () => false,
  logout: () => {},
  isLoading: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (session) {
      setRole(session.role as Role);
      setUserId(session.userId || null);
      setEmail(session.email || null);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, pass: string) => {
    const session = authLogin(email, pass);
    if (session) {
      setRole(session.role as Role);
      setUserId(session.userId || null);
      setEmail(session.email || null);
      return true;
    }
    return false;
  };

  const logout = () => {
    authLogout();
    setRole(null);
    setUserId(null);
    setEmail(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ role, userId, email, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
