"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/whatsapp";
import { ShoppingBag, Tag, Eye } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const primaryPhoto = product.photos?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -8, boxShadow: "var(--shadow-xl)" }}
      className="group relative flex flex-col h-full bg-[var(--color-bg-card)] rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden transition-all duration-500 hover:border-[var(--color-brand)]/30"
    >
      {/* Product Image */}
      <Link
        href={`/produk/${product.id}`}
        className="relative aspect-square overflow-hidden bg-[var(--color-bg-elevated)]"
        aria-label={`Lihat ${product.name}`}
      >
        {primaryPhoto ? (
          <Image
            src={primaryPhoto}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Tag className="h-12 w-12 text-[var(--color-text-muted)]/30" />
          </div>
        )}

        {/* Sold Badge */}
        {product.sold && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="absolute left-3 top-3 z-10"
          >
            <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-full)] bg-[var(--color-accent-terracotta)]/95 backdrop-blur-sm px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--color-text-inverse)] shadow-[var(--shadow-md)]">
              Terjual
            </span>
          </motion.div>
        )}

        {/* Quick View / Add to Cart Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute inset-0 flex items-end justify-center gap-3 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] shadow-[var(--shadow-md)] hover:bg-[var(--color-brand-hover)] transition-colors"
            aria-label="Beli via WhatsApp"
          >
            <ShoppingBag className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white shadow-[var(--shadow-md)] hover:bg-white/20 transition-colors"
            aria-label="Lihat detail"
          >
            <Eye className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4 gap-3">
        <div>
          <Link
            href={`/produk/${product.id}`}
            className="font-display text-base font-semibold text-[var(--color-text-primary)] line-clamp-1 group-hover:text-[var(--color-brand)] transition-colors duration-200"
          >
            {product.name}
          </Link>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
            Cardigan
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
          <motion.span
            className="font-display text-lg font-bold text-[var(--color-brand)]"
          >
            {formatRupiah(product.price)}
          </motion.span>

          <Link
            href={`/produk/${product.id}`}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-transparent px-3 py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
          >
            Detail
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}