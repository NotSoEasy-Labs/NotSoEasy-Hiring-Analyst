import { generateStructuredOutput } from "./ai/structured-output";
import { frameworkSchema } from "./ai/schemas/framework.schema";

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

- Update evaluationCriteria using recruiter answers.
- Increase weights for heavily prioritized criteria.
- Decrease weights for de-prioritized criteria.
- The sum of all evaluationCriteria.weight values MUST equal exactly 100.
- Verify the total before returning the JSON.
- Do not invent new categories.
- Do not change a preferred criterion into a required criterion unless the recruiter explicitly indicates it.
- Preserve required=true for truly mandatory criteria.

Return ONLY valid JSON.

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

  return generateStructuredOutput<HiringFramework>({
    prompt,
    schema: frameworkSchema,
  });
}