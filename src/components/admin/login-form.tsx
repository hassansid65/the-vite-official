"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/app/admin/actions";
import { Field, FormMessage, Input, SubmitButton } from "./ui";

const INITIAL: ActionState = { status: "idle", message: "" };

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, INITIAL);

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Password">
        <Input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          placeholder="••••••••"
        />
      </Field>
      <FormMessage state={state} />
      <SubmitButton className="w-full">Sign in</SubmitButton>
    </form>
  );
}
