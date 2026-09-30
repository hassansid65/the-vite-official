import { readStore } from "@/lib/db";
import { deleteCategoryAction } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";

export default async function AdminCollectionsPage() {
  const { categories, products } = await readStore();
  const cats = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display-xl text-3xl text-fg">Collections</h1>
        <p className="mt-2 text-sm text-muted">
          Collections drive the shop filters, the Collections page, and the top navigation.
        </p>
      </div>

      <section className="border border-line bg-surface">
        <header className="border-b border-line-soft px-5 py-4">
          <h2 className="label-xs text-fg">Add a collection</h2>
        </header>
        <div className="p-5">
          <CategoryForm category={null} />
        </div>
      </section>

      <div className="space-y-4">
        {cats.map((c) => {
          const count = products.filter((p) => p.categoryId === c.id).length;
          return (
            <details key={c.id} className="group border border-line bg-surface">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <div>
                  <span className="label-xs text-fg">{c.name}</span>
                  <span className="ml-3 text-xs text-dim">
                    /{c.slug} · {count} {count === 1 ? "product" : "products"}
                  </span>
                </div>
                <span className="label-xs text-dim group-open:hidden">Edit</span>
                <span className="label-xs hidden text-dim group-open:inline">Close</span>
              </summary>

              <div className="space-y-6 border-t border-line-soft p-5">
                <CategoryForm category={c} />

                <form
                  action={deleteCategoryAction}
                  className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-5"
                >
                  <input type="hidden" name="id" value={c.id} />
                  <p className="text-xs text-dim">
                    Deleting hides its {count} {count === 1 ? "product" : "products"} rather than
                    removing them.
                  </p>
                  <button
                    type="submit"
                    className="label-xs border border-sale/50 px-5 py-2.5 text-sale transition-colors hover:bg-sale hover:text-fg"
                  >
                    Delete collection
                  </button>
                </form>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
