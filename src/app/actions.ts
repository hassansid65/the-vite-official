"use server";

import { mutateStore, newId } from "@/lib/db";

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const already = await mutateStore((store) => {
    if (store.subscribers.some((s) => s.email === email)) return true;
    store.subscribers.push({
      id: newId("sub"),
      email,
      createdAt: new Date().toISOString(),
    });
    return false;
  });

  return already
    ? { status: "ok", message: "You are already on the list." }
    : { status: "ok", message: "You are in. Watch your inbox for the next drop." };
}
