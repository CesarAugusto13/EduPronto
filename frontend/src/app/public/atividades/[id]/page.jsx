"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import styles from "./AtividadePublica.module.css";

export default function AtividadePublica() {
  const params = useParams();
  const id = params?.id;

  const [atividade, setAtividade] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function carregar() {
      try {
        const res = await api.get(`/public/atividades/${id}`);
        setAtividade(res.data);
      } catch (err) {
        setErro("Atividade não encontrada ou não é pública.");
      }
    }

    carregar();
  }, [id]);

  if (!id || !atividade)
    return <p className={styles.loading}>Carregando atividade...</p>;

  if (erro)
    return <p className={styles.error}>{erro}</p>;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <span className={styles.badge}>Atividade Pública</span>
          <h1>{atividade.titulo}</h1>
        </header>

        {atividade.descricao && (
          <p className={styles.description}>{atividade.descricao}</p>
        )}

        <div className={styles.infoGrid}>
          <div>
            <span>📘 Matéria</span>
            <strong>{atividade.materia}</strong>
          </div>

          <div>
            <span>🎓 Turma</span>
            <strong>{atividade.turma}</strong>
          </div>

          {atividade.dataEntrega && (
            <div>
              <span>📅 Entrega</span>
              <strong>
                {new Date(atividade.dataEntrega).toLocaleDateString()}
              </strong>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <p>© Atividade disponibilizada pelo professor</p>
        </footer>
      </div>
    </main>
  );
}
