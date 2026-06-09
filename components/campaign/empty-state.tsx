type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center">
      <h3 className="text-xl font-medium">
        {title}
      </h3>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>
    </div>
  );
}