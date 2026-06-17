export const clarificationSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          question: {
            type: "string",
          },
          type: {
            type: "string",
            enum: [
              "priority",
              "flexibility",
              "weighting",
              "dealbreaker",
            ],
          },
          options: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: [
          "id",
          "question",
          "type",
          "options",
        ],
      },
    },
  },
  required: ["questions"],
} as const;