"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import styles from "./AtividadeForm.module.css";

export default function AtividadeForm({ atividadeId }) {
  const router = useRouter();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    materia: "",
    turma: "",
    dataEntrega: "",
    status: "ativa",
  });

  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(!!atividadeId);

  // 🔄 CARREGAR DADOS (EDIÇÃO)
  useEffect(() => {
    if (!atividadeId) return;

    async function carregarAtividade() {
      try {
        const { data } = await api.get(`/atividades/${atividadeId}`);

        setForm({
          titulo: data.titulo ?? "",
          descricao: data.descricao ?? "",
          materia: data.materia ?? "",
          turma: data.turma ?? "",
          status: data.status ?? "ativa",
          dataEntrega: data.dataEntrega
            ? data.dataEntrega.slice(0, 10)
            : "",
        });
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar atividade");
        router.push("/dashboard/atividades");
      } finally {
        setLoadingForm(false);
      }
    }

    carregarAtividade();
  }, [atividadeId, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (atividadeId) {
        await api.put(`/atividades/${atividadeId}`, form);
        alert("Atividade atualizada com sucesso!");
      } else {
        await api.post("/atividades", form);
        alert("Atividade criada com sucesso!");
      }

      router.push("/dashboard/atividades");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar atividade");
    } finally {
      setLoading(false);
    }
  }

  // ⏳ LOADING DE EDIÇÃO
  if (loadingForm) {
    return <p>Carregando atividade...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{atividadeId ? "Editar atividade" : "Nova atividade"}</h2>

      <input
        type="text"
        placeholder="Título"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        required
      />

      <textarea
        placeholder="Descrição"
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
      />

      <input
        type="text"
        placeholder="Matéria"
        value={form.materia}
        onChange={(e) => setForm({ ...form, materia: e.target.value })}
        required
      />

      <select
        value={form.turma}
        onChange={(e) => setForm({ ...form, turma: e.target.value })}
        required
      >
        <option value="">Selecione a turma</option>
        <option value="1º Ano">1º Ano</option>
        <option value="2º Ano">2º Ano</option>
        <option value="3º Ano">3º Ano</option>
      </select>

      <input
        type="date"
        value={form.dataEntrega}
        onChange={(e) =>
          setForm({ ...form, dataEntrega: e.target.value })
        }
      />

      {/* 👇 STATUS SÓ FAZ SENTIDO NA EDIÇÃO */}
      {atividadeId && (
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="ativa">Ativa</option>
          <option value="encerrada">Encerrada</option>
        </select>
      )}

      <button type="submit" disabled={loading}>
        {loading
          ? "Salvando..."
          : atividadeId
          ? "Salvar alterações"
          : "Criar atividade"}
      </button>
    </form>
  );
}
