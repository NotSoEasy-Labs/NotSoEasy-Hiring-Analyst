type Props = {
  current: number;
  total: number;
};

export function ProgressIndicator({
  current,
  total,
}: Props) {
  const percentage = Math.round(
    (current / total) * 100
  );

  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between">
        <span className="text-sm text-zinc-400">
          Question {current} of {total}
        </span>

        <span className="text-sm text-zinc-400">
          {percentage}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-zinc-800">
        <div
          className="h-2 rounded-full bg-white"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}