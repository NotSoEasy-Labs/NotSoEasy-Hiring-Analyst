import { ClarificationQuestion } from "@/types/clarification";

const FALLBACK_QUESTIONS: ClarificationQuestion[] = [
  {
    id: "default",
    question:
      "How important are preferred criteria relative to must-have criteria?",
    type: "weighting",
    options: ["Low", "Medium", "High"],
  },
];

export function validateClarifications(
  data: unknown
): ClarificationQuestion[] {
  try {
    if (!data || typeof data !== "object") {
      return FALLBACK_QUESTIONS;
    }

    const questions = (data as any).questions;

    if (!Array.isArray(questions)) {
      return FALLBACK_QUESTIONS;
    }

    const validQuestions = questions
      .filter((question) => {
        return (
          question &&
          typeof question.id === "string" &&
          typeof question.question === "string" &&
          typeof question.type === "string" &&
          Array.isArray(question.options) &&
          question.options.length > 0
        );
      })
      .slice(0, 5);

    if (validQuestions.length === 0) {
      return FALLBACK_QUESTIONS;
    }

    return validQuestions;
  } catch {
    return FALLBACK_QUESTIONS;
  }
}