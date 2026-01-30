'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

export default function Atividades() {
  const [atividades, setAtividades] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadAtividades() {
      const response = await api.get('/atividades');
      setAtividades(response.data);
    }

    loadAtividades();
  }, []);

  return (
    <div>
      <h1>Atividades</h1>

      <button onClick={() => router.push('/atividades/nova')}>
        Nova Atividade
      </button>

      <ul>
        {atividades.map((a) => (
          <li key={a._id}>
            <strong>{a.titulo}</strong> — {a.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}
