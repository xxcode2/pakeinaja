"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, RefreshCw, Tag, X } from "lucide-react";

type FilterStatus = "all" | "available" | "sold";

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
  }>;
}

const FILTER_OPTIONS: { value: FilterStatus; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "Semua", icon: <Tag className="h-4 w-4" /> },
  { value: "available", label: "Tersedia", icon: <Filter className="h-4 w-4" /> },
  { value: "sold", label: "Terjual", icon: <X className="h-4 w-4" /> },
];

export default function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "name">("newest");

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (filter === "available") return !p.sold;
        if (filter === "sold") return p.sold;
        return true;
      })
      .filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "name": return a.name.localeCompare(b.name);
          default: return 0;
        }
      });
  }, [products, filter, searchQuery, sortBy]);

  const availableCount = products.filter((p) => !p.sold).length;
  const soldCount = products.filter((p) => p.sold).length;

  // Scroll progress for parallax effect
  const scrollY = useMotionValue(0);
  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const headerTranslateY = useTransform(scrollY, [0, 200], [0, 50]);

  return (
    <section className="w-full" aria-label="Product catalog">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ y: headerTranslateY }}
        className="mb-8 lg:mb-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] tracking-tight"
            >
              Koleksi Cardigan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 flex items-center gap-3 font-mono text-sm text-[var(--color-text-secondary)]"
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
                {availableCount} tersedia
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent-terracotta)]/15 text-[var(--color-accent-terracotta)]">
                {soldCount} terjual
              </span>
            </motion.p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="relative w-full sm:w-72"
          >
            <label htmlFor="search" className="sr-only">Cari produk</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" aria-hidden="true" />
              <input
                id="search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama produk..."
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all duration-200"
              />
            </div>
          </motion.div>
        </div>

        {/* Filter & Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3"
        >
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter status">
            {FILTER_OPTIONS.map(({ value, label, icon }) => (
              <motion.button
                key={value}
                onClick={() => setFilter(value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * FILTER_OPTIONS.indexOf({ value, label, icon }) }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  filter === value
                    ? "bg-[var(--color-brand)] text-[var(--color-text-inverse)] shadow-[var(--shadow-glow)]"
                    : "bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-brand)]/50 hover:text-[var(--color-text-primary)]"
                }`}
                aria-pressed={filter === value}
              >
                {icon}
                {label}
              </motion.button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Sort Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <label htmlFor="sort" className="sr-only">Urutkan</label>
            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none h-11 pl-4 pr-10 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="newest">Terbaru</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
        }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredProducts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-16 lg:py-24 px-4 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
            >
              <RefreshCw className="h-8 w-8" />
            </motion.div>
            <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
              Tidak ada produk ditemukan
            </h3>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              {searchQuery
                ? `Coba kata kunci lain atau hapus filter "${searchQuery}"`
                : filter !== "all"
                ? `Tidak ada produk dengan status ${FILTER_OPTIONS.find((f) => f.value === filter)?.label.toLowerCase()}`
                : "Belum ada produk ditambahkan"}
            </p>
            {(searchQuery || filter !== "all") && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSearchQuery(""); setFilter("all"); }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-hover)] transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Filter
              </motion.button>
            )}
          </motion.div>
        ) : (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
                exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
              }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Results Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center font-mono text-sm text-[var(--color-text-muted)]"
      >
        Menampilkan <span className="font-bold text-[var(--color-text-primary)]">{filteredProducts.length}</span> dari{" "}
        <span className="font-bold text-[var(--color-text-primary)]">{products.length}</span> produk
      </motion.p>
    </section>
  );
}