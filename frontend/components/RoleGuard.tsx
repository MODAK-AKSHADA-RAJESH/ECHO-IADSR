"use client"
import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export function RoleGuard({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles: string[];
}) {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!role) {
        router.push('/login');
      } else if (!allowedRoles.includes(role)) {
        // Redirect unauthorized users to their own home
        if (role === 'shopper') router.push('/shop/recommendations');
        else if (role === 'manager') router.push('/admin/overview');
        else if (role === 'researcher') router.push('/research/experiments');
      }
    }
  }, [role, isLoading, router, allowedRoles]);

  if (isLoading || !role || !allowedRoles.includes(role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return <>{children}</>;
}
