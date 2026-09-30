import { readStore } from "@/lib/db";
import { SettingsForm } from "@/components/admin/settings-form";
import { resetStoreAction } from "@/app/admin/actions";

export default async function AdminSettingsPage() {
  const { settings } = await readStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display-xl text-3xl text-fg">Site settings</h1>
        <p className="mt-2 text-sm text-muted">
          Wording, imagery and layout copy for every part of the storefront.
        </p>
      </div>

      <SettingsForm settings={settings} />

      <section className="border border-sale/30 bg-surface">
        <header className="border-b border-line-soft px-5 py-4">
          <h2 className="label-xs text-sale">Danger zone</h2>
        </header>
        <form action={resetStoreAction} className="flex flex-wrap items-end gap-4 p-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-fg">Reset the catalogue</p>
            <p className="mt-1.5 text-xs text-muted">
              Restores the starting products, collections, announcements and settings. Everything
              you have added is lost. Type RESET to confirm.
            </p>
          </div>
          <input
            name="confirm"
            placeholder="RESET"
            className="w-32 border border-line bg-ink px-3.5 py-2.5 text-sm text-fg placeholder:text-dim focus:border-fg/50 focus:outline-none"
          />
          <button
            type="submit"
            className="label-xs border border-sale/50 px-5 py-3 text-sale transition-colors hover:bg-sale hover:text-fg"
          >
            Reset
          </button>
        </form>
      </section>
    </div>
  );
}
