'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './Dashboard.module.css';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import Loading from '@/components/Loading';

export default function DashboardPage() {
  const { user } = useAuth();
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const { data } = await api.get('/atividades');
        setAtividades(data);
      } catch (error) {
        console.error('Erro ao carregar dashboard', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  // 📊 RESUMO
  const resumo = useMemo(() => {
    const total = atividades.length;

    const ativas = atividades.filter(
      (a) => a.status === 'ativa'
    ).length;

    const turmasUnicas = new Set(
      atividades.map((a) => a.turma)
    ).size;

    const hoje = new Date();

    const pendentes = atividades.filter(
      (a) =>
        a.status === 'ativa' &&
        a.dataEntrega &&
        new Date(a.dataEntrega) < hoje
    ).length;

    return {
      totalAtividades: total,
      atividadesAtivas: ativas,
      turmas: turmasUnicas,
      pendentes,
    };
  }, [atividades]);

  // 🕒 ATIVIDADES RECENTES (últimas 5)
  const atividadesRecentes = useMemo(() => {
    return [...atividades]
      .sort(
        (a, b) =>
          new Date(b.criadaEm) - new Date(a.criadaEm)
      )
      .slice(0, 5);
  }, [atividades]);

  if (loading) {
    return <Loading text="Carregando dashboard..." />;
  }

  return (
    <div className={styles.dashboard}>
      {/* BOAS-VINDAS */}
      <section className={styles.welcome}>
        <h1>👋 Olá, {user?.nome || 'Professor'}!</h1>
        <p>Bem-vindo ao seu painel de controle</p>
      </section>

      {/* CARDS */}
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

      {/* AÇÕES */}
      <section className={styles.actions}>
        <Link
          href="/dashboard/atividades/nova"
          className={styles.actionPrimary}
        >
          ➕ Nova atividade
        </Link>

        <Link
          href="/dashboard/atividades"
          className={styles.action}
        >
          📚 Minhas atividades
        </Link>

        <Link
          href="/dashboard/perfil"
          className={styles.action}
        >
          👤 Meu perfil
        </Link>
      </section>

      {/* ATIVIDADES RECENTES */}
      <section className={styles.recent}>
        <div className={styles.recentHeader}>
          <h2>Atividades recentes</h2>
          <Link href="/dashboard/atividades">
            Ver todas
          </Link>
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
                <th>Entrega</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {atividadesRecentes.map((atividade) => (
                <tr key={atividade._id}>
                  <td>{atividade.titulo}</td>
                  <td>
                    {atividade.dataEntrega
                      ? new Date(
                          atividade.dataEntrega
                        ).toLocaleDateString()
                      : '-'}
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[atividade.status]
                      }`}
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
