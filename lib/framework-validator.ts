import {
  EvaluationCriterion,
  HiringFramework,
} from "@/types/framework";

const VALID_CATEGORIES = new Set([
  "technical",
  "experience",
  "behavioral",
  "leadership",
  "domain",
]);

const EMPTY_FRAMEWORK: HiringFramework = {
  roleSummary: "",
  mustHave: [],
  preferred: [],
  dealBreakers: [],
  clarificationAreas: [],
  hiddenEvaluationFactors: [],
  evaluationRisks: [],
  evaluationCriteria: [],
};

function unique(values: string[]) {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
}

export function validateFramework(
  data: unknown
): HiringFramework {
  if (!data || typeof data !== "object") {
    return EMPTY_FRAMEWORK;
  }

  const framework = data as Record<string, unknown>;

  const evaluationCriteria: EvaluationCriterion[] =
    Array.isArray(framework.evaluationCriteria)
      ? framework.evaluationCriteria
          .filter(
            (
              item
            ): item is Record<string, unknown> =>
              typeof item === "object" &&
              item !== null
          )
          .map((item) => ({
            criterion:
              typeof item.criterion === "string"
                ? item.criterion.trim()
                : "",

            weight:
              typeof item.weight === "number"
                ? Math.max(
                    0,
                    Math.min(100, item.weight)
                  )
                : 0,

            required:
              typeof item.required === "boolean"
                ? item.required
                : false,

            category:
              typeof item.category === "string" &&
              VALID_CATEGORIES.has(item.category)
                ? (item.category as EvaluationCriterion["category"])
                : "domain",

            evidenceExpected:
              typeof item.evidenceExpected ===
              "string"
                ? item.evidenceExpected.trim()
                : "",
          }))
          .filter(
            (criterion) =>
              criterion.criterion &&
              criterion.evidenceExpected &&
              criterion.weight > 0
          )
      : [];

  const result: HiringFramework = {
    roleSummary:
      typeof framework.roleSummary === "string"
        ? framework.roleSummary.trim()
        : "",

    mustHave: unique(
      Array.isArray(framework.mustHave)
        ? framework.mustHave.filter(
            (item): item is string =>
              typeof item === "string"
          )
        : []
    ),

    preferred: unique(
      Array.isArray(framework.preferred)
        ? framework.preferred.filter(
            (item): item is string =>
              typeof item === "string"
          )
        : []
    ),

    dealBreakers: unique(
      Array.isArray(framework.dealBreakers)
        ? framework.dealBreakers.filter(
            (item): item is string =>
              typeof item === "string"
          )
        : []
    ),

    clarificationAreas: unique(
      Array.isArray(
        framework.clarificationAreas
      )
        ? framework.clarificationAreas.filter(
            (item): item is string =>
              typeof item === "string"
          )
        : []
    ),

    hiddenEvaluationFactors: unique(
      Array.isArray(
        framework.hiddenEvaluationFactors
      )
        ? framework.hiddenEvaluationFactors.filter(
            (item): item is string =>
              typeof item === "string"
          )
        : []
    ),

    evaluationRisks: unique(
      Array.isArray(
        framework.evaluationRisks
      )
        ? framework.evaluationRisks.filter(
            (item): item is string =>
              typeof item === "string"
          )
        : []
    ),

    evaluationCriteria,
  };

  if (
    result.clarificationAreas.length === 0
  ) {
    result.clarificationAreas = [
      "No major ambiguities detected. Confirm requirement prioritization before evaluation.",
    ];
  }

  const totalWeight =
    result.evaluationCriteria.reduce(
      (sum, criterion) =>
        sum + criterion.weight,
      0
    );

  if (totalWeight !== 100) {
    console.warn(
      `⚠️ Evaluation weights total ${totalWeight} instead of 100.`
    );
  }

  return result;
}