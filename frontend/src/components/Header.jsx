"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null; // ⛑️ evita erro enquanto carrega

  return (
    <header className={styles.header}>
      <div
        className={styles.profile}
        ref={dropdownRef}
        onClick={() => setOpen(!open)}
      >
        <img
          src={
            user.foto
              ? `${API_URL}${user.foto}`
              : "/avatar.png"
          }
          alt="Perfil"
          width={36}
          height={36}
          className={styles.avatar}
        />

        <span className={styles.name}>{user.nome}</span>

        {open && (
          <div className={styles.dropdown}>
            <Link href="/dashboard/perfil" onClick={() => setOpen(false)}>
              👤 Meu perfil
            </Link>

            <button onClick={handleLogout}>🚪 Sair</button>
          </div>
        )}
      </div>
    </header>
  );
}
