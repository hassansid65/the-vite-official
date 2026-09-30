import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { PageHeader } from "@/components/site/page-header";
import { ProductCard } from "@/components/site/product-card";
import Link from "next/link";

export async function generateStaticParams() {
  const { categories } = await readStore();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { categories } = await readStore();
  const cat = categories.find((c) => c.slug === slug);
  return cat ? { title: cat.name, description: cat.description } : { title: "Not found" };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const { categories, products, settings } = await readStore();

  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const list = products.filter((p) => p.active && p.categoryId === cat.id);

  return (
    <>
      <PageHeader eyebrow="Collection" title={cat.name} description={cat.description} />

      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {list.length === 0 ? (
          <div className="py-20 text-center">
            <p className="display-xl text-3xl text-fg">Nothing in this collection yet</p>
            <Link
              href="/shop"
              className="label-xs mt-7 inline-block border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
            >
              Shop everything
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-7 text-xs text-dim">
              {list.length} {list.length === 1 ? "product" : "products"}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {list.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={settings.currency}
                  priority={i < 4}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
