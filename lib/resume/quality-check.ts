export type ResumeQuality = {
  textLength: number;
  wordCount: number;
  estimatedPages: number;
  isImageOnly: boolean;
  isLowQuality: boolean;
};

export function checkResumeQuality(
  text: string
): ResumeQuality {
  const cleaned = text.trim();

  const textLength =
    cleaned.length;

  const wordCount =
    cleaned.length === 0
      ? 0
      : cleaned
          .split(/\s+/)
          .filter(Boolean).length;

  // Very rough estimate
  const estimatedPages =
    Math.max(
      1,
      Math.ceil(wordCount / 500)
    );

  const isImageOnly =
    textLength === 0;

  // Heuristic
  const isLowQuality =
    textLength < 250 ||
    wordCount < 50;

  return {
    textLength,
    wordCount,
    estimatedPages,
    isImageOnly,
    isLowQuality,
  };
}