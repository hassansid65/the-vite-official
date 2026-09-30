import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { PageHeader } from "@/components/site/page-header";
import { ProductListing } from "@/components/site/product-listing";

export const metadata: Metadata = { title: "Men" };

export default async function MenPage({ searchParams }: PageProps<"/men">) {
  const { settings, products, categories } = await readStore();
  const params = await searchParams;
  const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

  // Unisex pieces belong in both departments.
  const list = products.filter(
    (p) => p.active && (p.department === "men" || p.department === "unisex"),
  );

  return (
    <>
      <PageHeader
        eyebrow="Shop men"
        title="Men"
        description="Everyday essentials, elevated."
      />
      <ProductListing
        products={list}
        categories={categories}
        settings={settings}
        basePath="/men"
        params={{ category: str(params.category), sort: str(params.sort), q: str(params.q) }}
      />
    </>
  );
}
