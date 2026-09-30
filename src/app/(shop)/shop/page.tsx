import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { PageHeader } from "@/components/site/page-header";
import { ProductListing } from "@/components/site/product-listing";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const { settings, products, categories } = await readStore();
  const params = await searchParams;

  const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  const active = products.filter((p) => p.active);
  const cat = categories.find((c) => c.slug === str(params.category));

  return (
    <>
      <PageHeader
        eyebrow="All products"
        title={cat ? cat.name : "Shop"}
        description={
          cat ? cat.description : "Every piece in the collection, in one place."
        }
      />
      <ProductListing
        products={active}
        categories={categories}
        settings={settings}
        basePath="/shop"
        params={{ category: str(params.category), sort: str(params.sort), q: str(params.q) }}
      />
    </>
  );
}
