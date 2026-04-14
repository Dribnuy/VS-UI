"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products } from "./products";
import type { CartItem, CartLine, CartState } from "./cart";
import { calcSubtotalUah, normalizeQty } from "./cart";

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  itemsCount: number;
  subtotalUah: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vs-aroma.cart";

function safeParse(raw: string | null): CartState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CartState;
    if (!data || !Array.isArray(data.lines)) return null;
    const lines = data.lines
      .filter((l): l is CartLine => Boolean(l && typeof l.productId === "string"))
      .map((l) => ({ productId: l.productId, qty: normalizeQty(Number((l as any).qty)) }));
    return { lines };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY));
    if (parsed) setLines(parsed.lines);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines } satisfies CartState));
  }, [lines]);

  const add = useCallback((productId: string, qty = 1) => {
    const q = normalizeQty(qty);
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (!existing) return [...prev, { productId, qty: q }];
      return prev.map((l) => (l.productId === productId ? { ...l, qty: normalizeQty(l.qty + q) } : l));
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const q = normalizeQty(qty);
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, qty: q } : l)));
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const items = useMemo<CartItem[]>(() => {
    return lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        if (!product) return null;
        const qty = normalizeQty(l.qty);
        return { product, qty, lineTotalUah: product.priceUah * qty };
      })
      .filter(Boolean) as CartItem[];
  }, [lines]);

  const itemsCount = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);
  const subtotalUah = useMemo(() => calcSubtotalUah(items), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ lines, items, itemsCount, subtotalUah, add, setQty, remove, clear }),
    [lines, items, itemsCount, subtotalUah, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

