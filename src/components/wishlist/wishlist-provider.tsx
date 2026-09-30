"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  clearItems,
  getServerSnapshot,
  getSnapshot,
  removeItem,
  subscribe,
  toggleItem,
  type WishlistItem,
} from "@/lib/wishlist-store";

export type { WishlistItem };

type WishlistContextValue = {
  items: WishlistItem[];
  count: number;
  ready: boolean;
  has: (productId: string) => boolean;
  toggle: (item: WishlistItem) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { items, hydrated } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      count: items.length,
      ready: hydrated,
      has: (productId: string) => items.some((i) => i.productId === productId),
      toggle: toggleItem,
      remove: removeItem,
      clear: clearItems,
    }),
    [items, hydrated],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
