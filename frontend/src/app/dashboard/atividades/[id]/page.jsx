import VisualizarAtividadeClient from "./VisualizarAtividadeClient";

export default async function Page({ params }) {
  const { id } = await params; // ✅ obrigatório

  return <VisualizarAtividadeClient atividadeId={id} />;
}
