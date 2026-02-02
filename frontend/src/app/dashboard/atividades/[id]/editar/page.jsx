import EditarClient from "./EditarClient";

export default async function Page({ params }) {
  const { id } = await params;

  return <EditarClient id={id} />;
}
