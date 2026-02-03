import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1 className={styles.logo}>EduPronto</h1>

        <nav className={styles.nav}>
          <Link href="/login">Entrar</Link>
          <Link href="/register" className={styles.register}>
            Criar conta
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <main className={styles.hero}>
        <span className={styles.badge}>🎓 Plataforma educacional</span>

        <h2>Organize sua vida docente em um só lugar</h2>

        <p>
          O <strong>EduPronto</strong> é uma plataforma feita para professores
          do ensino fundamental e médio organizarem atividades, planejarem
          aulas e acompanharem tudo de forma simples e digital.
        </p>

        <div className={styles.actions}>
          <Link href="/register" className={styles.primary}>
            🚀 Começar gratuitamente
          </Link>
          <Link href="#recursos" className={styles.secondary}>
            Ver recursos
          </Link>
        </div>

        <p className={styles.smallNote}>
          ✔ Sem cartão de crédito • ✔ Fácil de usar • ✔ 100% online
        </p>
      </main>

      {/* RECURSOS */}
      <section id="recursos" className={styles.features}>
        <h3>Por que usar o EduPronto?</h3>

        <div className={styles.featureGrid}>
          <div className={styles.card}>
            <h4>📚 Gestão de atividades</h4>
            <p>
              Crie, edite e acompanhe atividades por turma, matéria e data de
              entrega.
            </p>
          </div>

          <div className={styles.card}>
            <h4>🧠 Perfil profissional</h4>
            <p>
              Centralize suas informações acadêmicas e apresente sua trajetória
              como educador.
            </p>
          </div>

          <div className={styles.card}>
            <h4>📅 Organização por datas</h4>
            <p>
              Visualize prazos de entrega, atividades ativas e encerradas com
              clareza.
            </p>
          </div>

          <div className={styles.card}>
            <h4>🎓 Fundamental ao Ensino Médio</h4>
            <p>
              Estrutura pensada para atender do ensino fundamental ao ensino
              médio.
            </p>
          </div>

          <div className={styles.card}>
            <h4>⚡ Simples e rápido</h4>
            <p>
              Interface intuitiva, leve e feita para o dia a dia corrido do
              professor.
            </p>
          </div>

          <div className={styles.card}>
            <h4>🔒 Seguro e confiável</h4>
            <p>
              Seus dados protegidos com autenticação e boas práticas de
              segurança.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.cta}>
        <h3>Pronto para simplificar sua rotina?</h3>
        <p>
          Comece agora mesmo a organizar suas atividades e tenha mais tempo
          para o que realmente importa: ensinar.
        </p>

        <Link href="/register" className={styles.primary}>
          Criar minha conta agora
        </Link>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} <strong>EduPronto</strong> • Educação com
          tecnologia
        </p>
      </footer>
    </div>
  );
}
