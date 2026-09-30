import Link from "next/link";
import { notFound } from "next/navigation";
import { readStore } from "@/lib/db";
import { deleteProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";

export default async function AdminProductEditPage({
  params,
  searchParams,
}: PageProps<"/admin/products/[id]">) {
  const { id } = await params;
  const sp = await searchParams;
  const { products, categories, settings } = await readStore();

  const isNew = id === "new";
  const product = isNew ? null : products.find((p) => p.id === id) ?? null;
  if (!isNew && !product) notFound();

  const cats = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/admin/products"
            className="label-xs text-dim transition-colors hover:text-fg"
          >
            ← All products
          </Link>
          <h1 className="display-xl mt-3 text-3xl text-fg">
            {isNew ? "New product" : product!.name}
          </h1>
        </div>

        {product && (
          <form action={deleteProductAction}>
            <input type="hidden" name="id" value={product.id} />
            <button
              type="submit"
              className="label-xs border border-sale/50 px-5 py-3 text-sale transition-colors hover:bg-sale hover:text-fg"
            >
              Delete
            </button>
          </form>
        )}
      </div>

      {sp.created === "1" && (
        <p className="border border-line bg-surface px-5 py-4 text-xs text-fg/80">
          Product created. It is on the storefront as soon as it is set to live.
        </p>
      )}

      {cats.length === 0 ? (
        <p className="border border-line bg-surface px-5 py-6 text-sm text-muted">
          Create a collection first — every product has to belong to one.{" "}
          <Link href="/admin/collections" className="text-fg underline underline-offset-4">
            Go to collections
          </Link>
        </p>
      ) : (
        <ProductForm product={product} categories={cats} currency={settings.currency} />
      )}
    </div>
  );
}
