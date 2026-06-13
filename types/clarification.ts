export interface ClarificationQuestion {
  id: string;
  question: string;
  type:
    | "priority"
    | "flexibility"
    | "weighting"
    | "dealbreaker";

  options: string[];
}

export interface RecruiterAnswer {
  questionId: string;
  answer: string;
}