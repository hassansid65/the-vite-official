import { readStore } from "@/lib/db";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistProvider } from "@/components/wishlist/wishlist-provider";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export default async function ShopLayout({ children }: LayoutProps<"/">) {
  const { settings, announcements } = await readStore();

  const active = settings.announcementEnabled
    ? announcements.filter((a) => a.active).sort((a, b) => a.order - b.order)
    : [];

  return (
    <WishlistProvider>
      <CartProvider>
        <AnnouncementBar items={active} seconds={settings.announcementSeconds} />
        <Header brandMark={settings.brandMark} logo={settings.logo} nav={settings.nav} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <CartDrawer
          currency={settings.currency}
          freeShippingThreshold={settings.freeShippingThreshold}
        />
      </CartProvider>
    </WishlistProvider>
  );
}
