"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const TABS = [
  { key: "semua", label: "Semua" },
  { key: "tersedia", label: "Tersedia" },
  { key: "terjual", label: "Terjual" },
];

export default function ProductGrid({ products }) {
  const [tab, setTab] = useState("semua");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (tab === "tersedia" && p.sold) return false;
      if (tab === "terjual" && !p.sold) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [products, tab, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-tag border border-bone-200/15 bg-pine-900 p-1 font-mono text-xs">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-[2px] px-3 py-1.5 uppercase tracking-wide transition-colors ${
                tab === t.key
                  ? "bg-mustard-500 text-pine-950"
                  : "text-bone-200/60 hover:text-bone-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari cardigan..."
          className="w-full rounded-tag border border-bone-200/15 bg-pine-900 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-200/30 focus:outline-none focus:ring-1 focus:ring-mustard-500 sm:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center font-mono text-sm text-bone-200/40">
          Belum ada produk yang cocok.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
