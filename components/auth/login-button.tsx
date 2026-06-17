import { signInWithGoogle } from "@/app/login/actions";

export function LoginButton() {
  return (
    <form action={signInWithGoogle}>
      <button
        type="submit"
        className="w-full rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
      >
        Continue with Google
      </button>
    </form>
  );
}