import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>EduPronto</h1>
      <p>Plataforma de apoio a professores da rede pública</p>

      <Link href="/login">Login</Link> |{' '}
      <Link href="/register">Cadastro</Link>
    </main>
  );
}
