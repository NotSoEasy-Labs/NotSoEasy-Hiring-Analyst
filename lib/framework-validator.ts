import {
  EvaluationCriterion,
  HiringFramework,
} from "@/types/framework";

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

export function validateFramework(
  data: unknown
): HiringFramework {
  if (!data || typeof data !== "object") {
    return EMPTY_FRAMEWORK;
  }

  const framework =
    data as Record<string, unknown>;

  const evaluationCriteria: EvaluationCriterion[] =
    Array.isArray(
      framework.evaluationCriteria
    )
      ? framework.evaluationCriteria
          .filter(
            (
              item
            ): item is Record<
              string,
              unknown
            > =>
              typeof item ===
                "object" &&
              item !== null
          )
          .map((item) => ({
            criterion:
              typeof item.criterion ===
              "string"
                ? item.criterion
                : "",

            weight:
              typeof item.weight ===
              "number"
                ? item.weight
                : 0,

            required:
              typeof item.required ===
              "boolean"
                ? item.required
                : false,

            category:
              typeof item.category ===
              "string"
                ? (item.category as any)
                : "domain",

            evidenceExpected:
              typeof item.evidenceExpected ===
              "string"
                ? item.evidenceExpected
                : "",
          }))
      : [];

  const result: HiringFramework =
    {
      roleSummary:
        typeof framework.roleSummary ===
        "string"
          ? framework.roleSummary
          : "",

      mustHave: Array.isArray(
        framework.mustHave
      )
        ? framework.mustHave.filter(
            (
              item
            ): item is string =>
              typeof item ===
              "string"
          )
        : [],

      preferred: Array.isArray(
        framework.preferred
      )
        ? framework.preferred.filter(
            (
              item
            ): item is string =>
              typeof item ===
              "string"
          )
        : [],

      dealBreakers: Array.isArray(
        framework.dealBreakers
      )
        ? framework.dealBreakers.filter(
            (
              item
            ): item is string =>
              typeof item ===
              "string"
          )
        : [],

      clarificationAreas:
        Array.isArray(
          framework.clarificationAreas
        )
          ? framework.clarificationAreas.filter(
              (
                item
              ): item is string =>
                typeof item ===
                "string"
            )
          : [],

      hiddenEvaluationFactors:
        Array.isArray(
          framework.hiddenEvaluationFactors
        )
          ? framework.hiddenEvaluationFactors.filter(
              (
                item
              ): item is string =>
                typeof item ===
                "string"
            )
          : [],

      evaluationRisks:
        Array.isArray(
          framework.evaluationRisks
        )
          ? framework.evaluationRisks.filter(
              (
                item
              ): item is string =>
                typeof item ===
                "string"
            )
          : [],

      evaluationCriteria,
    };

  if (
    result.clarificationAreas
      .length === 0
  ) {
    result.clarificationAreas =
      [
        "No major ambiguities detected. Confirm requirement prioritization before evaluation.",
      ];
  }

console.log(
  "VALIDATED FRAMEWORK:"
);

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);

return result;
}