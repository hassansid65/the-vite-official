"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import type { ActionState } from "@/app/admin/actions";

export function Panel({
  title,
  description,
  children,
  actions,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="border border-line bg-surface">
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft px-5 py-4">
          <div>
            {title && <h2 className="label-xs text-fg">{title}</h2>}
            {description && <p className="mt-1.5 text-xs text-muted">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label-xs text-fg/85">{label}</span>
      {hint && <span className="mt-1 block text-xs text-dim">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full border border-line bg-ink px-3.5 py-2.5 text-sm text-fg placeholder:text-dim focus:border-fg/50 focus:outline-none";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputCls, "font-mono text-xs leading-relaxed", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputCls, props.className)} />;
}

export function Toggle({
  name,
  defaultChecked,
  label,
  hint,
}: {
  name: string;
  defaultChecked?: boolean;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 size-4 shrink-0 accent-white"
      />
      <span>
        <span className="label-xs text-fg/85">{label}</span>
        {hint && <span className="mt-1 block text-xs text-dim">{hint}</span>}
      </span>
    </label>
  );
}

export function SubmitButton({
  children = "Save",
  variant = "primary",
  className,
}: {
  children?: ReactNode;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "label-xs px-6 py-3 transition-colors disabled:opacity-50",
        variant === "primary" && "bg-fg text-ink hover:opacity-85",
        variant === "ghost" && "border border-line text-fg/80 hover:border-fg/60 hover:text-fg",
        variant === "danger" && "border border-sale/60 text-sale hover:bg-sale hover:text-fg",
        className,
      )}
    >
      {pending ? "Working…" : children}
    </button>
  );
}

export function FormMessage({ state }: { state: ActionState }) {
  if (state.status === "idle") return null;
  return (
    <p
      aria-live="polite"
      className={cn(
        "text-xs",
        state.status === "ok" ? "text-fg/80" : "text-sale",
      )}
    >
      {state.message}
    </p>
  );
}
