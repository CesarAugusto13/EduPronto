"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";
import styles from "./Atividades.module.css";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

export default function Atividades() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState({
    materia: "",
    turma: "",
  });

  useEffect(() => {
    async function loadAtividades() {
      try {
        const response = await api.get("/atividades");
        setAtividades(response.data);
      } catch (error) {
        console.error("Erro ao carregar atividades", error);
      } finally {
        setLoading(false);
      }
    }

    loadAtividades();
  }, []);

  const atividadesFiltradas = atividades.filter((atividade) => {
    return (
      atividade.titulo.toLowerCase().includes(busca.toLowerCase()) &&
      (!filtros.materia ||
        atividade.materia
          .toLowerCase()
          .includes(filtros.materia.toLowerCase())) &&
      (!filtros.turma || atividade.turma === filtros.turma)
    );
  });

  async function handleDelete(id) {
    const confirmacao = confirm(
      "Tem certeza que deseja excluir essa atividade?",
    );
    if (!confirmacao) return;

    try {
      await api.delete(`/atividades/${id}`);
      setAtividades((prev) => prev.filter((a) => a._id !== id));
      toast.success("Atividade excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir atividade");
    }
  }

  if (loading) {
  return <Loading text="Carregando atividade..." />;
  }

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
          placeholder="Buscar por título..."
          className={styles.search}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filtrar por matéria"
          value={filtros.materia}
          onChange={(e) => setFiltros({ ...filtros, materia: e.target.value })}
        />

        <select
          value={filtros.turma}
          onChange={(e) => setFiltros({ ...filtros, turma: e.target.value })}
        >
          <option value="">Todas as turmas</option>
          <option value="1º Ano">1º Ano</option>
          <option value="2º Ano">2º Ano</option>
          <option value="3º Ano">3º Ano</option>
        </select>
      </div>

      {/* LISTA */}
      <div className={styles.list}>
        {atividadesFiltradas.length === 0 ? (
          <p style={{ padding: 16 }}>Nenhuma atividade encontrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Matéria</th>
                <th>Ano</th>
                <th>Criada em</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {atividadesFiltradas.map((atividade) => (
                <tr key={atividade._id}>
                  <td data-label="Título">{atividade.titulo}</td>
                  <td data-label="Matéria">{atividade.materia}</td>
                  <td data-label="Ano">{atividade.ano}</td>
                  <td data-label="Criada em">
                    {new Date(atividade.criadaEm).toLocaleDateString()}
                  </td>
                  <td className={styles.actions}>
                    <Link
                      href={`/dashboard/atividades/${atividade._id}/editar`}
                    >
                      ✏️
                    </Link>
                    <Link
                      href={`/dashboard/atividades/${atividade._id}`}
                    >
                      👁️
                    </Link>
                    <button
                      className={styles.delete}
                      title="Excluir"
                      onClick={() => handleDelete(atividade._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
