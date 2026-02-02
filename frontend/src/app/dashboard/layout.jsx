'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import styles from './Dashboard.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/Loading';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user]);

  if (loading) {
    return <Loading text="Validando sessão..." />;
  }

  if (!user) return null;

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.content}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
