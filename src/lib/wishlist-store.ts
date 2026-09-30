export type WishlistItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
};

export type WishlistState = {
  items: WishlistItem[];
  hydrated: boolean;
};

const KEY = "vite-wishlist-v1";

/** Same external-store shape as the bag, so it reads cleanly on the server. */
const SERVER_STATE: WishlistState = { items: [], hydrated: false };
let state: WishlistState = SERVER_STATE;
let loaded = false;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function commit(items: WishlistItem[]) {
  state = { items, hydrated: true };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Private mode or a full quota: the list still works for this session.
  }
  emit();
}

function readStorage(): WishlistItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (!loaded) {
    loaded = true;
    state = { items: readStorage(), hydrated: true };
    queueMicrotask(emit);
  }

  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): WishlistState {
  return state;
}

export function getServerSnapshot(): WishlistState {
  return SERVER_STATE;
}

export function toggleItem(item: WishlistItem): void {
  const exists = state.items.some((i) => i.productId === item.productId);
  commit(
    exists
      ? state.items.filter((i) => i.productId !== item.productId)
      : [...state.items, item],
  );
}

export function removeItem(productId: string): void {
  commit(state.items.filter((i) => i.productId !== productId));
}

export function clearItems(): void {
  commit([]);
}
