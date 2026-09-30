"use client";

import { useActionState } from "react";
import { saveAnnouncementAction, type ActionState } from "@/app/admin/actions";
import { Field, FormMessage, Input, SubmitButton, Toggle } from "./ui";
import type { Announcement } from "@/lib/types";

const INITIAL: ActionState = { status: "idle", message: "" };

export function AnnouncementForm({ item }: { item: Announcement | null }) {
  const [state, formAction] = useActionState(saveAnnouncementAction, INITIAL);
  const a = item;

  return (
    <form action={formAction} className="space-y-5">
      {a && <input type="hidden" name="id" value={a.id} />}

      <Field label="Message" hint="Short and in caps reads best in the bar.">
        <Input
          name="text"
          defaultValue={a?.text ?? ""}
          required
          placeholder="FW24 DROP IS LIVE — FREE SHIPPING OVER $150"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <Field label="Links to" hint="Optional. A path like /shop or a full URL.">
          <Input name="href" defaultValue={a?.href ?? ""} placeholder="/shop" />
        </Field>
        <Field label="Sort order" hint="Lower numbers show first.">
          <Input name="order" type="number" defaultValue={a?.order ?? 99} />
        </Field>
      </div>

      <Toggle
        name="active"
        label="Showing in the bar"
        defaultChecked={a ? a.active : true}
        hint="Inactive messages stay saved but are not shown."
      />

      <div className="flex items-center justify-between gap-4">
        <FormMessage state={state} />
        <SubmitButton className="ml-auto">{a ? "Save message" : "Add message"}</SubmitButton>
      </div>
    </form>
  );
}
