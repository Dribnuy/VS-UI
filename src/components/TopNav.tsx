"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/lib/i18n";
import Image from "next/image";

function NavLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-pink-400 text-zinc-950"
          : "bg-pink-200 text-zinc-950 hover:bg-pink-300 dark:bg-pink-200/90 dark:text-zinc-950 dark:hover:bg-pink-300/90",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </Link>
  );
}

export function TopNav() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b p-4 border-black/5 bg-pink-200 backdrop-blur dark:bg-pink-300">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex items-center gap-3">
           
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wide text-zinc-950 dark:text-zinc-50">
              VS AROMA SHOP
            </div>
           
          </div>
        </Link>

        <nav   className="hidden items-center gap-2 sm:flex">
          <NavLink href="/perfumes" label={t("perfumes")} className="bg-pink-100" />
          <NavLink href="/sprays" label={t("sprays")} className="bg-pink-100" />
          <NavLink href="/lotions" label={t("lotions")} className="bg-pink-100" />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden">
            <NavLink href="/perfumes" label={t("perfumes")} />
          </div>

          <div className="inline-flex rounded-full bg-white/60 p-1 ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10">
            <button
              type="button"
              onClick={() => setLang("uk")}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                lang === "uk"
                  ? "bg-pink-200 text-zinc-950"
                  : "text-zinc-700 hover:bg-pink-100 dark:text-zinc-200 dark:hover:bg-white/10",
              ].join(" ")}
            >
              УКР
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                lang === "en"
                  ? "bg-pink-200 text-zinc-950"
                  : "text-zinc-700 hover:bg-pink-100 dark:text-zinc-200 dark:hover:bg-white/10",
              ].join(" ")}
            >
              ENG
            </button>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 pb-3 sm:hidden">
        <NavLink href="/sprays" label={t("sprays")} />
        <NavLink href="/lotions" label={t("lotions")} />
      </nav>
    </header>
  );
}

