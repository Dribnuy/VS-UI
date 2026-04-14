"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/lib/i18n";
import type { Product } from "@/src/lib/products";

function Tag({ tag }: { tag: NonNullable<Product["tags"]>[number] }) {
  const text =
    tag === "new" ? "NEW" : tag === "hit" ? "HIT" : tag === "sale" ? "SALE" : tag;
  const cls =
    tag === "new"
      ? "bg-pink-200 text-zinc-950"
      : tag === "hit"
        ? "bg-zinc-900 text-white"
        : "bg-white text-zinc-900";

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${cls}`}>
      {text}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useLanguage();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-3xl border border-black/5 bg-white/60 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-extrabold tracking-tight text-zinc-950">
            {product.name[lang]}
          </div>
          <div className="mt-1 text-xs text-zinc-700">
            {product.volumeMl ? `${product.volumeMl} мл` : ""}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {product.tags?.slice(0, 2).map((t) => <Tag key={t} tag={t} />)}
          {!product.inStock ? (
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700">
              OUT
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl bg-white/70 ring-1 ring-black/5">
        <div className="relative aspect-4/3 w-full">
          <Image
            src={product.images[0] ?? "/products/placeholder.jpg"}
            alt={product.name[lang]}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="line-clamp-2 text-xs leading-5 text-zinc-800">
          {product.description[lang]}
        </p>
        <div className="shrink-0 text-sm font-extrabold text-zinc-950">
          {product.priceUah.toLocaleString("uk-UA")} ₴
        </div>
      </div>
    </Link>
  );
}

