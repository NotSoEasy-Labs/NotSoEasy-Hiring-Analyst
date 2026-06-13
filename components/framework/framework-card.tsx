type FrameworkCardProps = {
  title: string;
  items: string[];
};

export function FrameworkCard({
  title,
  items,
}: FrameworkCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
      <h3 className="mb-4 text-lg font-semibold">
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-zinc-300"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}