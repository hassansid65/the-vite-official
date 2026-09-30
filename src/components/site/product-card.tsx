"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { HeartIcon } from "./icons";
import { cn, money } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  currency,
  priority = false,
  tall = false,
}: {
  product: Product;
  currency: string;
  priority?: boolean;
  /** Full-length framing for the home page, where the whole outfit is shown. */
  tall?: boolean;
}) {
  const { add } = useCart();
  const { has, toggle, ready } = useWishlist();

  const onSale = product.compareAtPrice !== null && product.compareAtPrice > product.price;
  const soldOut = product.stock <= 0;
  const front = product.images[0] ?? "";
  const back = product.images[1];
  const saved = ready && has(product.id);

  const sizes = tall
    ? "(min-width: 1024px) 23vw, 46vw"
    : "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 90vw";

  return (
    <div className="group flex flex-col">
      <div
        className={cn(
          "relative overflow-hidden bg-surface-2",
          tall ? "aspect-[36/100]" : "aspect-[3/4]",
        )}
      >
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          <Image
            src={front}
            alt={product.name}
            fill
            priority={priority}
            sizes={sizes}
            className={cn(
              "object-cover object-top",
              back
                ? "transition-opacity duration-500 ease-out group-hover:opacity-0"
                : "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            )}
          />
          {/* Back view cross-fades in on hover. */}
          {back && (
            <Image
              src={back}
              alt={`${product.name}, back view`}
              fill
              sizes={sizes}
              className="object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}
        </Link>

        {product.badge && !soldOut && (
          <span className="label-xs pointer-events-none absolute left-3 top-3 z-10 bg-ink/85 px-2.5 py-1.5 text-[10px] text-fg backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {soldOut && (
          <span className="label-xs pointer-events-none absolute left-3 top-3 z-10 bg-ink/85 px-2.5 py-1.5 text-[10px] text-muted backdrop-blur-sm">
            Sold out
          </span>
        )}

        <button
          type="button"
          onClick={() =>
            toggle({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: front,
              price: product.price,
            })
          }
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className="absolute right-2.5 top-2.5 z-10 grid size-9 place-items-center bg-ink/70 text-fg backdrop-blur-sm transition-colors hover:bg-ink"
        >
          <HeartIcon filled={saved} className="size-[17px]" />
        </button>

        {/* Quick add: always reachable on touch, slides up on hover for pointers. */}
        {!soldOut && (
          <button
            type="button"
            onClick={() =>
              add({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: front,
                price: product.price,
                size: product.sizes[0] ?? "One size",
                color: product.colors[0]?.name ?? "Default",
              })
            }
            className="label-xs absolute inset-x-0 bottom-0 z-10 bg-fg/95 py-3 text-ink backdrop-blur-sm transition-transform duration-300 ease-out sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0"
          >
            Quick add
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col bg-surface-2 px-4 py-4">
        <h3 className="label-xs text-fg">
          <Link href={`/product/${product.slug}`} className="transition-opacity hover:opacity-75">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-baseline gap-2.5">
          <span className="text-sm tabular-nums text-fg">{money(product.price, currency)}</span>
          {onSale && (
            <span className="text-xs tabular-nums text-dim line-through">
              {money(product.compareAtPrice as number, currency)}
            </span>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="mt-3.5 flex items-center gap-2">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={`${c.name}-${c.hex}`}
                title={c.name}
                className="size-[13px] rounded-full ring-1 ring-inset ring-white/25"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
