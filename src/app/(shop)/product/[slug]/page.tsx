import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { ProductPurchase } from "@/components/cart/product-purchase";
import { ProductCard } from "@/components/site/product-card";
import { money } from "@/lib/format";

export async function generateStaticParams() {
  const { products } = await readStore();
  return products.filter((p) => p.active).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await readStore();
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const { products, categories, settings } = await readStore();

  const product = products.find((p) => p.slug === slug && p.active);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.categoryId);
  const related = products
    .filter((p) => p.active && p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const onSale = product.compareAtPrice !== null && product.compareAtPrice > product.price;

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-dim">
            <li>
              <Link href="/" className="transition-colors hover:text-fg">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/shop" className="transition-colors hover:text-fg">
                Shop
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href={`/collections/${category.slug}`}
                    className="transition-colors hover:text-fg"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden>/</li>
            <li className="text-muted">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
              <Image
                src={product.images[0] ?? "/images/products/utility-tee.jpg"}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="label-xs absolute left-4 top-4 bg-ink/85 px-3 py-2 text-[10px] text-fg backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((src) => (
                  <div key={src} className="relative aspect-[3/4] overflow-hidden bg-surface-2">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="lg:pt-4">
            {category && (
              <Link
                href={`/collections/${category.slug}`}
                className="label-xs text-dim transition-colors hover:text-fg"
              >
                {category.name}
              </Link>
            )}

            <h1 className="display-xl mt-4 text-[clamp(2rem,4.5vw,3.5rem)] text-fg">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl tabular-nums text-fg">
                {money(product.price, settings.currency)}
              </span>
              {onSale && (
                <>
                  <span className="text-base tabular-nums text-dim line-through">
                    {money(product.compareAtPrice as number, settings.currency)}
                  </span>
                  <span className="label-xs bg-sale px-2 py-1 text-[10px] text-fg">Sale</span>
                </>
              )}
            </div>

            <p className="mt-7 max-w-lg text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            <ProductPurchase product={product} />

            <dl className="mt-10 space-y-3 border-t border-line-soft pt-7 text-xs">
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-dim">Free shipping</dt>
                <dd className="text-muted">
                  On orders over {money(settings.freeShippingThreshold, settings.currency)}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-dim">Returns</dt>
                <dd className="text-muted">14 days, unworn with tags attached</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 shrink-0 text-dim">In stock</dt>
                <dd className="text-muted">
                  {product.stock > 0 ? `${product.stock} available` : "Currently sold out"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line-soft">
          <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
            <h2 className="display-xl text-2xl text-fg sm:text-3xl">You may also like</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} currency={settings.currency} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
