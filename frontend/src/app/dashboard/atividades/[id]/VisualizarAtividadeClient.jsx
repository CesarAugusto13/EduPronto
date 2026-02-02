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
    <div className={styles.view}>
      <h2>{atividade.titulo}</h2>

      <p>
        <strong>Matéria:</strong> {atividade.materia}
      </p>

      <p>
        <strong>Turma:</strong> {atividade.turma}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {atividade.status === "ativa" ? "Ativa" : "Encerrada"}
      </p>

      {atividade.dataEntrega && (
        <p>
          <strong>Data de entrega:</strong>{" "}
          {new Date(atividade.dataEntrega).toLocaleDateString()}
        </p>
      )}

      {atividade.descricao && (
        <div className={styles.description}>
          <strong>Descrição:</strong>
          <p>{atividade.descricao}</p>
        </div>
      )}

      <div className={styles.actions}>
        <button
          onClick={() =>
            router.push(`/dashboard/atividades/${atividade._id}/editar`)
          }
        >
          ✏️ Editar
        </button>

        <button onClick={() => router.push("/dashboard/atividades")}>
          ⬅️ Voltar
        </button>
      </div>
    </div>
  );
}
