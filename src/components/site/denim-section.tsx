import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import type { Settings } from "@/lib/types";

export function DenimSection({ block }: { block: Settings["denim"] }) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="max-w-2xl">
        <h2 className="display-xl text-[clamp(1.75rem,4vw,3rem)] text-fg">{block.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">{block.subtitle}</p>
      </div>

      {block.fits.length > 0 && (
        <div className="mt-9 flex flex-wrap gap-2.5">
          {block.fits.map((fit) => (
            <Link
              key={`${fit.label}-${fit.href}`}
              href={fit.href}
              className="label-xs border border-line px-5 py-3.5 text-fg/75 transition-colors hover:border-fg hover:bg-fg hover:text-ink"
            >
              {fit.label}
            </Link>
          ))}
        </div>
      )}

      <Link
        href={block.ctaHref}
        className="label-xs group mt-9 inline-flex items-center gap-4 border border-fg px-8 py-4 text-fg transition-colors duration-300 hover:bg-fg hover:text-ink"
      >
        {block.ctaLabel}
        <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  );
}
