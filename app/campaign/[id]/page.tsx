import Link from "next/link";
import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CampaignPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const campaign = await Campaign.findById(id).lean();

  if (!campaign) {
    notFound();
  }

  const campaignId = String(campaign._id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {campaign.title}
            </h1>

            <p className="mt-3 text-zinc-400">
              Campaign Workspace
            </p>
          </div>

          <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm">
            {String(campaign.status).replaceAll(
              "_",
              " "
            )}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Link
          href={`/campaign/${campaignId}/framework`}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700"
        >
          <h2 className="text-xl font-semibold">
            Framework
          </h2>

          <p className="mt-2 text-zinc-400">
            {campaign.framework
              ? "Framework generated."
              : "Generate the hiring framework."}
          </p>
        </Link>

        <Link
          href={`/campaign/${campaignId}/clarification`}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700"
        >
          <h2 className="text-xl font-semibold">
            Clarifications
          </h2>

          <p className="mt-2 text-zinc-400">
            {campaign.refinedFramework
              ? "View refined framework."
              : "Answer clarification questions."}
          </p>
        </Link>

        <Link
          href={`/campaign/${campaignId}/upload`}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700"
        >
          <h2 className="text-xl font-semibold">
            Resume Upload
          </h2>

          <p className="mt-2 text-zinc-400">
            Upload resumes for evaluation.
          </p>
        </Link>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-xl font-semibold">
            Candidates
          </h2>

          <p className="mt-2 text-zinc-400">
            Coming in Checkpoint 6.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-xl font-semibold">
          Campaign Details
        </h2>

        <div className="mt-4 space-y-2 text-zinc-400">
          <p>
            <strong>Status:</strong>{" "}
            {String(campaign.status).replaceAll(
              "_",
              " "
            )}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(
              campaign.createdAt as string
            ).toLocaleString()}
          </p>

          <p>
            <strong>Updated:</strong>{" "}
            {new Date(
              campaign.updatedAt as string
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}