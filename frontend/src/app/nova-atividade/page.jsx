'use client';
import { useState } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/navigation';

export default function NovaAtividade() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await api.post('/atividades', form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    router.push('/atividades');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nova Atividade</h1>
      <input placeholder="Título" onChange={e => setForm({ ...form, titulo: e.target.value })} />
      <input placeholder="Descrição" onChange={e => setForm({ ...form, descricao: e.target.value })} />
      <input placeholder="Matéria" onChange={e => setForm({ ...form, materia: e.target.value })} />
      <input placeholder="Ano" onChange={e => setForm({ ...form, ano: e.target.value })} />
      <button type="submit">Salvar</button>
    </form>
  );
}
