type Props = {
  message: string;
};

export function ErrorState({
  message,
}: Props) {
  return (
    <div className="rounded-2xl border border-red-900 bg-red-950/20 p-8">
      <h2 className="text-lg font-semibold text-red-400">
        Framework Generation Failed
      </h2>

      <p className="mt-3 text-zinc-300">
        {message}
      </p>
    </div>
  );
}