"use client"
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import { Sidebar } from '../../components/Sidebar';
import { RoleGuard } from '../../components/RoleGuard';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { role, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !role) {
      router.replace('/login');
    }
  }, [role, isLoading, router]);

  if (isLoading || !role) return null;

  let allowedRoles = ['shopper', 'manager', 'researcher'];
  if (pathname.startsWith('/shop')) allowedRoles = ['shopper'];
  if (pathname.startsWith('/admin')) allowedRoles = ['manager'];
  if (pathname.startsWith('/research')) allowedRoles = ['researcher'];

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="flex h-screen overflow-hidden bg-gray-950">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
