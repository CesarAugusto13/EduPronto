'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import styles from './Dashboard.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user]);

  // ⏳ Enquanto valida sessão
  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <p>Validando sessão...</p>
      </div>
    );
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
