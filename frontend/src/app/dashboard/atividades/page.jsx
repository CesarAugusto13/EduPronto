'use client';

import Link from 'next/link';
import styles from './Atividades.module.css';

export default function Atividades() {
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Atividades</h1>
          <p>Gerencie e acompanhe suas atividades criadas</p>
        </div>

        <Link href="/dashboard/atividades/nova" className={styles.newButton}>
          ➕ Nova atividade
        </Link>
      </div>

      {/* FILTROS */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar atividade..."
          className={styles.search}
        />

        <select className={styles.select}>
          <option value="">Todos os status</option>
          <option value="ativa">Ativa</option>
          <option value="rascunho">Rascunho</option>
          <option value="encerrada">Encerrada</option>
        </select>
      </div>

      {/* LISTA */}
      <div className={styles.list}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Atividade</th>
              <th>Turma</th>
              <th>Entrega</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Trabalho de Matemática</td>
              <td>8º Ano B</td>
              <td>20/02/2026</td>
              <td>
                <span className={`${styles.status} ${styles.ativa}`}>
                  Ativa
                </span>
              </td>
              <td className={styles.actions}>
                <button>✏️</button>
                <button>👁️</button>
                <button className={styles.delete}>🗑️</button>
              </td>
            </tr>

            <tr>
              <td>Lista de Exercícios</td>
              <td>7º Ano A</td>
              <td>10/02/2026</td>
              <td>
                <span className={`${styles.status} ${styles.rascunho}`}>
                  Rascunho
                </span>
              </td>
              <td className={styles.actions}>
                <button>✏️</button>
                <button>👁️</button>
                <button className={styles.delete}>🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
