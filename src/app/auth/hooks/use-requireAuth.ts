'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './use-auth';

export const useRequireAuth = (opts?: { redirectTo?: string; role?: 'ORGANIZER' | 'CUSTOMER' }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const redirectTo = opts?.redirectTo ?? '/login';
    if (!user) {
      router.replace(`${redirectTo}`);
      return;
    }
    if (opts?.role && user.role !== opts.role) {
      // not authorized for this role
      router.replace('/');
    }
  }, [user, loading, router, opts]);
};