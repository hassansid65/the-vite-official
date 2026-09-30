import { readStore } from "@/lib/db";
import { deleteSubscriberAction } from "@/app/admin/actions";

export default async function AdminSubscribersPage() {
  const { subscribers } = await readStore();
  const list = [...subscribers].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="display-xl text-3xl text-fg">Subscribers</h1>
        <p className="mt-2 text-sm text-muted">
          Everyone who signed up through the footer newsletter form.
        </p>
      </div>

      <div className="border border-line bg-surface">
        {list.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-muted">No sign-ups yet.</p>
        ) : (
          <ul className="divide-y divide-line-soft">
            {list.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm text-fg">{s.email}</p>
                  <p className="mt-0.5 text-xs text-dim">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <form action={deleteSubscriberAction}>
                  <input type="hidden" name="id" value={s.id} />
                  <button
                    type="submit"
                    className="label-xs border border-line px-4 py-2 text-dim transition-colors hover:border-sale/50 hover:text-sale"
                  >
                    Remove
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
