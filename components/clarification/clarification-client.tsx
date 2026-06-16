"use client";

import {
  useEffect,
  useState,
} from "react";

import { QuestionCard } from "./question-card";
import { ProgressIndicator } from "./progress-indicator";
import { ClarificationResult } from "./clarification-result";

import { ClarificationQuestion } from "@/types/clarification";
import { HiringFramework } from "@/types/framework";

import { generateClarificationsForCampaignAction } from "@/app/actions/generate-clarifications-for-campaign";
import { refineFrameworkForCampaignAction } from "@/app/actions/refine-framework-for-campaign";

type Props = {
  campaignId: string;
};

export function ClarificationClient({
  campaignId,
}: Props) {
  const [loading, setLoading] =
    useState(true);

  const [questions, setQuestions] =
    useState<ClarificationQuestion[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<string, string>>(
      {}
    );

  const [refinedFramework, setRefinedFramework] =
    useState<HiringFramework | null>(
      null
    );

  useEffect(() => {
    async function loadClarifications() {
      try {
        // Load campaign
        const response =
          await fetch(
            `/api/campaigns/${campaignId}`
          );

        const data =
          await response.json();

        if (!data.success) {
          throw new Error(
            data.error
          );
        }

        const campaign =
          data.campaign;

        // Already refined
        if (
          campaign.refinedFramework
        ) {
          console.log(
            "✅ Returning refined framework from Mongo"
          );

          setRefinedFramework(
            campaign.refinedFramework
          );

          setLoading(false);

          return;
        }

        // Already answered
        if (
          campaign.clarificationAnswers
        ) {
          setAnswers(
            campaign.clarificationAnswers
          );
        }

        const result =
          await generateClarificationsForCampaignAction(
            campaignId
          );

        if (!result.success) {
          throw new Error(
            result.error
          );
        }

        setQuestions(
          result.questions
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadClarifications();
  }, [campaignId]);

  function handleSelect(
    answer: string
  ) {
    const question =
      questions[currentIndex];

    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));
  }

  async function submitAnswers() {
    try {
      const result =
        await refineFrameworkForCampaignAction(
          campaignId,
          answers
        );

      if (!result.success) {
        throw new Error(
          result.error
        );
      }

      setRefinedFramework(
        result.framework
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to refine framework."
      );
    }
  }

  async function nextQuestion() {
    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (prev) => prev + 1);

      return;
    }

    await submitAnswers();
  }

  if (refinedFramework) {
    return (
<ClarificationResult
  campaignId={campaignId}
  framework={refinedFramework}
/>
    );
  }

  if (loading) {
    return (
      <div className="text-center">
        Generating Questions...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center">
        No clarification questions generated.
      </div>
    );
  }

  const currentQuestion =
    questions[currentIndex];

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressIndicator
        current={currentIndex + 1}
        total={questions.length}
      />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={
          answers[
            currentQuestion.id
          ] ?? ""
        }
        onSelect={handleSelect}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={nextQuestion}
          className="rounded-lg bg-white px-4 py-2 text-black"
        >
          {currentIndex ===
          questions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}