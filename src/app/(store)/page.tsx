export default function Home() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-black/5 bg-white/60 p-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-zinc-900 dark:bg-white/10 dark:text-zinc-100">
          VS AROMA SHOP
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
          Pink theme + language switcher
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-950 ">
          Перемикай мову у верхньому меню. Навігація веде на сторінки
          “Парфуми”, “Спреї”, “Лосьйони”.
        </p>

        
      </div>
    </section>
  );
}
