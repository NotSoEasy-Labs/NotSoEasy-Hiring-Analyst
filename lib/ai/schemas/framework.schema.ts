export const frameworkSchema = {
  type: "object",
  properties: {
    roleSummary: {
      type: "string",
    },

    mustHave: {
      type: "array",
      items: {
        type: "string",
      },
    },

    preferred: {
      type: "array",
      items: {
        type: "string",
      },
    },

    dealBreakers: {
      type: "array",
      items: {
        type: "string",
      },
    },

    clarificationAreas: {
      type: "array",
      items: {
        type: "string",
      },
    },

    hiddenEvaluationFactors: {
      type: "array",
      items: {
        type: "string",
      },
    },

    evaluationRisks: {
      type: "array",
      items: {
        type: "string",
      },
    },

    evaluationCriteria: {
      type: "array",
      items: {
        type: "object",

        properties: {
          criterion: {
            type: "string",
          },

          weight: {
            type: "number",
          },

          required: {
            type: "boolean",
          },

          category: {
            type: "string",
            enum: [
              "technical",
              "experience",
              "behavioral",
              "leadership",
              "domain",
            ],
          },

          evidenceExpected: {
            type: "string",
          },
        },

        required: [
          "criterion",
          "weight",
          "required",
          "category",
          "evidenceExpected",
        ],
      },
    },
  },

  required: [
    "roleSummary",
    "mustHave",
    "preferred",
    "dealBreakers",
    "clarificationAreas",
    "hiddenEvaluationFactors",
    "evaluationRisks",
    "evaluationCriteria",
  ],
} as const;