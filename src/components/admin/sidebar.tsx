"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/announcements", label: "Announcement bar" },
  { href: "/admin/settings", label: "Site settings" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

export function AdminNav() {
  const pathname = usePathname();

  const active = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 lg:overflow-visible">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "label-xs whitespace-nowrap px-4 py-3 transition-colors",
            active(l.href, l.exact)
              ? "bg-surface-2 text-fg"
              : "text-muted hover:bg-surface-2/60 hover:text-fg",
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
