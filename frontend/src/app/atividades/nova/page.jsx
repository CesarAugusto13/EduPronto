'use client';

import { useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

export default function NovaAtividade() {
  const router = useRouter();
  const [form, setForm] = useState({
    titulo: '',
    descricao: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/atividades', form);
    router.push('/atividades');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nova Atividade</h1>

      <input
        placeholder="Título"
        value={form.titulo}
        onChange={e => setForm({ ...form, titulo: e.target.value })}
      />

      <textarea
        placeholder="Descrição"
        value={form.descricao}
        onChange={e => setForm({ ...form, descricao: e.target.value })}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
