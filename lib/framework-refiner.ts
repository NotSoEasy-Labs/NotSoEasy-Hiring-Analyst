import { gemini } from "./gemini";
import { parseFramework } from "./framework-parser";

import { HiringFramework } from "@/types/framework";

export async function refineFramework(
  framework: HiringFramework,
  answers: Record<string, string>
): Promise<HiringFramework> {
  const prompt = `
You are a senior hiring strategist.

You are given:

1. Original Hiring Framework

${JSON.stringify(framework, null, 2)}

2. Recruiter Answers

${JSON.stringify(answers, null, 2)}

Your task:

Refine the hiring framework using the recruiter answers.

Rules:

- Increase priority of heavily weighted criteria.
- Reduce emphasis on de-prioritized criteria.
- Adjust must-have and preferred criteria.
- Adjust deal breakers when flexibility is indicated.
- Improve clarification areas.
- Preserve recruiter intent.
- Do not remove important requirements.

Return ONLY valid JSON.

Schema:

Schema:

{
  "roleSummary": "",
  "mustHave": [],
  "preferred": [],
  "dealBreakers": [],
  "clarificationAreas": [],
  "hiddenEvaluationFactors": [],
  "evaluationRisks": [],

  "evaluationCriteria": [
    {
      "criterion": "",
      "weight": 0,
      "required": true,
      "category": "",
      "evidenceExpected": ""
    }
  ]
}
`;

  const response =
    await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return parseFramework(
    response.text ?? ""
  );
}