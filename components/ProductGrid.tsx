"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { ChevronDown } from "lucide-react";

type FilterStatus = "all" | "available" | "sold";

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
    createdAt: number;
  }>;
  searchQuery?: string;
}

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "available", label: "Tersedia" },
  { value: "sold", label: "Terjual" },
];

export default function ProductGrid({ products, searchQuery = "" }: ProductGridProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (filter === "available") return !p.sold;
        if (filter === "sold") return p.sold;
        return true;
      })
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return b.createdAt - a.createdAt;
      });
  }, [products, filter, searchQuery, sortBy]);

  const availableCount = products.filter((p) => !p.sold).length;

  return (
    <section className="w-full" aria-label="Katalog produk">
      <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] pb-3">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter status">
          {FILTER_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                filter === value
                  ? "bg-[var(--color-brand)] text-white"
                  : "bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
              }`}
              aria-pressed={filter === value}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-8 appearance-none rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] pl-3 pr-8 font-mono text-xs text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]"
          >
            <option value="newest">Terbaru</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-text-muted)]" />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <p className="font-display text-base font-semibold text-[var(--color-text-primary)]">
            Produk tidak ditemukan
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {searchQuery
              ? `Coba kata kunci lain selain "${searchQuery}"`
              : "Belum ada produk di kategori ini."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="mt-6 text-center font-mono text-xs text-[var(--color-text-muted)]">
        {availableCount} produk tersedia dari {products.length} total
      </p>
    </section>
  );
}
