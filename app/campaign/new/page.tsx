import { CampaignForm } from "@/components/campaign/campaign-form";
import { PageHeader } from "@/components/campaign/page-header";

export default function NewCampaignPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <PageHeader
        title="Create Campaign"
        description="Create a hiring campaign and prepare candidate evaluation."
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <CampaignForm />
      </div>
    </main>
  );
}