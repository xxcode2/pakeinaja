"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import WhatsAppButton from "@/components/WhatsAppButton";

interface ProductContentProps {
  product: {
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
    description?: string;
    createdAt: number;
  };
  siteUrl: string;
  brand: string;
}

export default function ProductContent({ product, siteUrl, brand }: ProductContentProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--color-text-muted)]">
              <li>
                <a href="/" className="flex items-center gap-1.5 hover:text-[var(--color-brand)] transition-colors">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="#koleksi" className="hover:text-[var(--color-brand)] transition-colors">Koleksi</a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[var(--color-text-primary)] font-medium truncate max-w-[200px]">
                {product.name}
              </li>
            </ol>
          </motion.nav>

          {/* Product Layout */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Gallery Column */}
            <div className="lg:col-span-7">
              <Gallery photos={product.photos} name={product.name} sold={product.sold} />
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="sticky top-24 lg:top-28 space-y-6"
              >
                {/* Product Header */}
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)]/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--color-brand)]">
                    {brand}
                  </span>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight text-[var(--color-text-primary)]"
                  >
                    {product.name}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-4 flex items-baseline gap-4"
                  >
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-brand)]">
                      {product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                    </span>
                    {product.sold && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent-terracotta)]/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--color-accent-terracotta)]">
                        Terjual
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Description */}
                {product.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)]"
                  >
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                      Deskripsi
                    </h3>
                    <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)] whitespace-pre-line">
                      {product.description}
                    </div>
                  </motion.div>
                )}

                {/* WhatsApp Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <WhatsAppButton product={product} siteUrl={siteUrl} />
                </motion.div>

                {/* Product Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                    Detail Produk
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-[var(--color-text-secondary)]">Status</dt>
                      <dd className="font-medium text-[var(--color-text-primary)]">
                        {product.sold ? "Terjual" : "Tersedia"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[var(--color-text-secondary)]">Harga</dt>
                      <dd className="font-display font-bold text-[var(--color-brand)]">
                        {product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[var(--color-text-secondary)]">ID Produk</dt>
                      <dd className="font-mono text-xs text-[var(--color-text-muted)]">{product.id}</dd>
                    </div>
                  </dl>
                </motion.div>

                {/* Share Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                    Bagikan Produk
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="flex items-center gap-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all duration-200"
                      onClick={() => navigator.clipboard.writeText(`${siteUrl}/produk/${product.id}`)}
                      aria-label="Salin link produk"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Salin Link
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - ${product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })} ${siteUrl}/produk/${product.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-[var(--color-brand)]/15 border border-[var(--color-brand)]/30 px-4 py-2 text-sm font-medium text-[var(--color-brand)] hover:bg-[var(--color-brand)]/25 transition-all duration-200"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01.39-3.275L18.03 3.903a9.865 9.865 0 011.91 4.155l-1.679 4.946c-.248.73-.61 1.443-.922 1.948l-.518.818-3.917 1.378a1.003 1.003 0 01-1.088-.174l-.633-.732c-.272-.315-.645-.844-.799-1.185a12.062 12.062 0 01.068-2.156 12.062 12.062 0 011.465-2.217l.807-1.05 1.337-.986c.689-.509 1.144-1.28 1.255-1.638.099-.314.049-.597-.149-.849-.198-.25-.52-.371-.866-.273-.347.099-.62.273-.844.497-.223.224-.668.944-.52 2.084.063.374.404.75.404 2.293 0 2.04-1.877 2.665-2.089 2.759-.148.063-1.546.598-3.175 1.094-.631.198-1.275.297-1.578.297-.273 0-.546-.075-.77-.224m13.5-6.907c0 .3-.042.498-.198.62-.157.124-.47.124-.817-.037l-2.915-1.344a34.022 34.022 0 00-1.48-.695c-.498-.15-1.087-.015-1.403.321-.315.315-.767.792-1.04 1.144-.272.348-.373.488-.522.488h-.549c-.273 0-.471-.049-.522-.374-.124-.273-.037-.742.223-.979.273-.248 1.118-.966 1.243-1.065.124-.1.124-.249.05-.399l-2.594-6.586c-.05-.124-.05-.174-.05-.248 0-.323.124-.72.522-.979.273-.248.497-.373.82-.373h.77c.273 0 .62.1.844.398.124.173.248.487.198.766-.05.223-.05.497-.05.742 0 1.558 1.317 2.147 2.666 2.52l4.903 1.073c.423.075.792-.05.99-.248.198-.198.198-.498.05-.748-.149-.273-.57-.422-.917-.422h-.742z" />
                      </svg>
                      Share
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}