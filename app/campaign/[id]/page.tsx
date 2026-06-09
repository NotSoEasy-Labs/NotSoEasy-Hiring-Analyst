import Link from "next/link";

import { PageHeader } from "@/components/campaign/page-header";
import { StatsCard } from "@/components/campaign/stats-card";
import { EmptyState } from "@/components/campaign/empty-state";

export default function CampaignDashboard() {
  const campaign = {
    id: "1",
    name: "Senior Frontend Engineer Hiring",
    frameworkStatus: "Pending",
    resumeCount: 0,
    candidateCount: 0,
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <PageHeader
        title={campaign.name}
        description="Campaign Dashboard"
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Framework Status"
          value={campaign.frameworkStatus}
        />

        <StatsCard
          title="Resume Count"
          value={campaign.resumeCount}
        />

        <StatsCard
          title="Candidate Count"
          value={campaign.candidateCount}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={`/campaign/${campaign.id}/upload`}
          className="rounded-lg bg-white px-5 py-3 font-medium text-black"
        >
          Upload Resumes
        </Link>

        <button
          className="
            rounded-lg
            border
            border-zinc-800
            px-5
            py-3
          "
        >
          View Rankings
        </button>
      </div>

      <div className="mt-10">
        <EmptyState
          title="No Resumes Uploaded"
          description="Upload resumes to start evaluating candidates."
        />
      </div>
    </main>
  );
}