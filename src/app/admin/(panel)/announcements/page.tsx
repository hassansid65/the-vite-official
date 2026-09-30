import Link from "next/link";
import { readStore } from "@/lib/db";
import {
  deleteAnnouncementAction,
  toggleAnnouncementAction,
} from "@/app/admin/actions";
import { AnnouncementForm } from "@/components/admin/announcement-form";

export default async function AdminAnnouncementsPage() {
  const { announcements, settings } = await readStore();
  const items = [...announcements].sort((a, b) => a.order - b.order);
  const live = items.filter((a) => a.active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display-xl text-3xl text-fg">Announcement bar</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          The strip at the very top of the storefront. Offers and trending updates go here; with
          more than one active message the bar cycles through them.
        </p>
      </div>

      {/* Live preview of the bar as shoppers see it */}
      <div className="border border-line bg-surface">
        <p className="border-b border-line-soft px-5 py-3 text-xs text-dim">Preview</p>
        <div className="bg-surface-2 px-5 py-3 text-center">
          {settings.announcementEnabled && live.length > 0 ? (
            <span className="label-xs text-fg/85">{live[0].text}</span>
          ) : (
            <span className="text-xs text-dim">
              {settings.announcementEnabled
                ? "No active messages — the bar is hidden."
                : "The bar is switched off in Site settings."}
            </span>
          )}
        </div>
        <p className="border-t border-line-soft px-5 py-3 text-xs text-dim">
          {live.length > 1 && (
            <>Cycling every {settings.announcementSeconds}s · </>
          )}
          Switch the bar on or off and change its timing in{" "}
          <Link href="/admin/settings" className="text-muted underline underline-offset-4 hover:text-fg">
            Site settings
          </Link>
          .
        </p>
      </div>

      <section className="border border-line bg-surface">
        <header className="border-b border-line-soft px-5 py-4">
          <h2 className="label-xs text-fg">Add a message</h2>
        </header>
        <div className="p-5">
          <AnnouncementForm item={null} />
        </div>
      </section>

      <div className="space-y-4">
        {items.length === 0 && (
          <p className="border border-line bg-surface px-5 py-10 text-center text-sm text-muted">
            No messages yet.
          </p>
        )}

        {items.map((a) => (
          <details key={a.id} className="group border border-line bg-surface">
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-5 py-4">
              <span className="min-w-0 flex-1">
                <span className="label-xs text-fg">{a.text}</span>
                {a.href && <span className="ml-3 text-xs text-dim">→ {a.href}</span>}
              </span>
              <span
                className={`label-xs shrink-0 ${a.active ? "text-fg" : "text-dim"}`}
              >
                {a.active ? "Live" : "Off"}
              </span>
            </summary>

            <div className="space-y-6 border-t border-line-soft p-5">
              <AnnouncementForm item={a} />

              <div className="flex flex-wrap items-center gap-3 border-t border-line-soft pt-5">
                <form action={toggleAnnouncementAction}>
                  <input type="hidden" name="id" value={a.id} />
                  <button
                    type="submit"
                    className="label-xs border border-line px-5 py-2.5 text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
                  >
                    {a.active ? "Switch off" : "Switch on"}
                  </button>
                </form>

                <form action={deleteAnnouncementAction} className="ml-auto">
                  <input type="hidden" name="id" value={a.id} />
                  <button
                    type="submit"
                    className="label-xs border border-sale/50 px-5 py-2.5 text-sale transition-colors hover:bg-sale hover:text-fg"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
