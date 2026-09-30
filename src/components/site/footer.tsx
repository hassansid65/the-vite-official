import Link from "next/link";
import type { Settings } from "@/lib/types";

export function Footer({ settings }: { settings: Settings }) {
  const { footer, brandMark } = settings;

  return (
    <footer className="mt-auto border-t border-line-soft bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <p className="text-lg font-light tracking-brand text-fg">{brandMark}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted">{footer.about}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <nav key={col.id} aria-label={col.title}>
                <h3 className="label-xs text-fg">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-soft pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-dim">{footer.copyright}</p>
          <Link
            href="/admin"
            className="text-xs text-dim transition-colors hover:text-muted"
          >
            Store admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
