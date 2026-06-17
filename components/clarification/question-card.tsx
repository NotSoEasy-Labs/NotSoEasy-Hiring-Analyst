"use client";

import { ClarificationQuestion } from "@/types/clarification";

type Props = {
  question: ClarificationQuestion;
  selectedAnswer: string;
  onSelect: (answer: string) => void;
};

export function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: Props) {
  const options = question.options ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        {question.question}
      </h2>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`w-full rounded-lg border p-4 text-left transition ${
              selectedAnswer === option
                ? "border-white bg-zinc-800"
                : "border-zinc-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}