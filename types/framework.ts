import {
  ClarificationQuestion,
  RecruiterAnswer,
} from "./clarification";

export interface EvaluationCriterion {
  criterion: string;

  weight: number;

  required: boolean;

  category:
    | "technical"
    | "experience"
    | "behavioral"
    | "leadership"
    | "domain";

  evidenceExpected: string;
}

export interface HiringFramework {
  roleSummary: string;

  mustHave: string[];

  preferred: string[];

  dealBreakers: string[];

  clarificationAreas: string[];

  hiddenEvaluationFactors: string[];

  evaluationRisks: string[];

  evaluationCriteria: EvaluationCriterion[];  

  clarificationQuestions?: ClarificationQuestion[];

  recruiterAnswers?: RecruiterAnswer[];

  refinedFramework?: Partial<HiringFramework>;
}