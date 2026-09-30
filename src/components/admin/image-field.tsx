"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Field } from "./ui";

/**
 * A list of image paths, one per line, kept in a hidden textarea so the
 * surrounding server action receives it as a plain form field.
 */
export function ImageListField({
  name,
  label,
  hint,
  defaultValue,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const added: string[] = [];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body });
        const json = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !json.url) throw new Error(json.error || "Upload failed");
        added.push(json.url);
      }
      setUrls((prev) => [...prev, ...added]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const move = (i: number, dir: -1 | 1) => {
    setUrls((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  return (
    <div>
      <Field label={label} hint={hint}>
        <div className="space-y-3">
          {urls.length > 0 && (
            <ul className="space-y-2">
              {urls.map((url, i) => (
                <li key={`${url}-${i}`} className="flex items-center gap-3 border border-line bg-ink p-2">
                  <div className="relative size-12 shrink-0 overflow-hidden bg-surface-2">
                    {/* Unoptimised: the path may point anywhere the operator pasted. */}
                    <Image src={url} alt="" fill sizes="48px" className="object-cover" unoptimized />
                  </div>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted">{url}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="px-2 py-1 text-xs text-muted hover:text-fg disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === urls.length - 1}
                      aria-label="Move down"
                      className="px-2 py-1 text-xs text-muted hover:text-fg disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrls((prev) => prev.filter((_, k) => k !== i))}
                      aria-label="Remove image"
                      className="px-2 py-1 text-xs text-muted hover:text-sale"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              onChange={(e) => upload(e.target.files)}
              className="hidden"
              id={`${name}-file`}
            />
            <label
              htmlFor={`${name}-file`}
              className="label-xs cursor-pointer border border-line px-4 py-2.5 text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
            >
              {busy ? "Uploading…" : "Upload images"}
            </label>
            <button
              type="button"
              onClick={() => {
                const url = window.prompt("Image path or URL");
                if (url?.trim()) setUrls((prev) => [...prev, url.trim()]);
              }}
              className="label-xs border border-line px-4 py-2.5 text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
            >
              Add by URL
            </button>
          </div>

          {error && <p className="text-xs text-sale">{error}</p>}
        </div>
      </Field>

      <textarea name={name} value={urls.join("\n")} readOnly hidden />
    </div>
  );
}

/** Single image path with upload, used for collection and hero art. */
export function SingleImageField({
  name,
  label,
  hint,
  defaultValue,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error || "Upload failed");
      setUrl(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {url && (
            <div className="relative size-14 shrink-0 overflow-hidden border border-line bg-surface-2">
              <Image src={url} alt="" fill sizes="56px" className="object-cover" unoptimized />
            </div>
          )}
          <input
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/images/hero.jpg"
            className="w-full border border-line bg-ink px-3.5 py-2.5 font-mono text-xs text-fg placeholder:text-dim focus:border-fg/50 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => upload(e.target.files?.[0])}
            className="hidden"
            id={`${name}-single-file`}
          />
          <label
            htmlFor={`${name}-single-file`}
            className="label-xs cursor-pointer border border-line px-4 py-2.5 text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
          >
            {busy ? "Uploading…" : "Upload"}
          </label>
          {error && <span className="text-xs text-sale">{error}</span>}
        </div>
      </div>
    </Field>
  );
}
