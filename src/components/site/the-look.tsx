import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import type { Settings } from "@/lib/types";

export function TheLook({ block }: { block: Settings["look"] }) {
  const views = [
    { label: block.frontLabel, image: block.frontImage },
    { label: block.backLabel, image: block.backImage },
  ].filter((v) => v.image);

  return (
    <section className="border-y border-line-soft bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="display-xl text-[clamp(1.75rem,4vw,3rem)] text-fg">{block.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{block.text}</p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4">
          {views.map((view) => (
            <figure key={view.label} className="min-w-0">
              <div className="relative aspect-[2/3] overflow-hidden bg-surface-2">
                <Image
                  src={view.image}
                  alt={view.label}
                  fill
                  sizes="(min-width: 640px) 45vw, 46vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="label-xs mt-3 text-muted">{view.label}</figcaption>
            </figure>
          ))}
        </div>

        <Link
          href={block.ctaHref}
          className="label-xs group mt-9 inline-flex items-center gap-4 border border-fg px-8 py-4 text-fg transition-colors duration-300 hover:bg-fg hover:text-ink"
        >
          {block.ctaLabel}
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
