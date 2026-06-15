import { gemini } from "./gemini";
import { parseClarifications } from "./clarification-parser";

export async function generateClarifications(
  framework: string
) {
  const prompt = `
You are a hiring consultant.

Given a hiring framework:

${framework}

Generate between 1 and 5 clarification questions.

Only ask questions that improve candidate evaluation quality.

Question Types:

priority
flexibility
weighting
dealbreaker

Examples:

Would exceptional ICU experience compensate for fewer years of experience?

Which should be weighted more heavily?

Research Experience
Leadership Experience

Should missing ACLS certification result in automatic rejection?

Return JSON only.

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

  const response =
    await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(
  "RAW CLARIFICATION RESPONSE:"
);

console.log(response.text);

  return parseClarifications(
    response.text ?? ""
  );
}