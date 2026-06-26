import { DecisionResultContent } from "@/components/DecisionResultContent";

export const metadata = {
  title: "Resultado / Result - The Council",
};

interface DecisionPageProps {
  params: Promise<{ id: string }>;
}

export default async function DecisionPage({ params }: DecisionPageProps) {
  const { id } = await params;

  return <DecisionResultContent id={id} />;
}
