import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import type { Settings } from "@/lib/types";

export function Hero({ hero }: { hero: Settings["hero"] }) {
  return (
    <section className="relative isolate -mt-16 min-h-[88svh] w-full overflow-hidden bg-ink lg:-mt-[72px] lg:min-h-[92svh]">
      {/*
        A <picture> rather than two <Image fill> elements: a hidden next/image is
        still fetched, so the two-element version downloaded both hero files on
        every visit. Here the browser picks exactly one source.
      */}
      <picture>
        <source media="(min-width: 640px)" srcSet={hero.image} />
        <img
          src={hero.mobileImage || hero.image}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-[60%_center] sm:object-[70%_top]"
        />
      </picture>

      {/* Scrims: darken the type side on desktop, the whole frame on mobile. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-transparent sm:from-ink/95 sm:via-ink/55 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="relative mx-auto flex min-h-[88svh] max-w-[1600px] flex-col justify-center px-6 py-24 sm:px-8 lg:min-h-[92svh] lg:px-12">
        <div className="max-w-4xl">
          <p className="rule-before label-xs text-fg/75">
            <span className="h-px w-12 bg-fg/60" aria-hidden />
            {hero.eyebrow}
          </p>

          <h1 className="display-xl mt-6 text-[clamp(2rem,6vw,6rem)] leading-[0.95] text-fg">
            <span className="block">{hero.titleLine1}</span>
            <span className="block">{hero.titleLine2}</span>
          </h1>

          {hero.subtitle && (
            <p className="mt-7 max-w-md text-[0.8125rem] leading-relaxed text-fg/75 sm:text-base">
              {hero.subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            {hero.ctaLabel && (
              <Link
                href={hero.ctaHref || "/shop"}
                className="label-xs group inline-flex items-center gap-4 bg-fg px-8 py-4 text-ink transition-opacity duration-300 hover:opacity-85"
              >
                {hero.ctaLabel}
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}

            {hero.secondaryCtaLabel && (
              <Link
                href={hero.secondaryCtaHref || "/shop"}
                className="label-xs inline-flex items-center border border-fg/60 px-8 py-4 text-fg transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-ink"
              >
                {hero.secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
