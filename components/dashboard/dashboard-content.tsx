import Link from "next/link";

import { CampaignCard } from "./campaign-card";

type Campaign = {
  _id: string;
  title: string;
  status: string;
  framework: unknown;
  clarificationQuestions: unknown[];
  createdAt: string;
  updatedAt: string;
};

type Props = {
  campaigns: Campaign[];
};

export function DashboardContent({
  campaigns,
}: Props) {
  const totalCampaigns =
    campaigns.length;

  const draftCampaigns =
    campaigns.filter(
      (campaign) =>
        campaign.status ===
        "DRAFT"
    ).length;

  const frameworksGenerated =
    campaigns.filter(
      (campaign) =>
        campaign.framework
    ).length;

  const readyForEvaluation =
    campaigns.filter(
      (campaign) =>
        campaign.status ===
        "READY_FOR_EVALUATION"
    ).length;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Hiring Workspace
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage all your hiring campaigns
            from one place.
          </p>
        </div>

        <Link
          href="/campaign/new"
          className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
        >
          + New Campaign
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Campaigns"
          value={totalCampaigns}
        />

        <StatCard
          title="Drafts"
          value={draftCampaigns}
        />

        <StatCard
          title="Frameworks"
          value={frameworksGenerated}
        />

        <StatCard
          title="Ready"
          value={readyForEvaluation}
        />
      </div>

      {campaigns.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 p-10 text-center">
          <h2 className="text-xl font-semibold">
            You haven't created any campaigns yet.
          </h2>

          <Link
            href="/campaign/new"
            className="mt-6 inline-block rounded-lg bg-white px-5 py-3 font-medium text-black"
          >
            Create First Campaign
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map(
            (campaign) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
};

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}