"use client";

import {
  useRef,
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import { uploadResumes } from "@/app/actions/resume/upload-resumes";

type Props = {
  campaignId: string;
};

export function UploadZone({
  campaignId,
}: Props) {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [files, setFiles] =
    useState<File[]>([]);

  const [message, setMessage] =
    useState("");

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleFiles(
    selectedFiles: FileList | null
  ) {
    if (!selectedFiles) {
      return;
    }

    setFiles(
      Array.from(selectedFiles)
    );
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    handleFiles(
      e.dataTransfer.files
    );
  }

  function handleUpload() {
    if (!files.length) {
      return;
    }

    startTransition(async () => {
      const formData =
        new FormData();

      formData.append(
        "campaignId",
        campaignId
      );

      files.forEach((file) => {
        formData.append(
          "resumes",
          file
        );
      });

      const result =
        await uploadResumes(
          formData
        );

      if (!result.success) {
        setMessage(
          result.error ??
            "Upload failed."
        );

        return;
      }

      setMessage(
        `${result.resumes?.length ?? 0} resume(s) uploaded successfully.`
      );

      setFiles([]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      router.refresh();
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-dashed border-zinc-700 p-8">
      <div
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDrop={handleDrop}
        onClick={() =>
          inputRef.current?.click()
        }
        className="cursor-pointer rounded-xl border border-zinc-800 p-10 text-center transition hover:border-zinc-600"
      >
        <p className="text-lg font-medium">
          Drag & Drop resumes
        </p>

        <p className="mt-2 text-sm text-zinc-400">
          or click to browse
        </p>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            handleFiles(
              e.target.files
            )
          }
        />
      </div>

      {!!files.length && (
        <div className="rounded-xl border border-zinc-800 p-4">
          <h3 className="mb-3 font-medium">
            Selected Files
          </h3>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={`${file.name}-${file.size}`}
                className="flex items-center justify-between rounded-lg bg-zinc-900 px-3 py-2 text-sm"
              >
                <span className="truncate">
                  {file.name}
                </span>

                <span className="text-zinc-400">
                  {(
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)}
                  MB
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={isPending}
            className="mt-6 w-full rounded-lg bg-white px-5 py-3 font-medium text-black transition disabled:opacity-50"
          >
            {isPending
              ? "Uploading..."
              : "Upload Resumes"}
          </button>
        </div>
      )}

      {!!message && (
        <p className="text-sm text-emerald-400">
          {message}
        </p>
      )}
    </div>
  );
}