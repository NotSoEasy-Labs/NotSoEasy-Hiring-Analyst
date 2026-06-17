import { getResumes } from "@/app/actions/resume/get-resumes";

import { ResumeCard } from "./resume-card";

type Props = {
  campaignId: string;
};

export async function ResumeList({
  campaignId,
}: Props) {
  const result =
    await getResumes(campaignId);

  if (!result.success) {
    return (
      <div className="rounded-xl border border-red-800 p-6">
        Unable to load resumes.
      </div>
    );
  }

  if (!result.resumes.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-800 p-10 text-center">
        <h3 className="text-lg font-semibold">
          No resumes uploaded yet.
        </h3>

        <p className="mt-2 text-zinc-400">
          Upload your first candidate to
          begin evaluation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {result.resumes.map((resume: any) => (
        <ResumeCard
          key={resume._id.toString()}
          resume={{
            ...resume,
            _id: resume._id.toString(),
            createdAt:
              resume.createdAt.toString(),
          }}
        />
      ))}
    </div>
  );
}