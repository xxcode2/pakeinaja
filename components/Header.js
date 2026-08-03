"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, Search, Store } from "lucide-react";

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

export default function Header({
  onSearch,
  initialQuery = "",
}: {
  onSearch?: (q: string) => void;
  initialQuery?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const isHome = pathname === "/";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(query ? `/?q=${encodeURIComponent(query)}` : "/");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-brand)]">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-1.5">
            <Store className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {brand}
            </span>
          </Link>

          <form onSubmit={handleSubmit} className="relative hidden flex-1 max-w-md sm:block">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari cardigan di sini..."
              className="h-9 w-full rounded-md border-none bg-white pl-3 pr-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center text-[var(--color-brand)]"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center gap-1">
            <Link
              href="/keranjang"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
              aria-label="Keranjang belanja"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link
              href="/admin"
              className="hidden shrink-0 rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/80 hover:bg-white/10 sm:block"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Search bar - mobile row */}
        <form onSubmit={handleSubmit} className="relative pb-2.5 sm:hidden">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari cardigan di sini..."
            className="h-9 w-full rounded-md border-none bg-white pl-3 pr-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            aria-label="Cari"
            className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center text-[var(--color-brand)]"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
