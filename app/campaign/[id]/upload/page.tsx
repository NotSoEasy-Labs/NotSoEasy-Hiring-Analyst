import { notFound } from "next/navigation";

import { auth } from "@/auth";

import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/models/Campaign";

import { UploadZone } from "@/components/resume/upload-zone";
import { ResumeList } from "@/components/resume/resume-list";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UploadPage({
  params,
}: Props) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  await connectDB();

  const campaign = await Campaign.findOne({
    _id: id,
    ownerId: session.user.id,
  }).lean();

  if (!campaign) {
    notFound();
  }

  const campaignId = String(campaign._id);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Resume Upload
        </h1>

        <p className="mt-3 text-zinc-400">
          Upload candidate resumes for this campaign.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <UploadZone campaignId={campaignId} />
      </div>

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Uploaded Resumes
          </h2>

          <span className="text-sm text-zinc-500">
            Candidate Pool
          </span>
        </div>

        <ResumeList campaignId={campaignId} />
      </section>
    </main>
  );
}