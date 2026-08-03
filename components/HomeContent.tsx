"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";

interface HomeContentProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
    createdAt: number;
  }>;
  brand: string;
}

export default function HomeContent({ products, brand }: HomeContentProps) {
  const available = products.filter((p) => !p.sold).length;
  const sold = products.filter((p) => p.sold).length;

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-36 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[var(--color-brand)]/5 blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[var(--color-accent-sage)]/5 blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-elevated)]/80 backdrop-blur-sm border border-[var(--color-border)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--color-brand)]"
            >
              <span className="relative flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-brand)]" />
              Baru saja ditambahkan
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)]"
            >
              Pake in aja,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-brand-light)] to-[var(--color-brand)] bg-clip-text text-transparent">
                  gausah pikir lama.
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-[var(--color-brand)]/30 -skew-y-2" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 max-w-xl mx-auto font-body text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed"
            >
              Pilih cardigan favoritmu, lihat detail fotonya, terus tinggal chat WhatsApp
              buat pastiin stok & ukurannya. Simpel, cepat, nyaman.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-brand)]">{available}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Tersedia</span>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent sm:h-16" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">{products.length}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Total Produk</span>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent sm:h-16" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-accent-terracotta)]">{sold}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Terjual</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a
                href="#koleksi"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-8 py-3.5 font-display text-base font-medium text-[var(--color-text-inverse)] shadow-[var(--shadow-lg)] hover:bg-[var(--color-brand-hover)] hover:shadow-[var(--shadow-xl)] transition-all duration-300"
              >
                Lihat Koleksi
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
              <a
                href="/admin"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/50 backdrop-blur-sm px-8 py-3.5 font-display text-base font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-brand)]/50 hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-all duration-300"
              >
                Kelola Produk
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Product Grid Section */}
      <section id="koleksi" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ProductGrid products={products} />
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-elevated)] border border-[var(--color-border)] p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[var(--color-brand)]/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-xl">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-6 inline-flex items-center justify-center h-16 w-16 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
              Siap belanja cardigan favoritmu?
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Klik produk yang kamu suka, lihat semua fotonya, terus chat WhatsApp
              buat konfirmasi stok & ukuran. Proses cepat, langsung ke toko.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <a
                href="#koleksi"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-8 py-3 font-display text-base font-medium text-[var(--color-text-inverse)] shadow-[var(--shadow-md)] hover:bg-[var(--color-brand-hover)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
              >
                Mulai Belanja
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}