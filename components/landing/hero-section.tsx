import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-24 pb-20">
      <div className="max-w-4xl">
        <div className="mb-6 inline-flex rounded-full border border-zinc-800 px-3 py-1 text-sm text-zinc-400">
          NotSoEasy Labs
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          NotSoEasy Hiring Analyst
        </h1>

        <p className="mt-6 text-2xl text-zinc-300">
          Hiring isn't easy.
          <br />
          Choosing candidates shouldn't be.
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Transform job descriptions into structured evaluation
          frameworks and identify the strongest candidates
          with AI-powered hiring intelligence.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/campaign/new"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            Create Campaign
            <ArrowRight size={16} />
          </Link>

          <button className="rounded-lg border border-zinc-800 px-5 py-3 text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}