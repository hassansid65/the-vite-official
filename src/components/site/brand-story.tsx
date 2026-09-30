import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import type { Settings } from "@/lib/types";

export function BrandStory({ block }: { block: Settings["brandStory"] }) {
  const paragraphs = block.body.split("\n").map((p) => p.trim()).filter(Boolean);

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {block.image && (
        <>
          <Image
            src={block.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_35%] opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        </>
      )}

      <div className="relative mx-auto max-w-[1600px] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-xl">
          <h2 className="display-xl text-[clamp(1.875rem,4.4vw,3.25rem)] leading-[0.96] text-fg">
            <span className="block">{block.titleLine1}</span>
            <span className="block">{block.titleLine2}</span>
          </h2>

          <div className="mt-7 space-y-4">
            {paragraphs.map((p) => (
              <p key={p} className="text-sm leading-relaxed text-muted">
                {p}
              </p>
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
      </div>
    </section>
  );
}
