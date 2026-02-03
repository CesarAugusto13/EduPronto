"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./login.module.css";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", senha: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.senha);
      router.push("/dashboard");
    } catch {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Entrar</h1>
        <p className={styles.subtitle}>
          Acesse sua conta e gerencie suas atividades
        </p>

        <input
          className={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
        />

        <button className={styles.button} type="submit">
          Entrar
        </button>

        <div className={styles.link}>
          <span>Não tem conta? </span>
          <a href="/register">Criar conta</a>
        </div>
      </form>
    </div>
  );
}
