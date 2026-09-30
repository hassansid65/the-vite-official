"use client";

import { useActionState } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions";
import { ArrowRightIcon } from "./icons";
import type { Settings } from "@/lib/types";

const INITIAL: SubscribeState = { status: "idle", message: "" };

export function Newsletter({ newsletter }: { newsletter: Settings["newsletter"] }) {
  const [state, formAction, pending] = useActionState(subscribeAction, INITIAL);

  return (
    <section className="border-t border-line-soft bg-ink">
      <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
        {/* min-w-0: grid items default to min-width:auto, which would otherwise
            floor this column at the email input's intrinsic width and push the
            whole page into horizontal overflow on narrow screens. */}
        <div className="min-w-0">
          <h2 className="label-xs text-fg">{newsletter.title}</h2>
          <p className="mt-2.5 text-sm text-muted">{newsletter.text}</p>
        </div>

        <form action={formAction} className="w-full min-w-0">
          <div className="flex w-full border border-line focus-within:border-fg/50">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-fg placeholder:text-dim focus:outline-none"
            />
            <button
              type="submit"
              disabled={pending}
              className="label-xs group flex shrink-0 items-center gap-3 bg-fg px-6 py-4 text-ink transition-opacity hover:opacity-85 disabled:opacity-60 sm:px-8"
            >
              {pending ? "Sending" : newsletter.buttonLabel}
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {state.status !== "idle" && (
            <p
              aria-live="polite"
              className={`mt-3 text-xs ${state.status === "ok" ? "text-fg/80" : "text-sale"}`}
            >
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
