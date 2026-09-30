import { FeatureIcon } from "./icons";
import type { Settings } from "@/lib/types";

export function WhyTheVite({ block }: { block: Settings["why"] }) {
  if (block.items.length === 0) return null;

  return (
    <section className="border-y border-line-soft bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12 lg:py-16">
        <h2 className="display-xl text-2xl text-fg sm:text-3xl">{block.title}</h2>

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item) => (
            <div key={item.id} className="min-w-0 border-t border-line-soft pt-6">
              <FeatureIcon name={item.icon} className="size-7 text-fg/90" />
              <h3 className="label-xs mt-5 text-fg">{item.title}</h3>
              <p className="mt-2.5 text-[0.8rem] leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
