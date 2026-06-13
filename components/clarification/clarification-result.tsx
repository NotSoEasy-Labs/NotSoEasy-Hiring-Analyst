import { HiringFramework } from "@/types/framework";
import { FrameworkCard } from "@/components/framework/framework-card";

type Props = {
  framework: HiringFramework;
};

export function ClarificationResult({
  framework,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 p-6">
        <h2 className="mb-3 text-xl font-semibold">
          Refined Role Summary
        </h2>

        <p>
          {framework.roleSummary}
        </p>
      </div>

      <FrameworkCard
        title="Must Have"
        items={framework.mustHave}
      />

      <FrameworkCard
        title="Preferred"
        items={framework.preferred}
      />

      <FrameworkCard
        title="Deal Breakers"
        items={framework.dealBreakers}
      />

      <FrameworkCard
        title="Clarification Areas"
        items={
          framework.clarificationAreas
        }
      />

      <FrameworkCard
        title="Hidden Evaluation Factors"
        items={
          framework.hiddenEvaluationFactors
        }
      />

      <FrameworkCard
        title="Evaluation Risks"
        items={
          framework.evaluationRisks
        }
      />
    </div>
  );
}