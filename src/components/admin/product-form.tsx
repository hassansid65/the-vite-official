"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveProductAction, type ActionState } from "@/app/admin/actions";
import { Field, FormMessage, Input, Panel, Select, SubmitButton, Textarea, Toggle } from "./ui";
import { ImageListField } from "./image-field";
import type { Category, Product } from "@/lib/types";

const INITIAL: ActionState = { status: "idle", message: "" };

export function ProductForm({
  product,
  categories,
  currency,
}: {
  product: Product | null;
  categories: Category[];
  currency: string;
}) {
  const [state, formAction] = useActionState(saveProductAction, INITIAL);
  const p = product;

  return (
    <form action={formAction} className="space-y-6">
      {p && <input type="hidden" name="id" value={p.id} />}

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Panel title="Details">
            <div className="space-y-5">
              <Field label="Name">
                <Input name="name" defaultValue={p?.name ?? ""} required placeholder="Shadow Tech Jacket" />
              </Field>

              <Field label="URL slug" hint="Leave blank to build one from the name.">
                <Input name="slug" defaultValue={p?.slug ?? ""} placeholder="shadow-tech-jacket" />
              </Field>

              <Field label="Description">
                <Textarea
                  name="description"
                  rows={5}
                  defaultValue={p?.description ?? ""}
                  placeholder="What the piece is, how it fits, what it is made from."
                />
              </Field>
            </div>
          </Panel>

          <Panel title="Images" description="The first image is used on the product card.">
            <ImageListField
              name="images"
              label="Product images"
              hint="Upload files, or point at a path already in /public."
              defaultValue={p?.images ?? []}
            />
          </Panel>

          <Panel title="Options">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Sizes" hint="Comma separated.">
                <Input name="sizes" defaultValue={(p?.sizes ?? ["S", "M", "L", "XL"]).join(", ")} />
              </Field>
              <Field label="Colours" hint="One per line, as: Black #111111">
                <Textarea
                  name="colors"
                  rows={4}
                  defaultValue={(p?.colors ?? [{ name: "Black", hex: "#111111" }])
                    .map((c) => `${c.name} ${c.hex}`)
                    .join("\n")}
                />
              </Field>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Publishing">
            <div className="space-y-5">
              <Toggle
                name="active"
                label="Visible in the store"
                defaultChecked={p ? p.active : true}
                hint="Turn off to hide it without deleting it."
              />
              <Toggle
                name="featured"
                label="Show in New Arrivals"
                defaultChecked={p?.featured ?? false}
                hint="These fill the New Arrivals grid on the home page."
              />
              <Field label="Badge" hint="Shown on the card corner. Leave blank for none.">
                <Input name="badge" defaultValue={p?.badge ?? ""} placeholder="NEW" />
              </Field>
            </div>
          </Panel>

          <Panel title="Pricing & stock">
            <div className="space-y-5">
              <Field label={`Price (${currency})`}>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={p?.price ?? 0}
                  required
                />
              </Field>
              <Field
                label={`Compare-at price (${currency})`}
                hint="Shown struck through. Leave blank if it is not on sale."
              >
                <Input
                  name="compareAtPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={p?.compareAtPrice ?? ""}
                />
              </Field>
              <Field label="Stock">
                <Input name="stock" type="number" min="0" defaultValue={p?.stock ?? 0} />
              </Field>
            </div>
          </Panel>

          <Panel title="Collection">
            <div className="space-y-5">
              <Field label="Belongs to">
                <Select
                  name="categoryId"
                  defaultValue={p?.categoryId ?? categories[0]?.id ?? ""}
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field
                label="Department"
                hint="Drives the Men and Women pages. Unisex shows in both."
              >
                <Select name="department" defaultValue={p?.department ?? "unisex"}>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </Select>
              </Field>
            </div>
          </Panel>
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-4 border border-line bg-surface px-5 py-4">
        <FormMessage state={state} />
        <div className="ml-auto flex items-center gap-3">
          {p && (
            <Link
              href={`/product/${p.slug}`}
              target="_blank"
              className="label-xs border border-line px-5 py-3 text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
            >
              Preview
            </Link>
          )}
          <SubmitButton>{p ? "Save changes" : "Create product"}</SubmitButton>
        </div>
      </div>
    </form>
  );
}
