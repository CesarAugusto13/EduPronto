"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import styles from "./AtividadeForm.module.css";

/* 📚 CONSTANTES EDUCACIONAIS */
const TURMAS = [
  "1º Ano - Fundamental",
  "2º Ano - Fundamental",
  "3º Ano - Fundamental",
  "4º Ano - Fundamental",
  "5º Ano - Fundamental",
  "6º Ano - Fundamental",
  "7º Ano - Fundamental",
  "8º Ano - Fundamental",
  "9º Ano - Fundamental",
  "1º Ano - Ensino Médio",
  "2º Ano - Ensino Médio",
  "3º Ano - Ensino Médio",
];

const MATERIAS = [
  "Língua Portuguesa",
  "Matemática",
  "Ciências",
  "História",
  "Geografia",
  "Arte",
  "Educação Física",
  "Inglês",
  "Ensino Religioso",
  "Física",
  "Química",
  "Biologia",
  "Filosofia",
  "Sociologia",
  "Redação",
  "Projeto de Vida",
  "Tecnologia",
];

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

  /* 🔄 CARREGAR ATIVIDADE (EDIÇÃO) */
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

  if (loadingForm) {
    return <p>Carregando atividade...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{atividadeId ? "Editar atividade" : "Nova atividade"}</h2>

      <input
        type="text"
        placeholder="Título da atividade"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        required
      />

      <textarea
        placeholder="Descrição da atividade (opcional)"
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
      />

      {/* 📘 MATÉRIA */}
      <select
        value={form.materia}
        onChange={(e) => setForm({ ...form, materia: e.target.value })}
        required
      >
        <option value="">Selecione a matéria</option>
        {MATERIAS.map((materia) => (
          <option key={materia} value={materia}>
            {materia}
          </option>
        ))}
      </select>

      {/* 🎓 TURMA */}
      <select
        value={form.turma}
        onChange={(e) => setForm({ ...form, turma: e.target.value })}
        required
      >
        <option value="">Selecione a turma</option>
        {TURMAS.map((turma) => (
          <option key={turma} value={turma}>
            {turma}
          </option>
        ))}
      </select>

        <label htmlFor="dataEntrega">Data de entrega</label>
        <input
          id="dataEntrega"
          type="date"
          value={form.dataEntrega}
          onChange={(e) =>
            setForm({ ...form, dataEntrega: e.target.value })
          }
        />

      {/* 🔁 STATUS (SÓ NA EDIÇÃO) */}
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
