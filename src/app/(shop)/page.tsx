import Link from "next/link";
import { readStore } from "@/lib/db";
import { Hero } from "@/components/site/hero";
import { ArrowRightIcon } from "@/components/site/icons";
import { ProductCard } from "@/components/site/product-card";
import { ViteEdit } from "@/components/site/vite-edit";
import { DenimSection } from "@/components/site/denim-section";
import { TheLook } from "@/components/site/the-look";
import { WhyTheVite } from "@/components/site/why-the-vite";
import { StyleInspiration } from "@/components/site/style-inspiration";
import { InstagramSection } from "@/components/site/instagram-section";
import { BrandStory } from "@/components/site/brand-story";
import { Newsletter } from "@/components/site/newsletter";

export default async function HomePage() {
  const { settings, products } = await readStore();

  const newArrivals = products
    .filter((p) => p.active && p.featured)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);

  return (
    <>
      <Hero hero={settings.hero} />

      {/*
        Full-length shots are very tall (36:100), so the row is sized from the
        viewport height rather than its width: 332px covers the sticky header,
        the section padding and the card's name/price panel, and what is left
        is the image. That height then fixes the column width (2.775 = five
        columns of 36:100). The title sits
        above the row so all four columns get the full width — a side rail
        capped the cards well below the size these images deserve. The row is
        meant to run past the fold; it is a lookbook, not a fold-filler.
      */}
      <section className="px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="min-w-0">
            <p className="rule-before label-xs text-fg/70">
              <span className="h-px w-10 bg-fg/50" aria-hidden />
              The Vite
            </p>
            <h2 className="display-xl mt-4 text-[clamp(1.75rem,3.2vw,3.5rem)] leading-[0.95] text-fg">
              {settings.newArrivals.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              {settings.newArrivals.subtitle}
            </p>
          </div>

          <Link
            href={settings.newArrivals.href || "/shop"}
            className="label-xs group inline-flex w-fit items-center gap-4 border border-fg px-8 py-4 text-fg transition-colors duration-300 hover:bg-fg hover:text-ink"
          >
            View all
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {newArrivals.length === 0 ? (
          <p className="mt-10 text-sm text-muted">
            No products marked as new arrivals yet. Tick &ldquo;Show in New Arrivals&rdquo; on a
            product in the admin.
          </p>
        ) : (
          <div
            // The column count climbs first on small screens so the cards never
            // grow absurdly tall on a phone or tablet.
            className="mx-auto mt-7 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:w-[var(--row)] lg:grid-cols-5"
            style={
              {
                "--row": "min(calc(2.775 * (100svh - 332px) + 4rem), 100%, 2200px)",
              } as React.CSSProperties
            }
          >
            {newArrivals.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={settings.currency}
                priority={i < 4}
                tall
              />
            ))}
          </div>
        )}
      </section>

      <ViteEdit block={settings.edit} logo={settings.logo} brandName={settings.brandName} />
      <DenimSection block={settings.denim} />
      <TheLook block={settings.look} />
      <WhyTheVite block={settings.why} />
      <StyleInspiration block={settings.styleInspiration} />
      <InstagramSection block={settings.instagram} />
      <BrandStory block={settings.brandStory} />
      <Newsletter newsletter={settings.newsletter} />
    </>
  );
}
