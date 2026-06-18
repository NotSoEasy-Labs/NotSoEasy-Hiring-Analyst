export function cleanResumeText(
  text: string
): string {
  return (
    text
      // Windows -> Unix newlines
      .replace(/\r\n/g, "\n")

      // Remove invisible / invalid Unicode characters
      .replace(/[\uFEFF\uFFFE\u200B-\u200D\u2060]/g, "")

      // Remove soft hyphens
      .replace(/\u00AD/g, "")

      // Normalize non-breaking spaces
      .replace(/\u00A0/g, " ")

      // Merge words split across lines
      // Example:
      // identi-
      // fication
      // =>
      // identification
      .replace(/(\w)-\s*\n\s*(\w)/g, "$1$2")

      // Tabs -> spaces
      .replace(/\t/g, " ")

      // Collapse multiple spaces
      .replace(/[ ]{2,}/g, " ")

      // Collapse excessive blank lines
      .replace(/\n{3,}/g, "\n\n")

      // Remove trailing whitespace
      .replace(/[ \t]+$/gm, "")

      // Trim
      .trim()
  );
}