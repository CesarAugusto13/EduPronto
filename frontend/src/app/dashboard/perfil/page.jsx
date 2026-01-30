"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "@/services/api";
import styles from "./perfil.module.css";
import Image from "next/image";

export default function Perfil() {
  const { user, setUser } = useAuth(); // 🔥 ESSENCIAL
  const [foto, setFoto] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    biografia: "",
    email: "",
    escola: "",
    formacoes: "",
    senha: "",
    foto: null,
  });

  useEffect(() => {
    api
      .get("/profile/me")
      .then((res) => {
        if (!res.data) return;

        setForm({
          nome: res.data.nome || "",
          biografia: res.data.biografia || "",
          email: res.data.email || "",
          escola: res.data.escola || "",
          formacoes: res.data.formacoes?.join(", ") || "",
          senha: "",
          foto: res.data.foto || null, // 🔥 AQUI
        });
      })
      .catch(() => {
        console.log("Erro ao carregar perfil");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put("/profile", {
      ...form,
      formacoes: form.formacoes
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    });

    alert("Perfil atualizado com sucesso!");
  };

  const handleFotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);

    const response = await api.post("/profile/foto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Atualiza usuário global (Header, etc)
    setUser(response.data.professor);

    // Atualiza foto local
    setForm((prev) => ({
      ...prev,
      foto: response.data.professor.foto,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Meu Perfil</h1>

        <div className={styles.avatarBox}>
          <label className={styles.avatarLabel}>
            <input type="file" accept="image/*" onChange={handleFotoUpload} />

            <img
              src={
                form.foto ? `http://localhost:3000${form.foto}` : "/avatar.png"
              }
              alt="Foto do professor"
              className={styles.avatar}
            />

            <span>Alterar foto</span>
          </label>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Nome</label>
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </div>

          <div className={styles.field}>
            <label>Biografia</label>
            <textarea
              rows={3}
              value={form.biografia}
              onChange={(e) => setForm({ ...form, biografia: e.target.value })}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label>Escola</label>
              <input
                value={form.escola}
                onChange={(e) => setForm({ ...form, escola: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Formações</label>
            <input
              placeholder="Ex: Matemática, Pedagogia, Pós-graduação"
              value={form.formacoes}
              onChange={(e) => setForm({ ...form, formacoes: e.target.value })}
            />
            <span className={styles.hint}>Separe por vírgulas</span>
          </div>

          <div className={styles.field}>
            <label>Nova senha</label>
            <input
              type="password"
              placeholder="Opcional"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
          </div>

          <button className={styles.button} type="submit">
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
}
