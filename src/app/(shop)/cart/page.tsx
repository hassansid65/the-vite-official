import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { CartView } from "@/components/cart/cart-view";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = { title: "Your bag" };

export default async function CartPage() {
  const { settings } = await readStore();
  return (
    <>
      <PageHeader eyebrow="Checkout" title="Your bag" />
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <CartView
          currency={settings.currency}
          freeShippingThreshold={settings.freeShippingThreshold}
        />
      </div>
    </>
  );
}
