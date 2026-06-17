import { FileText } from "lucide-react";

import { ResumeActionsMenu } from "./resume-actions-menu";

type ResumeCardProps = {
  resume: {
    _id: string;
    originalFileName: string;
    mimeType: string;
    fileSize: number;
    status: string;
    createdAt: string;
  };
};

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(2)} MB`;
}

export function ResumeCard({
  resume,
}: ResumeCardProps) {
  const fileType =
    resume.mimeType.includes("pdf")
      ? "PDF"
      : "DOCX";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900/60">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="rounded-xl bg-zinc-800 p-3">
            <FileText className="h-6 w-6 text-zinc-300" />
          </div>

          <div>
            <h3 className="break-all text-lg font-semibold text-white">
              {resume.originalFileName}
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                {fileType}
              </span>

              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                {resume.status}
              </span>
            </div>
          </div>
        </div>

        <ResumeActionsMenu
          resumeId={resume._id}
        />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm text-zinc-400">
        <span>
          {formatFileSize(
            resume.fileSize
          )}
        </span>

        <span>
          {new Date(
            resume.createdAt
          ).toLocaleString()}
        </span>
      </div>
    </div>
  );
}