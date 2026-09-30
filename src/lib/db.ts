import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Store } from "./types";
import { seedStore } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

/** Serialises writes so two concurrent server actions can't clobber the file. */
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const run = queue.then(job, job);
  queue = run.catch(() => undefined);
  return run;
}

async function loadRaw(): Promise<Store> {
  try {
    const text = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(text) as Store;
  } catch {
    const seeded = seedStore();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seeded, null, 2), "utf8");
    return seeded;
  }
}

export async function readStore(): Promise<Store> {
  return enqueue(loadRaw);
}

/** Read-modify-write under the same lock, so mutations never race. */
export async function mutateStore<T>(fn: (store: Store) => T | Promise<T>): Promise<T> {
  return enqueue(async () => {
    const store = await loadRaw();
    const result = await fn(store);
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DATA_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
    await fs.rename(tmp, DATA_FILE);
    return result;
  });
}

export async function resetStore(): Promise<void> {
  await enqueue(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(seedStore(), null, 2), "utf8");
  });
}

export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

/** Makes `slug` unique within `taken`, appending -2, -3, ... as needed. */
export function uniqueSlug(slug: string, taken: string[]): string {
  const base = slug || "item";
  if (!taken.includes(base)) return base;
  let n = 2;
  while (taken.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}
