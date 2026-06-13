import { validateFramework } from "./framework-validator";

import { HiringFramework } from "@/types/framework";

const EMPTY_FRAMEWORK: HiringFramework =
  {
    roleSummary: "",

    mustHave: [],

    preferred: [],

    dealBreakers: [],

    clarificationAreas: [],

    hiddenEvaluationFactors: [],

    evaluationRisks: [],

    evaluationCriteria: [],
  };

export function parseFramework(
  rawText: string
): HiringFramework {
  try {
    if (!rawText?.trim()) {
      return EMPTY_FRAMEWORK;
    }

    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(cleaned);

    return validateFramework(
      parsed
    );
  } catch (error) {
    console.error(
      "Framework parsing failed:",
      error
    );

    return EMPTY_FRAMEWORK;
  }
}