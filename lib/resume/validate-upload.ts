const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE =
  10 * 1024 * 1024; // 10 MB

export function validateResumeFile(
  file: File
) {
  if (
    !ALLOWED_MIME_TYPES.includes(file.type)
  ) {
    throw new Error(
      `${file.name} is not a supported file type.`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `${file.name} exceeds the 10 MB upload limit.`
    );
  }
}