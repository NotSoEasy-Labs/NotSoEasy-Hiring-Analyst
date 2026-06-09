import {
  FileText,
  Users,
  BarChart3,
  Briefcase,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Structured Hiring Frameworks",
    description:
      "Turn job descriptions into clear evaluation criteria.",
  },
  {
    icon: Users,
    title: "Candidate Evaluation",
    description:
      "Compare applicants consistently and fairly.",
  },
  {
    icon: FileText,
    title: "Resume Organization",
    description:
      "Keep all candidate information in one place.",
  },
  {
    icon: BarChart3,
    title: "Ranking Dashboard",
    description:
      "Visualize and compare candidate performance.",
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-3xl font-semibold">
        Features
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700"
            >
              <Icon
                size={20}
                className="mb-4 text-zinc-400"
              />

              <h3 className="mb-2 text-lg font-medium">
                {feature.title}
              </h3>

              <p className="text-zinc-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}