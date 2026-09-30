"use client";

import { useState } from "react";
import { useCart } from "./cart-provider";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { HeartIcon } from "@/components/site/icons";
import { cn } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle, ready } = useWishlist();
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [color, setColor] = useState(product.colors[0]?.name ?? "Black");

  const soldOut = product.stock <= 0;
  const saved = ready && has(product.id);

  return (
    <div className="mt-9 space-y-7">
      {product.colors.length > 0 && (
        <div>
          <p className="label-xs text-fg">
            Colour <span className="ml-2 normal-case tracking-normal text-muted">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {product.colors.map((c) => (
              <button
                key={`${c.name}-${c.hex}`}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                aria-pressed={color === c.name}
                className={cn(
                  "size-8 rounded-full ring-1 ring-inset ring-white/25 transition-[outline] outline-offset-2",
                  color === c.name ? "outline outline-1 outline-fg" : "hover:ring-white/50",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <p className="label-xs text-fg">Size</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={cn(
                  "label-xs min-w-14 border px-4 py-3 transition-colors",
                  size === s
                    ? "border-fg bg-fg text-ink"
                    : "border-line text-fg/75 hover:border-fg/60 hover:text-fg",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          disabled={soldOut}
          onClick={() =>
            add({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.images[0] ?? "",
              price: product.price,
              size,
              color,
            })
          }
          className="label-xs flex-1 bg-fg px-8 py-4.5 text-ink transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {soldOut ? "Sold out" : "Add to bag"}
        </button>

        <button
          type="button"
          onClick={() =>
            toggle({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.images[0] ?? "",
              price: product.price,
            })
          }
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className="grid w-14 shrink-0 place-items-center border border-line text-fg transition-colors hover:border-fg"
        >
          <HeartIcon filled={saved} className="size-5" />
        </button>
      </div>

      {!soldOut && product.stock <= 5 && (
        <p className="text-xs text-sale">Only {product.stock} left in this run.</p>
      )}
    </div>
  );
}
