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

      {framework.evaluationCriteria &&
        framework.evaluationCriteria.length > 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Evaluation Criteria
            </h2>

            <div className="space-y-4">
              {framework.evaluationCriteria.map(
                (criterion) => (
                  <div
                    key={
                      criterion.criterion
                    }
                    className="rounded-lg border border-zinc-800 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        {
                          criterion.criterion
                        }
                      </h3>

                      <span className="rounded bg-zinc-800 px-2 py-1 text-sm">
                        {
                          criterion.weight
                        }
                        %
                      </span>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <span className="rounded bg-blue-900/40 px-2 py-1 text-xs">
                        {
                          criterion.category
                        }
                      </span>

                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          criterion.required
                            ? "bg-green-900/40"
                            : "bg-yellow-900/40"
                        }`}
                      >
                        {criterion.required
                          ? "Required"
                          : "Optional"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-zinc-400">
                      {
                        criterion.evidenceExpected
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
}