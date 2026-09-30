import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./section-heading";
import type { Settings } from "@/lib/types";

export function StyleInspiration({ block }: { block: Settings["styleInspiration"] }) {
  if (block.tiles.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
      <SectionHeading
        title={block.title}
        subtitle={block.subtitle}
        ctaLabel={block.ctaLabel}
        ctaHref={block.ctaHref}
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {block.tiles.map((tile) => (
          <Link
            key={tile.id}
            href={tile.href}
            className="group relative aspect-[2/3] overflow-hidden bg-surface-2"
          >
            <Image
              src={tile.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 24vw, 46vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
            <span className="label-xs absolute inset-x-0 bottom-0 p-4 text-fg sm:p-5">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
