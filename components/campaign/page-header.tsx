type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>
    </div>
  );
}