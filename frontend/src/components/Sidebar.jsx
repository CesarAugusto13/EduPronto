'use client';

import Link from 'next/link';
import styles from './Sidebar.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>📘</div>

      <nav className={styles.nav}>
        <Link
          href="/dashboard"
          className={styles.link}
          data-tooltip="Dashboard"
        >
          <span>🏠</span>
          <span className={styles.text}>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/atividades"
          className={styles.link}
          data-tooltip="Atividades"
        >
          <span>📚</span>
          <span className={styles.text}>Atividades</span>
        </Link>

        <Link
          href="/dashboard/perfil"
          className={styles.link}
          data-tooltip="Perfil"
        >
          <span>👤</span>
          <span className={styles.text}>Perfil</span>
        </Link>
      </nav>

      <button
        className={styles.logout}
        onClick={handleLogout}
        data-tooltip="Sair"
      >
        <span>🚪</span>
        <span className={styles.text}>Sair</span>
      </button>
    </aside>
  );
}
