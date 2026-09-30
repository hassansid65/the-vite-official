import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = { title: "Collections" };

export default async function CollectionsPage() {
  const { categories, products } = await readStore();
  const cats = [...categories].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="Browse"
        title="Collections"
        description="Every category in the line, from outerwear down to denim."
      />

      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {cats.map((cat) => {
            const count = products.filter((p) => p.active && p.categoryId === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/collections/${cat.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-surface-2"
              >
                <Image
                  src={cat.image || "/images/products/utility-tee.jpg"}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="display-xl text-2xl text-fg sm:text-3xl">{cat.name}</h2>
                  <p className="mt-1.5 text-xs text-muted">
                    {count} {count === 1 ? "piece" : "pieces"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
