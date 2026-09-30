import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { readStore } from "@/lib/db";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  if (await isAuthed()) redirect("/admin");
  const { settings } = await readStore();

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-xl font-light tracking-brand text-fg">{settings.brandMark}</p>
          <h1 className="display-xl mt-6 text-3xl text-fg">Store admin</h1>
          <p className="mt-3 text-xs text-muted">
            Sign in to manage products, collections and the announcement bar.
          </p>
        </div>

        <div className="mt-9 border border-line bg-surface p-6">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-dim">
          <Link href="/" className="transition-colors hover:text-muted">
            Back to the store
          </Link>
        </p>
      </div>
    </div>
  );
}
