import { ClarificationClient } from "@/components/clarification/clarification-client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClarificationPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <ClarificationClient
        campaignId={id}
      />
    </main>
  );
}