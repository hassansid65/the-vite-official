import Image from "next/image";
import Link from "next/link";
import { readStore } from "@/lib/db";
import { money } from "@/lib/format";
import { toggleProductFieldAction, duplicateProductAction } from "@/app/admin/actions";

export default async function AdminProductsPage({ searchParams }: PageProps<"/admin/products">) {
  const params = await searchParams;
  const { products, categories, settings } = await readStore();

  const catFilter = typeof params.category === "string" ? params.category : "";
  const catById = new Map(categories.map((c) => [c.id, c]));

  const list = catFilter ? products.filter((p) => p.categoryId === catFilter) : products;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-xl text-3xl text-fg">Products</h1>
          <p className="mt-2 text-sm text-muted">
            {products.length} in the catalogue, {products.filter((p) => p.active).length} live.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="label-xs bg-fg px-6 py-3 text-ink transition-opacity hover:opacity-85"
        >
          New product
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/products"
          className={`label-xs border px-4 py-2.5 transition-colors ${
            !catFilter ? "border-fg bg-fg text-ink" : "border-line text-muted hover:text-fg"
          }`}
        >
          All
        </Link>
        {[...categories]
          .sort((a, b) => a.order - b.order)
          .map((c) => (
            <Link
              key={c.id}
              href={`/admin/products?category=${c.id}`}
              className={`label-xs border px-4 py-2.5 transition-colors ${
                catFilter === c.id
                  ? "border-fg bg-fg text-ink"
                  : "border-line text-muted hover:text-fg"
              }`}
            >
              {c.name}
            </Link>
          ))}
      </div>

      <div className="border border-line bg-surface">
        <ul className="divide-y divide-line-soft">
          {list.length === 0 && (
            <li className="px-5 py-12 text-center text-sm text-muted">
              No products here yet.
            </li>
          )}

          {list.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="relative size-14 shrink-0 overflow-hidden bg-surface-2">
                <Image
                  src={p.images[0] ?? "/images/products/utility-tee.jpg"}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="min-w-[10rem] flex-1">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="text-sm text-fg transition-opacity hover:opacity-70"
                >
                  {p.name}
                </Link>
                <p className="mt-1 text-xs text-dim">
                  {catById.get(p.categoryId)?.name ?? "No collection"} ·{" "}
                  {money(p.price, settings.currency)} ·{" "}
                  {p.stock > 0 ? `${p.stock} in stock` : "sold out"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <form action={toggleProductFieldAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="field" value="active" />
                  <button
                    type="submit"
                    className={`label-xs border px-3.5 py-2 transition-colors ${
                      p.active
                        ? "border-fg/40 text-fg hover:border-fg"
                        : "border-line text-dim hover:text-muted"
                    }`}
                  >
                    {p.active ? "Live" : "Hidden"}
                  </button>
                </form>

                <form action={toggleProductFieldAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="field" value="featured" />
                  <button
                    type="submit"
                    className={`label-xs border px-3.5 py-2 transition-colors ${
                      p.featured
                        ? "border-fg/40 text-fg hover:border-fg"
                        : "border-line text-dim hover:text-muted"
                    }`}
                  >
                    {p.featured ? "Featured" : "Not featured"}
                  </button>
                </form>

                <form action={duplicateProductAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="label-xs border border-line px-3.5 py-2 text-dim transition-colors hover:text-fg"
                  >
                    Duplicate
                  </button>
                </form>

                <Link
                  href={`/admin/products/${p.id}`}
                  className="label-xs border border-line px-3.5 py-2 text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
