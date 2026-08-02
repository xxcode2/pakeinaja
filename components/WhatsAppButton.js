"use client";

import { motion, useState } from "framer-motion";
import { formatRupiah, buildWaLink } from "@/lib/whatsapp";
import { MessageSquare, Check, Loader2, ExternalLink, Tag } from "lucide-react";

interface WhatsAppButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    sold: boolean;
  };
  siteUrl: string;
}

export default function WhatsAppButton({ product, siteUrl }: WhatsAppButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const waLink = buildWaLink({
    productName: product.name,
    price: product.price,
    url: siteUrl ? `${siteUrl}/produk/${product.id}` : undefined,
  });

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (product.sold) {
      e.preventDefault();
      return;
    }

    setState("loading");
    try {
      await navigator.clipboard.writeText(waLink);
      setCopied(true);
      setState("success");
      setTimeout(() => { setState("idle"); setCopied(false); }, 3000);
    } catch {
      setState("idle");
    }
  };

  if (product.sold) {
    return (
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl border-2 border-[var(--color-accent-terracotta)]/30 bg-[var(--color-accent-terracotta)]/10 px-8 py-4 font-display text-base font-medium text-[var(--color-accent-terracotta)] cursor-not-allowed"
        aria-disabled="true"
      >
        <Tag className="h-5 w-5" />
        <span>Sudah Terjual</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-[var(--color-accent-terracotta)]"
        />
      </motion.a>
    );
  }

  return (
    <motion.a
      ref={(el) => { if (el) el.href = waLink; }}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: "var(--shadow-xl)" }}
      whileTap={{ scale: 0.98 }}
      className="relative group w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-dark)] px-8 py-4 font-display text-base font-medium text-[var(--color-text-inverse)] shadow-[var(--shadow-lg)] overflow-hidden"
      aria-label={`Chat WhatsApp untuk ${product.name}`}
    >
      {/* Shine effect */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
      />

      {/* Icon */}
      <motion.span
        animate={{
          rotate: state === "loading" ? 360 : 0,
          scale: state === "success" ? [1, 1.3, 1] : 1
        }}
        transition={{
          rotate: { duration: 1, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.3 }
        }}
        className="flex h-5 w-5 items-center justify-center"
      >
        {state === "loading" ? (
          <Loader2 className="h-5 w-5" />
        ) : state === "success" ? (
          <Check className="h-5 w-5 text-[var(--color-success)]" />
        ) : (
          <MessageSquare className="h-5 w-5" />
        )}
      </motion.span>

      {/* Text */}
      <motion.span
        animate={{
          x: state === "success" ? [0, -5, 0] : 0
        }}
        className="font-display text-base font-medium"
      >
        {state === "loading" ? "Menyiapkan..." : state === "success" ? "Link Disalin!" : "Tanya via WhatsApp"}
      </motion.span>

      {/* External link icon */}
      <motion.span
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ExternalLink className="h-4 w-4" />
      </motion.span>

      {/* Copied tooltip */}
      {state === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--color-success)] px-3 py-1.5 text-[var(--color-text-inverse)] font-mono text-xs shadow-[var(--shadow-lg)] whitespace-nowrap"
        >
          <Check className="h-3.5 w-3.5" />
          Link WhatsApp disalin
        </motion.div>
      )}

      {/* Price badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute -right-3 top-1/2 -translate-y-1/2 hidden sm:block rounded-[var(--radius-full)] bg-[var(--color-text-inverse)]/20 backdrop-blur-sm px-3 py-1 font-mono text-xs text-[var(--color-text-inverse)]"
      >
        {formatRupiah(product.price)}
      </motion.div>
    </motion.a>
  );
}