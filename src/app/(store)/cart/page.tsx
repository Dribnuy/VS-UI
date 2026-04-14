"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/src/lib/cartContext";
import { useLanguage } from "@/src/lib/i18n";

export default function CartPage() {
  const { items, subtotalUah, itemsCount, setQty, remove, clear } = useCart();
  const { lang } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-zinc-900">
            Cart
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950">Your cart</h1>
          <p className="mt-2 text-sm text-zinc-700">{itemsCount} item(s)</p>
        </div>
        {items.length ? (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-black/5 hover:bg-white/80"
          >
            Clear
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-black/5 bg-white/60 p-8 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-zinc-700">Empty</div>
          <p className="mt-2 text-sm text-zinc-800">Add products to proceed to checkout.</p>
          <Link
            href="/perfumes"
            className="mt-6 inline-flex items-center rounded-full bg-pink-200 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-pink-300"
          >
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            {items.map((it) => (
              <div
                key={it.product.id}
                className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-white/60 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-full overflow-hidden rounded-2xl ring-1 ring-black/5 sm:h-20 sm:w-28">
                  <Image
                    src={it.product.images[0] ?? "/products/placeholder.jpg"}
                    alt={it.product.name[lang]}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <Link href={`/product/${it.product.slug}`} className="text-sm font-extrabold text-zinc-950 hover:underline">
                    {it.product.name[lang]}
                  </Link>
                  <div className="mt-1 text-xs text-zinc-700">
                    {it.product.volumeMl ? `${it.product.volumeMl} мл` : ""} • {it.product.priceUah.toLocaleString("uk-UA")} ₴
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={it.qty}
                    onChange={(e) => setQty(it.product.id, Number(e.target.value))}
                    className="h-10 w-20 rounded-2xl bg-white/70 px-3 text-sm font-semibold text-zinc-950 ring-1 ring-black/10"
                  />
                  <div className="w-28 text-right text-sm font-extrabold text-zinc-950">
                    {it.lineTotalUah.toLocaleString("uk-UA")} ₴
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(it.product.id)}
                    className="inline-flex items-center rounded-full bg-white/60 px-3 py-2 text-xs font-semibold text-zinc-900 ring-1 ring-black/5 hover:bg-white/80"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-black/5 bg-white/60 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-extrabold text-zinc-950">Summary</div>
            <div className="mt-4 flex items-center justify-between text-sm text-zinc-800">
              <span>Subtotal</span>
              <span className="font-extrabold text-zinc-950">{subtotalUah.toLocaleString("uk-UA")} ₴</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-zinc-700">
              Delivery cost is calculated by Nova Poshta and paid on delivery (MVP).
            </p>
            <Link
              href="/checkout"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-pink-200 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-pink-300"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

