import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>EduPronto</h1>

        <nav className={styles.nav}>
          <Link href="/login">Entrar</Link>
          <Link href="/register" className={styles.register}>
            Criar conta
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className={styles.hero}>
        <h2>Educação mais simples, organizada e digital</h2>
        <p>
          Uma plataforma feita para professores organizarem conteúdos,
          planejarem aulas e compartilharem conhecimento com facilidade.
        </p>

        <div className={styles.actions}>
          <Link href="/register" className={styles.primary}>
            Começar agora
          </Link>
          <Link href="#recursos" className={styles.secondary}>
            Ver recursos
          </Link>
        </div>
      </main>

      {/* Recursos */}
      <section id="recursos" className={styles.features}>
        <div>
          <h3>📚 Organize seus conteúdos</h3>
          <p>Centralize aulas, materiais e informações em um só lugar.</p>
        </div>

        <div>
          <h3>🧠 Perfil profissional</h3>
          <p>Apresente sua formação, experiência e trajetória docente.</p>
        </div>

        <div>
          <h3>⚡ Simples e rápido</h3>
          <p>Interface intuitiva pensada para o dia a dia do professor.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} EduPronto • Educação com tecnologia
      </footer>
    </div>
  );
}
