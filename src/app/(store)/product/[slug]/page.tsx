import Link from "next/link";
import { getProductBySlug } from "@/src/lib/products";
import { ProductClient } from "./ProductClient";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-black/5 bg-white/60 p-8 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-zinc-700">Not found</div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950">
            Product not found
          </h1>
          <Link
            href="/"
            className="mt-6 inline-flex items-center rounded-full bg-pink-200 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-pink-300"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return <ProductClient product={product} />;
}

