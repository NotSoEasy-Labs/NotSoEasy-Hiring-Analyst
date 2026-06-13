import { ClarificationQuestion } from "@/types/clarification";
import { validateClarifications } from "./clarification-validator";

export function parseClarifications(
  rawText: string
): ClarificationQuestion[] {
  try {
    if (!rawText?.trim()) {
      return validateClarifications(null);
    }

    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return validateClarifications(parsed);
  } catch (error) {
    console.error(
      "Clarification parsing failed:",
      error
    );

    return validateClarifications(null);
  }
}