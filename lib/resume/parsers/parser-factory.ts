import { parsePdf } from "./pdf-parser";
import { parseDocx } from "./docx-parser";

export async function parseResumeFile(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<string> {
  const extension = fileName
    .split(".")
    .pop()
    ?.toLowerCase();

  if (
    mimeType === "application/pdf" ||
    extension === "pdf"
  ) {
    return parsePdf(buffer);
  }

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extension === "docx"
  ) {
    return parseDocx(buffer);
  }

  throw new Error(
    `Unsupported resume format: ${mimeType}`
  );
}