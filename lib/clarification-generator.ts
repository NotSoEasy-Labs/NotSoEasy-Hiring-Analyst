import { generateStructuredOutput } from "./ai/structured-output";
import { clarificationSchema } from "./ai/schemas/clarification.schema";
import { ClarificationQuestion } from "@/types/clarification";

interface ClarificationResponse {
  questions: ClarificationQuestion[];
}

export async function generateClarifications(
  framework: string
): Promise<ClarificationQuestion[]> {
  const prompt = `
You are a senior hiring consultant.

Given this hiring framework:

${framework}

Your goal is to improve recruiter decision quality.

Generate between 1 and 5 clarification questions.

Only ask questions that would materially improve candidate evaluation.

Question types:

priority
flexibility
weighting
dealbreaker

Each question MUST include EXACTLY 3 answer options.

Use these patterns:

priority
["Low","Medium","High"]

flexibility
["Strict","Somewhat Flexible","Flexible"]

dealbreaker
["Yes","No","Depends"]

weighting
[
"First criterion",
"Equal priority",
"Second criterion"
]

Guidelines:

- Questions must remove ambiguity.
- Questions must improve future resume evaluation.
- Avoid asking obvious questions.
- Avoid repeating information already present.
- Never leave options empty.
- Every question must have a unique id.
- Return between 1 and 5 questions only.

Return ONLY valid JSON.

Schema:

{
  "questions": [
    {
      "id": "",
      "question": "",
      "type": "",
      "options": []
    }
  ]
}
`;

  const result =
    await generateStructuredOutput<ClarificationResponse>({
      prompt,
      schema: clarificationSchema,
    });

  return result.questions;
}