import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import type { Settings } from "@/lib/types";

export function ViteEdit({
  block,
  logo,
  brandName,
}: {
  block: Settings["edit"];
  logo: string;
  brandName: string;
}) {
  return (
    <section className="border-y border-line-soft bg-surface">
      <div className="mx-auto grid max-w-[1600px] items-stretch gap-0 lg:grid-cols-2">
        {/* Brand panel: the patch sits on its own, lit by a soft radial glow. */}
        <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-ink px-8 py-16 lg:min-h-[560px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10), transparent 62%)",
            }}
          />
          <Image
            src={logo}
            alt={brandName}
            width={512}
            height={512}
            sizes="(min-width: 1024px) 40vw, 70vw"
            className="relative w-[min(78%,26rem)]"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <p className="rule-before label-xs text-fg/70">
            <span className="h-px w-10 bg-fg/50" aria-hidden />
            {block.eyebrow}
          </p>

          <h2 className="display-xl mt-6 text-[clamp(1.75rem,3.6vw,3rem)] leading-[0.96] text-fg">
            <span className="block">{block.titleLine1}</span>
            <span className="block">{block.titleLine2}</span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{block.text}</p>

          <Link
            href={block.ctaHref}
            className="label-xs group mt-9 inline-flex w-fit items-center gap-4 border border-fg px-8 py-4 text-fg transition-colors duration-300 hover:bg-fg hover:text-ink"
          >
            {block.ctaLabel}
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
