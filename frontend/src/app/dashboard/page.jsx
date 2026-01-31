'use client';

import styles from './Dashboard.module.css';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  // MOCK (depois você troca por dados reais da API)
  const resumo = {
    totalAtividades: 12,
    atividadesAtivas: 5,
    turmas: 3,
    pendentes: 2,
  };

  const atividadesRecentes = [
    {
      id: 1,
      titulo: 'Prova de Matemática',
      data: '20/01/2026',
      status: 'Ativa',
    },
    {
      id: 2,
      titulo: 'Lista de Exercícios',
      data: '18/01/2026',
      status: 'Rascunho',
    },
    {
      id: 3,
      titulo: 'Trabalho em Grupo',
      data: '15/01/2026',
      status: 'Encerrada',
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* BOAS-VINDAS */}
      <section className={styles.welcome}>
        <h1>👋 Olá, {user?.nome || 'Professor'}!</h1>
        <p>Bem-vindo ao seu painel de controle</p>
      </section>

      {/* CARDS DE RESUMO */}
      <section className={styles.cards}>
        <div className={styles.card}>
          <span className={styles.icon}>📚</span>
          <div>
            <strong>{resumo.totalAtividades}</strong>
            <p>Atividades criadas</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.icon}>📝</span>
          <div>
            <strong>{resumo.atividadesAtivas}</strong>
            <p>Atividades ativas</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.icon}>👩‍🎓</span>
          <div>
            <strong>{resumo.turmas}</strong>
            <p>Turmas</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.icon}>⏳</span>
          <div>
            <strong>{resumo.pendentes}</strong>
            <p>Pendentes</p>
          </div>
        </div>
      </section>

      {/* ATALHOS RÁPIDOS */}
      <section className={styles.actions}>
        <Link href="/dashboard/atividades/nova" className={styles.actionPrimary}>
          ➕ Nova atividade
        </Link>

        <Link href="/dashboard/atividades" className={styles.action}>
          📚 Minhas atividades
        </Link>

        <Link href="/dashboard/perfil" className={styles.action}>
          👤 Meu perfil
        </Link>
      </section>

      {/* ATIVIDADES RECENTES */}
      <section className={styles.recent}>
        <div className={styles.recentHeader}>
          <h2>Atividades recentes</h2>
          <Link href="/dashboard/atividades">Ver todas</Link>
        </div>

        {atividadesRecentes.length === 0 ? (
          <div className={styles.empty}>
            <p>📭 Você ainda não criou nenhuma atividade</p>
            <Link href="/dashboard/atividades/nova">
              Criar primeira atividade
            </Link>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Criada em</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {atividadesRecentes.map((atividade) => (
                <tr key={atividade.id}>
                  <td>{atividade.titulo}</td>
                  <td>{atividade.data}</td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[atividade.status.toLowerCase()]}`}
                    >
                      {atividade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
