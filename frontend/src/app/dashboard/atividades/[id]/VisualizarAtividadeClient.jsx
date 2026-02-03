"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import styles from "../Atividades.module.css";

export default function VisualizarAtividadeClient({ atividadeId }) {
  const router = useRouter();

  const [atividade, setAtividade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!atividadeId) return;

    async function carregar() {
      try {
        const { data } = await api.get(`/atividades/${atividadeId}`);
        setAtividade(data);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar atividade");
        router.push("/dashboard/atividades");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [atividadeId, router]);

  if (loading) {
    return <p>Carregando atividade...</p>;
  }

  if (!atividade) {
    return <p>Atividade não encontrada.</p>;
  }

  return (
    <div className={styles.viewPage}>
      <div className={styles.viewCard}>
        <div className={styles.viewHeader}>
          <h2>{atividade.titulo}</h2>

          <span
            className={`${styles.status} ${
              atividade.status === "ativa" ? styles.active : styles.closed
            }`}
          >
            {atividade.status === "ativa" ? "Ativa" : "Encerrada"}
          </span>
        </div>

        <div className={styles.meta}>
          <div>
            <span>Matéria</span>
            <strong>{atividade.materia}</strong>
          </div>

          <div>
            <span>Turma</span>
            <strong>{atividade.turma}</strong>
          </div>

          {atividade.dataEntrega && (
            <div>
              <span>Entrega</span>
              <strong>
                {new Date(atividade.dataEntrega).toLocaleDateString()}
              </strong>
            </div>
          )}
        </div>

        {atividade.descricao && (
          <div className={styles.description}>
            <h4>Descrição</h4>
            <p>{atividade.descricao}</p>
          </div>
        )}

        <div className={styles.actionsView}>
          <button
            className={styles.secondary}
            onClick={() => router.push("/dashboard/atividades")}
          >
            ⬅️ Voltar
          </button>

          <button
            className={styles.primary}
            onClick={() =>
              router.push(`/dashboard/atividades/${atividade._id}/editar`)
            }
          >
            ✏️ Editar atividade
          </button>
        </div>
      </div>
    </div>
  );
}
