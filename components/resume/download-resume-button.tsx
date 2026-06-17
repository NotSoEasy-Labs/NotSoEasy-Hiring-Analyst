"use client";

import { Download } from "lucide-react";

type Props = {
  resumeId: string;
};

export function DownloadResumeButton({
  resumeId,
}: Props) {
  function handleDownload() {
    window.open(
      `/api/resume/${resumeId}/download`,
      "_blank"
    );
  }

  return (
    <button
      onClick={handleDownload}
      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <Download className="h-4 w-4" />
      <span>Download</span>
    </button>
  );
}