import type { Product } from "./products";

export type CartLine = {
  productId: Product["id"];
  qty: number;
};

export type CartState = {
  lines: CartLine[];
};

export type CartItem = {
  product: Product;
  qty: number;
  lineTotalUah: number;
};

export function normalizeQty(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.max(1, Math.min(99, Math.floor(qty)));
}

export function calcSubtotalUah(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.lineTotalUah, 0);
}

