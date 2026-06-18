"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteResume } from "@/app/actions/resume/delete-resume";
import { ParseResumeButton } from "./parse-resume-button";

type Props = {
  resumeId: string;
};

export function DeleteResumeButton({
  resumeId,
}: Props) {
  const router = useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this resume?\n\nThis action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await deleteResume(
        resumeId
      );

      if (!result.success) {
        alert(
          result.error ??
            "Unable to delete resume."
        );

        return;
      }

      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-500 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />

      <span>
        {isPending
          ? "Deleting..."
          : "Delete"}
      </span>
    </button>
  );
}