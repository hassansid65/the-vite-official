import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export function SectionHeading({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        <h2 className="display-xl text-2xl text-fg sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2.5 max-w-xl text-sm text-muted">{subtitle}</p>}
      </div>

      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="label-xs group flex shrink-0 items-center gap-3 text-fg/70 transition-colors hover:text-fg"
        >
          {ctaLabel}
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
