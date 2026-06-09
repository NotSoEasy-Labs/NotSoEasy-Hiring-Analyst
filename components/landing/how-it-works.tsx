const steps = [
  "Create Hiring Campaign",
  "Upload Resumes",
  "Evaluate Candidates",
  "Review Rankings",
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-3xl font-semibold">
        How It Works
      </h2>

      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <div className="mb-4 text-sm text-zinc-500">
              Step {index + 1}
            </div>

            <h3 className="font-medium">
              {step}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}