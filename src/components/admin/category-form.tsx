"use client";

import { useActionState } from "react";
import { saveCategoryAction, type ActionState } from "@/app/admin/actions";
import { Field, FormMessage, Input, SubmitButton, Textarea } from "./ui";
import { SingleImageField } from "./image-field";
import type { Category } from "@/lib/types";

const INITIAL: ActionState = { status: "idle", message: "" };

export function CategoryForm({ category }: { category: Category | null }) {
  const [state, formAction] = useActionState(saveCategoryAction, INITIAL);
  const c = category;

  return (
    <form action={formAction} className="space-y-5">
      {c && <input type="hidden" name="id" value={c.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" defaultValue={c?.name ?? ""} required placeholder="Baggy Jeans" />
        </Field>
        <Field label="URL slug" hint="Blank builds one from the name.">
          <Input name="slug" defaultValue={c?.slug ?? ""} placeholder="baggy-jeans" />
        </Field>
      </div>

      <Field label="Description">
        <Textarea name="description" rows={2} defaultValue={c?.description ?? ""} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
        <SingleImageField
          name="image"
          label="Cover image"
          hint="Shown on the Collections page."
          defaultValue={c?.image ?? ""}
        />
        <Field label="Sort order" hint="Lower numbers come first.">
          <Input name="order" type="number" defaultValue={c?.order ?? 99} />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-4">
        <FormMessage state={state} />
        <SubmitButton className="ml-auto">
          {c ? "Save collection" : "Add collection"}
        </SubmitButton>
      </div>
    </form>
  );
}
