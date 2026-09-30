"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./icons";
import { cn } from "@/lib/format";
import type { LinkItem } from "@/lib/types";

export function Header({
  brandMark,
  logo,
  nav,
}: {
  brandMark: string;
  logo: string;
  nav: LinkItem[];
}) {
  const pathname = usePathname();
  const { count, setOpen: setCartOpen, ready } = useCart();
  const { count: savedCount, ready: savedReady } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The home page runs the header over the hero art; every other route is solid.
  const solid = pathname !== "/" || scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        solid ? "border-b border-line-soft bg-ink/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-8 lg:h-[72px]">
        {/* Left: desktop nav / mobile menu button */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {nav.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={cn(
                "label-xs relative py-2 transition-colors",
                isActive(item.href) ? "text-fg" : "text-fg/65 hover:text-fg",
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-fg" />
              )}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="justify-self-start p-2 text-fg/80 transition-colors hover:text-fg lg:hidden"
        >
          <MenuIcon className="size-5" />
        </button>

        {/* Center: wordmark */}
        <Link
          href="/"
          className="flex items-center justify-self-center gap-2.5 sm:gap-3"
          aria-label={brandMark}
        >
          {logo && (
            <Image
              src={logo}
              alt=""
              width={72}
              height={72}
              priority
              className="size-8 shrink-0 sm:size-9"
            />
          )}
          <span className="whitespace-nowrap font-sans text-sm font-light tracking-brand text-fg sm:text-base lg:text-lg">
            {brandMark}
          </span>
        </Link>

        {/* Right: search, account, wishlist, bag */}
        <div className="flex items-center justify-end gap-0.5 sm:gap-1.5">
          <Link
            href="/shop"
            aria-label="Search products"
            className="hidden p-2 text-fg/80 transition-colors hover:text-fg sm:block"
          >
            <SearchIcon className="size-[18px]" />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden p-2 text-fg/80 transition-colors hover:text-fg sm:block"
          >
            <UserIcon className="size-[18px]" />
          </Link>
          <Link
            href="/wishlist"
            aria-label={`Wishlist, ${savedReady ? savedCount : 0} items`}
            className="relative p-2 text-fg/80 transition-colors hover:text-fg"
          >
            <HeartIcon className="size-[18px]" />
            {savedReady && savedCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-fg text-[10px] font-semibold leading-none text-ink">
                {savedCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Bag, ${ready ? count : 0} items`}
            className="relative p-2 text-fg/80 transition-colors hover:text-fg"
          >
            <BagIcon className="size-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-fg text-[10px] font-semibold leading-none text-ink">
              {ready ? count : 0}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col border-r border-line bg-surface">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-soft px-5">
              <span className="flex items-center gap-2.5">
                {logo && (
                  <Image src={logo} alt="" width={64} height={64} className="size-7 shrink-0" />
                )}
                <span className="text-sm font-light tracking-brand">{brandMark}</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-fg/70 hover:text-fg"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <nav className="flex flex-col overflow-y-auto p-5">
              {nav.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="display-xl border-b border-line-soft py-4 text-3xl text-fg/90 transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="label-xs mt-6 flex items-center gap-3 text-muted transition-colors hover:text-fg"
              >
                <HeartIcon className="size-4" />
                Wishlist
              </Link>
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="label-xs mt-4 flex items-center gap-3 text-muted transition-colors hover:text-fg"
              >
                <UserIcon className="size-4" />
                Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
