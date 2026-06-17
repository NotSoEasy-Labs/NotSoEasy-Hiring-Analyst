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

const VALID_TYPES = new Set([
  "priority",
  "flexibility",
  "weighting",
  "dealbreaker",
]);

export function validateClarifications(
  data: unknown
): ClarificationQuestion[] {
  if (!data || typeof data !== "object") {
    return FALLBACK_QUESTIONS;
  }

  const questions = (data as any).questions;

  if (!Array.isArray(questions)) {
    return FALLBACK_QUESTIONS;
  }

  const validQuestions = questions
    .filter((question): question is ClarificationQuestion => {
      return (
        question &&
        typeof question.id === "string" &&
        question.id.trim().length > 0 &&
        typeof question.question === "string" &&
        question.question.trim().length > 0 &&
        typeof question.type === "string" &&
        VALID_TYPES.has(question.type) &&
        Array.isArray(question.options) &&
        question.options.length > 0 &&
        question.options.every(
          (option: unknown) =>
            typeof option === "string" && option.trim().length > 0
        )
      );
    })
    .slice(0, 5);

  return validQuestions.length > 0
    ? validQuestions
    : FALLBACK_QUESTIONS;
}