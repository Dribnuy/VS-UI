import { getProductsByCategory } from "@/src/lib/products";
import { ProductCard } from "@/src/components/ProductCard";

export default function SpraysPage() {
  const items = getProductsByCategory("sprays");
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-zinc-900">
            Catalog
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950">
            Sprays
          </h1>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

