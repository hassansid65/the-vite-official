export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-line-soft bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {eyebrow && (
          <p className="rule-before label-xs text-fg/70">
            <span className="h-px w-10 bg-fg/50" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h1 className="display-xl mt-5 text-[clamp(2.25rem,6vw,4.5rem)] text-fg">{title}</h1>
        {description && (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
