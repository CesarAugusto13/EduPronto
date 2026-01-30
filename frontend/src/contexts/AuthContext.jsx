'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, senha) {
    const response = await api.post('/auth/login', { email, senha });

    localStorage.setItem('token', response.data.token);
    api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

    setUser(response.data.professor);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        // ⚠️ O certo aqui é /profile/me (não /auth/me)
        const response = await api.get('/profile/me');
        setUser(response.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
