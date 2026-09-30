import Link from "next/link";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/format";
import type { Category, Product, Settings } from "@/lib/types";

const SORTS = [
  { key: "new", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
] as const;

export type ListingParams = { category?: string; sort?: string; q?: string };

function sortProducts(list: Product[], sort: string): Product[] {
  const out = [...list];
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  else out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return out;
}

export function ProductListing({
  products,
  categories,
  settings,
  params,
  basePath,
}: {
  products: Product[];
  categories: Category[];
  settings: Settings;
  params: ListingParams;
  basePath: string;
}) {
  const categoryParam = params.category ?? "";
  const sort = params.sort ?? "new";
  const query = (params.q ?? "").trim().toLowerCase();

  // Only offer categories that actually have something in this set of products.
  const present = new Set(products.map((p) => p.categoryId));
  const cats = categories
    .filter((c) => present.has(c.id))
    .sort((a, b) => a.order - b.order);

  const activeCat = cats.find((c) => c.slug === categoryParam);

  let list = products;
  if (activeCat) list = list.filter((p) => p.categoryId === activeCat.id);
  if (query) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query),
    );
  }
  list = sortProducts(list, sort);

  const buildHref = (next: Partial<ListingParams>) => {
    const sp = new URLSearchParams();
    const merged = { category: categoryParam, sort, q: query, ...next };
    for (const [k, v] of Object.entries(merged)) {
      if (v && !(k === "sort" && v === "new")) sp.set(k, v);
    }
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-6 border-b border-line-soft pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={buildHref({ category: "" })}
            className={cn(
              "label-xs border px-4 py-2.5 transition-colors",
              !activeCat
                ? "border-fg bg-fg text-ink"
                : "border-line text-fg/70 hover:border-fg/60 hover:text-fg",
            )}
          >
            All
          </Link>
          {cats.map((c) => (
            <Link
              key={c.id}
              href={buildHref({ category: c.slug })}
              className={cn(
                "label-xs border px-4 py-2.5 transition-colors",
                activeCat?.id === c.id
                  ? "border-fg bg-fg text-ink"
                  : "border-line text-fg/70 hover:border-fg/60 hover:text-fg",
              )}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="label-xs text-dim">Sort</span>
          {SORTS.map((s) => (
            <Link
              key={s.key}
              href={buildHref({ sort: s.key })}
              className={cn(
                "text-xs transition-colors",
                sort === s.key
                  ? "text-fg underline underline-offset-4"
                  : "text-muted hover:text-fg",
              )}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-dim">
        {list.length} {list.length === 1 ? "product" : "products"}
        {query && <> matching &ldquo;{query}&rdquo;</>}
      </p>

      {list.length === 0 ? (
        <div className="py-24 text-center">
          <p className="display-xl text-3xl text-fg">Nothing here</p>
          <p className="mt-3 text-sm text-muted">
            Try a different category or clear your filters.
          </p>
          <Link
            href={basePath}
            className="label-xs mt-7 inline-block border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {list.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={settings.currency}
              priority={i < 4}
            />
          ))}
        </div>
      )}
    </div>
  );
}
