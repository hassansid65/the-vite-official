import Link from "next/link";
import Image from "next/image";
import { readStore } from "@/lib/db";
import { money } from "@/lib/format";

function Stat({ label, value, href }: { label: string; value: string | number; href?: string }) {
  const body = (
    <div className="border border-line bg-surface p-5 transition-colors hover:border-line/80">
      <p className="label-xs text-dim">{label}</p>
      <p className="display-xl mt-3 text-3xl text-fg">{value}</p>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

export default async function AdminDashboard({ searchParams }: PageProps<"/admin">) {
  const params = await searchParams;
  const { products, categories, announcements, subscribers, settings } = await readStore();

  const active = products.filter((p) => p.active);
  const lowStock = products.filter((p) => p.active && p.stock > 0 && p.stock <= 5);
  const soldOut = products.filter((p) => p.active && p.stock <= 0);
  const liveAnnouncements = announcements.filter((a) => a.active);
  const recent = [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="display-xl text-3xl text-fg">Dashboard</h1>
        <p className="mt-2 text-sm text-muted">
          Everything on the storefront is edited from here.
        </p>
      </div>

      {params.reset === "1" && (
        <p className="border border-line bg-surface px-5 py-4 text-xs text-fg/80">
          The catalogue has been reset to the starting content.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Products live" value={active.length} href="/admin/products" />
        <Stat label="Collections" value={categories.length} href="/admin/collections" />
        <Stat
          label="Bar messages live"
          value={liveAnnouncements.length}
          href="/admin/announcements"
        />
        <Stat label="Subscribers" value={subscribers.length} href="/admin/subscribers" />
      </div>

      {(lowStock.length > 0 || soldOut.length > 0) && (
        <section className="border border-line bg-surface">
          <header className="border-b border-line-soft px-5 py-4">
            <h2 className="label-xs text-fg">Needs attention</h2>
          </header>
          <ul className="divide-y divide-line-soft">
            {soldOut.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <Link href={`/admin/products/${p.id}`} className="text-sm text-fg hover:opacity-70">
                  {p.name}
                </Link>
                <span className="label-xs text-sale">Sold out</span>
              </li>
            ))}
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <Link href={`/admin/products/${p.id}`} className="text-sm text-fg hover:opacity-70">
                  {p.name}
                </Link>
                <span className="label-xs text-muted">{p.stock} left</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border border-line bg-surface">
        <header className="flex items-center justify-between gap-4 border-b border-line-soft px-5 py-4">
          <h2 className="label-xs text-fg">Recently added</h2>
          <Link
            href="/admin/products/new"
            className="label-xs bg-fg px-4 py-2.5 text-ink transition-opacity hover:opacity-85"
          >
            New product
          </Link>
        </header>
        <ul className="divide-y divide-line-soft">
          {recent.map((p) => (
            <li key={p.id} className="flex items-center gap-4 px-5 py-4">
              <div className="relative size-12 shrink-0 overflow-hidden bg-surface-2">
                <Image
                  src={p.images[0] ?? "/images/products/utility-tee.jpg"}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="block truncate text-sm text-fg hover:opacity-70"
                >
                  {p.name}
                </Link>
                <p className="mt-0.5 text-xs text-dim">
                  {money(p.price, settings.currency)} · {p.active ? "Live" : "Hidden"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
