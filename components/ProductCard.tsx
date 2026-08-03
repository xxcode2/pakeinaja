"use client";

import Image from "next/image";
import Link from "next/link";
import { formatRupiah, buildWaLink } from "@/lib/whatsapp";
import { MessageCircle, Tag } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    photos: string[];
    sold: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryPhoto = product.photos?.[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const waLink = buildWaLink({
    productName: product.name,
    price: product.price,
    url: siteUrl ? `${siteUrl}/produk/${product.id}` : undefined,
  });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <Link href={`/produk/${product.id}`} className="relative block aspect-square overflow-hidden bg-[var(--color-bg-elevated)]">
        {primaryPhoto ? (
          <Image
            src={primaryPhoto}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={`object-cover transition-transform duration-300 ${
              product.sold ? "grayscale opacity-60" : "group-hover:scale-105"
            }`}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Tag className="h-8 w-8 text-[var(--color-text-muted)]/30" />
          </div>
        )}

        {product.sold && (
          <span className="absolute left-0 top-2 rounded-r-full bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
            Terjual
          </span>
        )}
      </Link>

      {/* Product Info */}
      <Link href={`/produk/${product.id}`} className="flex flex-1 flex-col gap-1 px-2.5 pb-2 pt-2">
        <h3 className="line-clamp-2 min-h-[2.5em] text-sm leading-snug text-[var(--color-text-primary)]">
          {product.name}
        </h3>
        <p className="font-display text-base font-bold text-[var(--color-brand)]">
          {formatRupiah(product.price)}
        </p>
      </Link>

      {/* Quick WhatsApp button - sibling of the Link, not nested inside it */}
      {!product.sold && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Tanya ${product.name} via WhatsApp`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-success)] text-white shadow-[var(--shadow-md)] transition-transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
      )}
    </article>
  );
}
