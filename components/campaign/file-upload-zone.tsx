"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export function FileUploadZone() {
  const [files, setFiles] = useState<File[]>([]);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter(
      (file) =>
        file.name.endsWith(".pdf") ||
        file.name.endsWith(".docx")
    );

    setFiles((prev) => [...prev, ...validFiles]);
  }

  return (
    <div className="space-y-6">
      <label
        className="
          flex
          min-h-[260px]
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-zinc-700
          bg-zinc-900/30
          p-8
          text-center
          transition
          hover:border-zinc-500
        "
      >
        <Upload
          size={40}
          className="mb-4 text-zinc-400"
        />

        <h3 className="text-lg font-medium">
          Upload Resumes
        </h3>

        <p className="mt-2 text-zinc-400">
          Drag and drop resumes or click to browse
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          PDF and DOCX only
        </p>

        <input
          type="file"
          multiple
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {files.length > 0 && (
        <div className="rounded-2xl border border-zinc-800 p-6">
          <h4 className="mb-4 font-medium">
            Uploaded Files
          </h4>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="
                  rounded-lg
                  border
                  border-zinc-800
                  bg-zinc-900/50
                  p-3
                "
              >
                {file.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}