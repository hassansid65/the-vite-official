"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./cart-provider";
import { CloseIcon, TrashIcon } from "@/components/site/icons";
import { money } from "@/lib/format";

export function CartDrawer({
  currency,
  freeShippingThreshold,
}: {
  currency: string;
  freeShippingThreshold: number;
}) {
  const { lines, open, setOpen, setQty, remove, subtotal, count } = useCart();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-surface">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-soft px-5">
          <h2 className="label-xs">
            Your bag {count > 0 && <span className="text-muted">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="p-2 text-fg/70 transition-colors hover:text-fg"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="display-xl text-3xl text-fg">Your bag is empty</p>
            <p className="text-sm text-muted">Nothing here yet. Go find something dark.</p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="label-xs mt-2 border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
            >
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              {freeShippingThreshold > 0 && (
                <p className="border-b border-line-soft py-4 text-center text-xs text-muted">
                  {remaining > 0 ? (
                    <>
                      Spend <span className="text-fg">{money(remaining, currency)}</span> more for
                      free shipping
                    </>
                  ) : (
                    <span className="text-fg">You have unlocked free shipping</span>
                  )}
                </p>
              )}
              <ul className="divide-y divide-line-soft">
                {lines.map((line) => (
                  <li key={line.key} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={() => setOpen(false)}
                      className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-surface-2"
                    >
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={() => setOpen(false)}
                          className="label-xs truncate text-fg hover:opacity-70"
                        >
                          {line.name}
                        </Link>
                        <span className="shrink-0 text-sm tabular-nums text-fg">
                          {money(line.price * line.qty, currency)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {line.size} · {line.color}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.key, line.qty - 1)}
                            className="px-3 py-1.5 text-sm text-fg/70 transition-colors hover:text-fg"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-sm tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.key, line.qty + 1)}
                            className="px-3 py-1.5 text-sm text-fg/70 transition-colors hover:text-fg"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          aria-label={`Remove ${line.name}`}
                          className="p-1.5 text-muted transition-colors hover:text-fg"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 border-t border-line-soft px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="label-xs text-muted">Subtotal</span>
                <span className="text-lg tabular-nums text-fg">{money(subtotal, currency)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">Taxes and shipping calculated at checkout.</p>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="label-xs mt-4 flex w-full items-center justify-center bg-fg px-8 py-4 text-ink transition-opacity hover:opacity-85"
              >
                View bag &amp; checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
