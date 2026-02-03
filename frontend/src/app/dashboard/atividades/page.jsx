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
    ano: "",
    ordenarPor: "",
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

  const atividadesFiltradas = atividades
    .filter((atividade) => {
      const tituloMatch = atividade.titulo
        .toLowerCase()
        .includes(busca.toLowerCase());

      const materiaMatch =
        !filtros.materia ||
        atividade.materia.toLowerCase().includes(filtros.materia.toLowerCase());

      const anoMatch = !filtros.ano || atividade.ano === filtros.ano;

      return tituloMatch && materiaMatch && anoMatch;
    })
    .sort((a, b) => {
      if (!filtros.ordenarPor) return 0;

      if (filtros.ordenarPor === "entregaAsc") {
        return new Date(a.dataEntrega) - new Date(b.dataEntrega);
      }

      if (filtros.ordenarPor === "entregaDesc") {
        return new Date(b.dataEntrega) - new Date(a.dataEntrega);
      }

      if (filtros.ordenarPor === "criacaoAsc") {
        return new Date(a.criadaEm) - new Date(b.criadaEm);
      }

      if (filtros.ordenarPor === "criacaoDesc") {
        return new Date(b.criadaEm) - new Date(a.criadaEm);
      }

      return 0;
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
          value={filtros.ano}
          onChange={(e) => setFiltros({ ...filtros, ano: e.target.value })}
        >
          <option value="">Todos os anos</option>
          <option value="1º Ano">1º Ano</option>
          <option value="2º Ano">2º Ano</option>
          <option value="3º Ano">3º Ano</option>
        </select>

        <select
          value={filtros.ordenarPor}
          onChange={(e) =>
            setFiltros({ ...filtros, ordenarPor: e.target.value })
          }
        >
          <option value="">Ordenar por</option>
          <option value="entregaAsc">Entrega (mais próxima)</option>
          <option value="entregaDesc">Entrega (mais distante)</option>
          <option value="criacaoDesc">Criação (mais recente)</option>
          <option value="criacaoAsc">Criação (mais antiga)</option>
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
                <th>Entrega</th>
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

                  <td data-label="Entrega">
                    {atividade.dataEntrega
                      ? new Date(atividade.dataEntrega).toLocaleDateString()
                      : "-"}
                  </td>

                  <td data-label="Criada em">
                    {new Date(atividade.criadaEm).toLocaleDateString()}
                  </td>

                  <td className={styles.actions}>
                    <Link
                      href={`/dashboard/atividades/${atividade._id}/editar`}
                    >
                      ✏️
                    </Link>

                    <Link href={`/dashboard/atividades/${atividade._id}`}>
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
