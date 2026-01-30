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
        <Link className={styles.link} href="/dashboard">
          🏠 <span className={styles.text}>Dashboard</span>
        </Link>
        <Link className={styles.link} href="/dashboard/atividades">
          📚 <span className={styles.text}>Atividades</span>
        </Link>
        <Link className={styles.link} href="/dashboard/perfil">
          👤 <span className={styles.text}>Perfil</span>
        </Link>
      </nav>

      <button className={styles.logout} onClick={handleLogout}>
        🚪 <span className={styles.text}>Sair</span>
      </button>
    </aside>
  );
}
