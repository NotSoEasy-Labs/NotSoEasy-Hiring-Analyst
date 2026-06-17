import { generateStructuredOutput } from "./ai/structured-output";
import { frameworkSchema } from "./ai/schemas/framework.schema";
import { HiringFramework } from "@/types/framework";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateFramework(
  jobDescription: string,
  recruiterNotes: string
): Promise<HiringFramework> {
  const prompt = `
You are an elite hiring strategist and talent assessment expert.

Your job is NOT to summarize a Job Description.

Your job is to infer hiring intent.

Analyze:

1. Explicit requirements
2. Recruiter preferences
3. Missing information
4. Contradictions
5. Tradeoffs
6. Hidden success factors
7. Candidate evaluation risks

Think like a recruiter preparing to evaluate candidates.

Identify:

- What is truly mandatory
- What appears flexible
- What may be negotiable
- What should be clarified before hiring begins
- What qualities predict success in this role
- What qualities are difficult to evaluate from a resume alone
Generate evaluationCriteria.

Requirements:

- Create a candidate scoring rubric.
- Total weights should equal 100.
- Higher priority criteria should receive larger weights.
- Required criteria must be marked required=true.
- Use categories:

technical
experience
behavioral
leadership
domain

Each criterion must include:

criterion
weight
required
category
evidenceExpected

The scoring rubric must work for candidate evaluation later.

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

Job Description:
${jobDescription}

Recruiter Notes:
${recruiterNotes}

Guidelines:

Must Have:
- Include only genuinely mandatory requirements.

Preferred:
- Include valuable strengths that are not strict requirements.

Deal Breakers:
- Include realistic disqualifiers.
- Do NOT simply repeat must-have requirements.

Clarification Areas:
- Identify ambiguities.
- Identify tradeoffs.
- Identify missing prioritization.
- Identify conflicting signals.

Hidden Evaluation Factors:
- Infer qualities required for success but not explicitly stated.

Examples:
- Ownership
- Mentorship
- Clinical judgment
- Strategic thinking
- Decision making
- Stakeholder management

Evaluation Risks:
- Explain what cannot be reliably evaluated from resumes alone.
- Highlight areas requiring interviews, assessments, references, or manual review.

Avoid copying the JD verbatim.

Infer recruiter intent whenever reasonable.

Work across all professions and industries.

Return JSON only.
`;

  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Framework generation attempt ${attempt}/3`);

      const framework =
        await generateStructuredOutput<HiringFramework>({
          prompt,
          schema: frameworkSchema,
        });

      console.log("STRUCTURED FRAMEWORK:");
      console.dir(framework, { depth: null });

      return framework;
    } catch (error: any) {
      lastError = error;

      console.error(
        `Framework generation failed (attempt ${attempt})`,
        error
      );

      const status =
        error?.status ||
        error?.error?.code ||
        error?.response?.status;

      const isRetryable =
        status === 503 ||
        status === 429 ||
        status === 500;

      if (isRetryable && attempt < 3) {
        console.log("Retrying in 2 seconds...");
        await sleep(2000);
        continue;
      }

      break;
    }
  }

  const status =
    (lastError as any)?.status ||
    (lastError as any)?.error?.code;

  if (status === 503) {
    throw new Error(
      "AI service is currently experiencing high demand. Please try again in a few moments."
    );
  }

  if (status === 429) {
    throw new Error(
      "Too many requests. Please wait a moment and try again."
    );
  }

  throw new Error(
    "Unable to generate framework. Please try again."
  );
}