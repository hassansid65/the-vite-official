import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, InstagramIcon } from "./icons";
import type { Settings } from "@/lib/types";

export function InstagramSection({ block }: { block: Settings["instagram"] }) {
  if (block.tiles.length === 0) return null;

  return (
    <section className="border-y border-line-soft bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <h2 className="display-xl text-2xl text-fg sm:text-3xl">{block.title}</h2>
            <p className="mt-2.5 max-w-xl text-sm text-muted">{block.subtitle}</p>
            <Link
              href={block.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-xs mt-4 inline-flex items-center gap-2.5 text-fg transition-opacity hover:opacity-70"
            >
              <InstagramIcon className="size-4" />
              {block.handle}
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {block.tiles.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href || block.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-surface-2"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 46vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 text-fg opacity-0 transition-all duration-300 group-hover:bg-ink/45 group-hover:opacity-100">
                <InstagramIcon className="size-6" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href={block.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-xs group mt-9 inline-flex items-center gap-4 border border-fg px-8 py-4 text-fg transition-colors duration-300 hover:bg-fg hover:text-ink"
        >
          {block.ctaLabel}
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
