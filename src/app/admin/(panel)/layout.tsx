import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { readStore } from "@/lib/db";
import { logoutAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/sidebar";

export default async function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  if (!(await isAuthed())) redirect("/admin/login");
  const { settings } = await readStore();

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-30 border-b border-line-soft bg-ink/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-5 lg:px-8">
          <div className="flex items-baseline gap-4">
            <Link href="/admin" className="text-base font-light tracking-brand text-fg">
              {settings.brandMark}
            </Link>
            <span className="label-xs hidden text-dim sm:inline">Admin</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="label-xs border border-line px-4 py-2.5 text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
            >
              View store
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="label-xs px-4 py-2.5 text-muted transition-colors hover:text-fg"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-6 px-5 py-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-10">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="border border-line bg-surface p-1.5 lg:sticky lg:top-24">
            <AdminNav />
          </div>
        </aside>
        <main className="min-w-0 flex-1 pb-12">{children}</main>
      </div>
    </div>
  );
}
