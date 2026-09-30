import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="label-xs text-dim">404</p>
      <h1 className="display-xl mt-5 text-[clamp(2.5rem,8vw,5rem)] text-fg">Lost in the dark</h1>
      <p className="mt-5 text-sm text-muted">
        That page does not exist, or the piece has sold out and been retired.
      </p>
      <Link
        href="/shop"
        className="label-xs mt-9 border border-fg px-8 py-3.5 text-fg transition-colors hover:bg-fg hover:text-ink"
      >
        Shop the collection
      </Link>
    </div>
  );
}
