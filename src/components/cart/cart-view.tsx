"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { TrashIcon } from "@/components/site/icons";
import { money } from "@/lib/format";

export function CartView({
  currency,
  freeShippingThreshold,
}: {
  currency: string;
  freeShippingThreshold: number;
}) {
  const { lines, setQty, remove, subtotal, ready, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (!ready) {
    return <div className="py-24 text-center text-sm text-muted">Loading your bag…</div>;
  }

  if (placed) {
    return (
      <div className="py-24 text-center">
        <p className="label-xs text-muted">Order received</p>
        <h2 className="display-xl mt-4 text-4xl text-fg">Thank you</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          This demo store does not take payments yet. Connect a payment provider to turn this
          into a real checkout.
        </p>
        <Link
          href="/shop"
          className="label-xs mt-8 inline-block border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="display-xl text-4xl text-fg">Your bag is empty</h2>
        <p className="mt-4 text-sm text-muted">Nothing here yet. Go find something dark.</p>
        <Link
          href="/shop"
          className="label-xs mt-8 inline-block border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
        >
          Shop the collection
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= freeShippingThreshold ? 0 : 12;

  return (
    <div className="grid gap-12 py-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
      <div>
        <ul className="divide-y divide-line-soft border-y border-line-soft">
          {lines.map((line) => (
            <li key={line.key} className="flex gap-5 py-6">
              <Link
                href={`/product/${line.slug}`}
                className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-surface-2 sm:w-28"
              >
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${line.slug}`}
                      className="label-xs text-fg transition-opacity hover:opacity-70"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-1.5 text-xs text-muted">
                      {line.size} · {line.color}
                    </p>
                    <p className="mt-1 text-xs text-dim">
                      {money(line.price, currency)} each
                    </p>
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-fg">
                    {money(line.price * line.qty, currency)}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(line.key, line.qty - 1)}
                      className="px-3.5 py-2 text-sm text-fg/70 transition-colors hover:text-fg"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-sm tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty(line.key, line.qty + 1)}
                      className="px-3.5 py-2 text-sm text-fg/70 transition-colors hover:text-fg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.key)}
                    aria-label={`Remove ${line.name}`}
                    className="flex items-center gap-2 p-1.5 text-xs text-muted transition-colors hover:text-fg"
                  >
                    <TrashIcon className="size-4" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={clear}
          className="mt-5 text-xs text-dim transition-colors hover:text-fg"
        >
          Clear bag
        </button>
      </div>

      {/* Summary */}
      <aside className="h-fit border border-line bg-surface p-6 lg:sticky lg:top-24">
        <h2 className="label-xs text-fg">Order summary</h2>

        <dl className="mt-6 space-y-3.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="tabular-nums text-fg">{money(subtotal, currency)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd className="tabular-nums text-fg">
              {shipping === 0 ? "Free" : money(shipping, currency)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-line-soft pt-3.5">
            <dt className="label-xs text-fg">Total</dt>
            <dd className="text-lg tabular-nums text-fg">
              {money(subtotal + shipping, currency)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => {
            clear();
            setPlaced(true);
          }}
          className="label-xs mt-7 w-full bg-fg px-8 py-4 text-ink transition-opacity hover:opacity-85"
        >
          Checkout
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-dim">
          Demo checkout — no payment is taken.
        </p>
      </aside>
    </div>
  );
}
