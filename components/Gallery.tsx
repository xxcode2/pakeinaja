"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand, MessageSquare, Share2, Heart, Truck, RotateCcw, Shield, Sparkles } from "lucide-react";

interface GalleryProps {
  photos: string[];
  name: string;
  sold: boolean;
}

export default function Gallery({ photos, name, sold }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
    if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % photos.length);
    if (e.key === "Escape") setLightboxOpen(false);
  };

  return (
    <>
      {/* Main Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-24 lg:top-28 z-10"
      >
        <div className="relative aspect-square rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-lg)]">
          {photos.length > 0 ? (
            <>
              {/* Main Image */}
              <motion.button
                onClick={() => setLightboxOpen(true)}
                className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
                aria-label={`Buka galeri ${name}`}
              >
                <Image
                  src={photos[activeIndex]}
                  alt={`${name} - Foto ${activeIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition-transform duration-500 ${sold ? "grayscale opacity-60" : ""}`}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </motion.button>

              {/* Sold Overlay */}
              {sold && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-6"
                  >
                    <div className="inline-flex items-center gap-3 rounded-[var(--radius-full)] bg-[var(--color-accent-terracotta)]/95 backdrop-blur-sm px-6 py-3 font-mono text-sm uppercase tracking-wider text-[var(--color-text-inverse)] shadow-[var(--shadow-xl)]">
                      <span className="relative flex h-8 w-8 items-center justify-center">
                        <Truck className="h-5 w-5" />
                        <motion.span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white" />
                      </span>
                      Sudah Terjual
                    </div>
                    <p className="mt-3 text-[var(--color-text-secondary)]">Produk ini sudah dibeli pembeli lain</p>
                  </motion.div>
                </div>
              )}

              {/* Photo Counter */}
              {photos.length > 1 && (
                <div className="absolute bottom-3 right-3 z-10">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-full)] bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-sm font-medium"
                  >
                    <span>{activeIndex + 1}</span>
                    <span className="text-[var(--color-text-muted)]">/</span>
                    <span>{photos.length}</span>
                  </motion.div>
                </div>
              )}

              {/* Zoom Hint */}
              <div className="absolute bottom-3 left-3 z-10">
                <div className="inline-flex items-center gap-1.5 rounded-[var(--radius-full)] bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-xs">
                  <Expand className="h-3.5 w-3.5" />
                  <span>Klik untuk zoom</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">
              <div className="text-center p-8">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <Sparkles className="h-8 w-8" />
                </div>
                <p className="font-medium">Belum ada foto</p>
                <p className="text-sm mt-1">Tambah foto di admin panel</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide pb-2"
            role="tablist"
            aria-label="Foto produk"
          >
            {photos.map((src, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius-lg)] border-2 transition-all duration-300 ${
                  i === activeIndex
                    ? "border-[var(--color-brand)] shadow-[var(--shadow-glow)]"
                    : "border-transparent hover:border-[var(--color-border)]"
                }`}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Foto ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${name} - Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {i === activeIndex && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-end justify-end p-1"
                  >
                    <div className="h-4 w-4 rounded-full bg-[var(--color-brand)]" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-[var(--color-text-muted)]"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--color-success)]" />
            <span>Garansi Asli</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-[var(--color-brand)]" />
            <span>Kirim Cepat</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-[var(--color-accent-sage)]" />
            <span>Retur Mudah</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri foto ${name}`}
        >
          {/* Close Button */}
          <motion.button
            onClick={() => { setLightboxOpen(false); setZoom(1); }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            aria-label="Tutup galeri"
          >
            <X className="h-6 w-6" />
          </motion.button>

          {/* Navigation */}
          {photos.length > 1 && (
            <>
              <motion.button
                onClick={() => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
              <motion.button
                onClick={() => setActiveIndex((i) => (i + 1) % photos.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </>
          )}

          {/* Image */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[85vh] max-w-[90vw]"
          >
            <Image
              src={photos[activeIndex]}
              alt={`${name} - Foto ${activeIndex + 1}`}
              width={1200}
              height={1200}
              className={`object-contain ${sold ? "grayscale opacity-60" : ""}`}
              style={{ transform: `scale(${zoom})` }}
            />
          </motion.div>

          {/* Zoom Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-[var(--radius-full)] bg-black/60 backdrop-blur-sm px-4 py-2 text-white"
          >
            <motion.button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              disabled={zoom <= 0.5}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom out"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </motion.button>
            <span className="font-mono text-sm px-2">{Math.round(zoom * 100)}%</span>
            <motion.button
              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
              disabled={zoom >= 3}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Zoom in"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </motion.button>
          </motion.div>

          {/* Thumbnails in Lightbox */}
          {photos.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto scrollbar-hide px-4"
            >
              {photos.map((src, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setActiveIndex(i); setZoom(1); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] border-2 transition-all ${
                    i === activeIndex
                      ? "border-[var(--color-brand)]"
                      : "border-transparent hover:border-white/20"
                  }`}
                  aria-label={`Foto ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : "false"}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
}