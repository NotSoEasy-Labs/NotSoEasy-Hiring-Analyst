import { redirect } from "next/navigation";

import { auth } from "@/auth";

import {LoginButton} from "@/components/auth/login-button";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome
          </h1>

          <p className="mt-3 text-zinc-400">
            Continue with your Google account to
            access your recruiter workspace.
          </p>
        </div>

        <LoginButton />
      </div>
    </main>
  );
}