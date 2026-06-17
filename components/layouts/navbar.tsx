import Link from "next/link";

import { auth } from "@/auth";

import { LogoutButton } from "@/components/auth/logout-button";

export async function Navbar() {
  const session = await auth();

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
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/campaign/new"
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                New Campaign
              </Link>

              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "Profile"}
                  className="h-9 w-9 rounded-full border border-zinc-700"
                />
              )}

              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Continue with Google
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}