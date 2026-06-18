"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Sparkles } from "lucide-react";

import { parseResumeAction } from "@/app/actions/resume/parse-resume";

type Props = {
  resumeId: string;
  status: string;
};

export function ParseResumeButton({
  resumeId,
  status,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const disabled =
    status !== "UPLOADED" ||
    isPending;

  function handleClick() {
    startTransition(async () => {
      const result =
        await parseResumeAction(
          resumeId
        );

      if (!result.success) {
        alert(
          result.error ??
            "Unable to parse resume."
        );

        return;
      }

      router.refresh();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
    >
      <Sparkles className="h-4 w-4" />

      <span>
        {isPending
          ? "Parsing..."
          : "Parse Resume"}
      </span>
    </button>
  );
}