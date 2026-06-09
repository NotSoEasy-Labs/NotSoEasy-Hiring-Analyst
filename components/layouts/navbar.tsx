import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-white"
        >
          NotSoEasy Hiring Analyst
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/campaign/new"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Create Campaign
          </Link>
        </nav>
      </div>
    </header>
  );
}