"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/types";

export function AnnouncementBar({
  items,
  seconds,
}: {
  items: Announcement[];
  seconds: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const ms = Math.max(2, seconds) * 1000;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ms);
    return () => window.clearInterval(id);
  }, [items.length, seconds]);

  if (items.length === 0) return null;
  const current = items[Math.min(index, items.length - 1)];

  // Tighter type on narrow screens, and the bar grows rather than clipping a long offer.
  const body = (
    <span className="block text-center text-[0.625rem] font-medium uppercase leading-snug tracking-wide2 text-fg/85 sm:text-[0.6875rem] sm:tracking-label">
      {current.text}
    </span>
  );

  return (
    <div className="relative z-50 border-b border-line-soft bg-surface-2">
      <div className="mx-auto flex min-h-9 max-w-[1600px] items-center justify-center px-4 py-2">
        {/* min-w-0 lets this flex item shrink so a long message wraps instead of clipping. */}
        <div key={current.id} className="animate-fade-up w-full min-w-0">
          {current.href ? (
            <Link href={current.href} className="block transition-opacity hover:opacity-70">
              {body}
            </Link>
          ) : (
            body
          )}
        </div>
      </div>
    </div>
  );
}
