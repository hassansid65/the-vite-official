import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { PageHeader } from "@/components/site/page-header";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  const { settings } = await readStore();
  return (
    <>
      <PageHeader eyebrow="Saved" title="Wishlist" />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <WishlistView currency={settings.currency} />
      </div>
    </>
  );
}
