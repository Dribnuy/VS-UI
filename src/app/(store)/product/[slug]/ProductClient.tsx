"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/src/lib/products";
import { useLanguage } from "@/src/lib/i18n";
import { useCart } from "@/src/lib/cartContext";

export function ProductClient({ product }: { product: Product }) {
  const { lang } = useLanguage();
  const { add } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  const images = product.images.length ? product.images : ["/products/placeholder.jpg"];
  const activeSrc = images[Math.min(activeImage, images.length - 1)]!;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href={`/${product.category}`} className="text-sm font-semibold text-zinc-700 hover:underline">
          ← Back to {product.category}
        </Link>
        {!product.inStock ? (
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">
            Out of stock
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl bg-white/70 ring-1 ring-black/5">
            <div className="relative aspect-4/3 w-full">
              <Image
                src={activeSrc}
                alt={product.name[lang]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-auto pb-1">
              {images.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={[
                    "relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 transition",
                    idx === activeImage ? "ring-pink-400" : "ring-black/10 hover:ring-pink-300",
                  ].join(" ")}
                  aria-label={`Image ${idx + 1}`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-zinc-900">
            VS AROMA SHOP
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            {product.name[lang]}
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-800">{product.description[lang]}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-white/60 px-4 py-3 ring-1 ring-black/5">
              <div className="text-xs font-semibold text-zinc-700">Price</div>
              <div className="text-xl font-extrabold text-zinc-950">
                {product.priceUah.toLocaleString("uk-UA")} ₴
              </div>
            </div>

            {product.volumeMl ? (
              <div className="rounded-2xl bg-white/60 px-4 py-3 ring-1 ring-black/5">
                <div className="text-xs font-semibold text-zinc-700">Volume</div>
                <div className="text-xl font-extrabold text-zinc-950">{product.volumeMl} мл</div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 rounded-3xl border border-black/5 bg-white/60 p-4 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-zinc-950">Add to cart</div>
            <button
              type="button"
              onClick={() => add(product.id, 1)}
              disabled={!product.inStock}
              className={[
                "mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-zinc-950 transition",
                product.inStock ? "bg-pink-200 hover:bg-pink-300" : "bg-zinc-200 opacity-70",
              ].join(" ")}
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </button>
            <Link
              href="/cart"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-white/60 px-5 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-black/5 hover:bg-white/80"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

