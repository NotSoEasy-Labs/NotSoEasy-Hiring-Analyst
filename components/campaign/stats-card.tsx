type StatsCardProps = {
  title: string;
  value: string | number;
};

export function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-semibold">
        {value}
      </h3>
    </div>
  );
}