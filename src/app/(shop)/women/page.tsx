import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { PageHeader } from "@/components/site/page-header";
import { ProductListing } from "@/components/site/product-listing";

export const metadata: Metadata = { title: "Women" };

export default async function WomenPage({ searchParams }: PageProps<"/women">) {
  const { settings, products, categories } = await readStore();
  const params = await searchParams;
  const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");

  const list = products.filter(
    (p) => p.active && (p.department === "women" || p.department === "unisex"),
  );

  return (
    <>
      <PageHeader
        eyebrow="Shop women"
        title="Women"
        description="Contemporary styles for every mood."
      />
      <ProductListing
        products={list}
        categories={categories}
        settings={settings}
        basePath="/women"
        params={{ category: str(params.category), sort: str(params.sort), q: str(params.q) }}
      />
    </>
  );
}
