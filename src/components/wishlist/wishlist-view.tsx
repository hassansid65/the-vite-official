"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "./wishlist-provider";
import { TrashIcon } from "@/components/site/icons";
import { money } from "@/lib/format";

export function WishlistView({ currency }: { currency: string }) {
  const { items, remove, clear, ready } = useWishlist();

  if (!ready) {
    return <div className="py-24 text-center text-sm text-muted">Loading your wishlist…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="display-xl text-4xl text-fg">Nothing saved yet</h2>
        <p className="mt-4 text-sm text-muted">
          Tap the heart on any product to keep it here for later.
        </p>
        <Link
          href="/shop"
          className="label-xs mt-8 inline-block border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-dim">
          {items.length} {items.length === 1 ? "piece" : "pieces"} saved
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-dim transition-colors hover:text-fg"
        >
          Clear wishlist
        </button>
      </div>

      <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.productId} className="group flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
              <Link href={`/product/${item.slug}`} className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </Link>
              <button
                type="button"
                onClick={() => remove(item.productId)}
                aria-label={`Remove ${item.name} from wishlist`}
                className="absolute right-2.5 top-2.5 grid size-9 place-items-center bg-ink/70 text-fg backdrop-blur-sm transition-colors hover:bg-ink hover:text-sale"
              >
                <TrashIcon className="size-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col bg-surface-2 px-4 py-4">
              <Link
                href={`/product/${item.slug}`}
                className="label-xs text-fg transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
              <span className="mt-2 text-sm tabular-nums text-fg">
                {money(item.price, currency)}
              </span>
              {/* Sends you to the product page to pick a size and colour. */}
              <Link
                href={`/product/${item.slug}`}
                className="label-xs mt-4 bg-fg px-4 py-3 text-center text-ink transition-opacity hover:opacity-85"
              >
                Choose options
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
