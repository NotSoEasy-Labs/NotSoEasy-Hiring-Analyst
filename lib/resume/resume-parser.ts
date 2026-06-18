import { parseResumeFile } from "./parsers/parser-factory";
import { cleanResumeText } from "./text-cleaner";
import { checkResumeQuality } from "./quality-check";

export type ParsedResume = {
  rawText: string;
  textLength: number;
  wordCount: number;
  estimatedPages: number;
  isImageOnly: boolean;
  isLowQuality: boolean;
};

export async function parseResume(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<ParsedResume> {
  // Extract text
  const extractedText =
    await parseResumeFile(
      buffer,
      mimeType,
      fileName
    );

  console.log("\n========== RAW ==========\n");
  console.log(extractedText);

  // Clean text
  const rawText =
    cleanResumeText(
      extractedText
    );

  console.log("\n======= CLEANED =======\n");
  console.log(rawText);

  // Analyze quality
  const quality =
    checkResumeQuality(
      rawText
    );

  return {
    rawText,
    ...quality,
  };
}