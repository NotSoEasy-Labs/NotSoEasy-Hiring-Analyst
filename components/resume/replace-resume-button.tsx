"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

import { replaceResume } from "@/app/actions/resume/replace-resume";

type Props = {
  resumeId: string;
};

export function ReplaceResumeButton({
  resumeId,
}: Props) {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "resumeId",
      resumeId
    );

    formData.append(
      "resume",
      file
    );

    startTransition(async () => {
      const result =
        await replaceResume(
          formData
        );

      if (!result.success) {
        alert(
          result.error ??
            "Unable to replace resume."
        );

        return;
      }

      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={() =>
          inputRef.current?.click()
        }
        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <RefreshCcw className="h-4 w-4" />
        <span>
          {isPending
            ? "Replacing..."
            : "Replace"}
        </span>
      </button>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
      />
    </>
  );
}