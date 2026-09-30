export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

export type CartState = {
  lines: CartLine[];
  /** False until localStorage has been read, so the UI can avoid flashing "empty". */
  hydrated: boolean;
};

const KEY = "vite-cart-v1";

/**
 * The bag lives outside React so it can be read with useSyncExternalStore:
 * the server snapshot is always empty, and the real value arrives once the
 * browser store has been read.
 */
const SERVER_STATE: CartState = { lines: [], hydrated: false };
let state: CartState = SERVER_STATE;
let loaded = false;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function commit(lines: CartLine[]) {
  state = { lines, hydrated: true };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Private mode or a full quota: the bag still works for this session.
  }
  emit();
}

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (!loaded) {
    loaded = true;
    state = { lines: readStorage(), hydrated: true };
    // Let the current commit finish before re-rendering with the stored bag.
    queueMicrotask(emit);
  }

  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartState {
  return state;
}

export function getServerSnapshot(): CartState {
  return SERVER_STATE;
}

function lineKey(productId: string, size: string, color: string) {
  return `${productId}::${size}::${color}`;
}

export function addLine(line: Omit<CartLine, "key" | "qty">, qty = 1): void {
  const key = lineKey(line.productId, line.size, line.color);
  const existing = state.lines.find((l) => l.key === key);
  commit(
    existing
      ? state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
      : [...state.lines, { ...line, key, qty }],
  );
}

export function setLineQty(key: string, qty: number): void {
  commit(
    qty <= 0
      ? state.lines.filter((l) => l.key !== key)
      : state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(99, qty) } : l)),
  );
}

export function removeLine(key: string): void {
  commit(state.lines.filter((l) => l.key !== key));
}

export function clearLines(): void {
  commit([]);
}
