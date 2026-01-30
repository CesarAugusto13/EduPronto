'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import styles from './register.module.css';

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', form);
      router.push('/login');
    } catch {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Criar conta</h1>

        <input
          className={styles.input}
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />

        <input
          className={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={e => setForm({ ...form, senha: e.target.value })}
        />

        <button className={styles.button} type="submit">
          Cadastrar
        </button>

        <div className={styles.link}>
          <span>Já tem conta? </span>
          <a href="/login">Entrar</a>
        </div>
      </form>
    </div>
  );
}
