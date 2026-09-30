import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Sign in" />
      <div className="mx-auto max-w-md px-6 py-16 text-center sm:px-8">
        <p className="text-sm leading-relaxed text-muted">
          Customer accounts are not switched on for this store yet. Add an auth provider to let
          shoppers track orders and save their details.
        </p>
        <Link
          href="/shop"
          className="label-xs mt-8 inline-block border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
        >
          Continue shopping
        </Link>
      </div>
    </>
  );
}
