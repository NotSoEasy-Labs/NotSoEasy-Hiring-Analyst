import { FrameworkClient } from "@/components/framework/framework-client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FrameworkPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <FrameworkClient campaignId={id} />
    </main>
  );
}