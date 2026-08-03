"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Store } from "lucide-react";

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navBlur = useTransform(scrollY, [0, 50], [0, 16]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        opacity: navOpacity,
        backdropFilter: `blur(${navBlur}px)`,
        WebkitBackdropFilter: `blur(${navBlur}px)`,
      }}
      className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/90 border-b border-[var(--color-border)] shadow-[var(--shadow-md)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 lg:h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label={`${brand} - Home`}
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-dark)] shadow-[var(--shadow-glow)]"
              aria-hidden="true"
            >
              <Store className="h-5 w-5 text-[var(--color-text-inverse)]" />
            </motion.div>
            <div className="hidden sm:block">
              <motion.span
                whileHover={{ x: 4 }}
                className="font-display text-xl font-bold tracking-tight text-[var(--color-text-primary)]"
              >
                {brand}
              </motion.span>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-brand)]">
                cardigan store
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            <Link
              href="/"
              className="font-mono text-sm uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[var(--color-brand)] after:transition-width hover:after:w-full"
            >
              Koleksi
            </Link>
            <Link
              href="/admin"
              className="font-mono text-sm uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors duration-200"
            >
              Admin
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <Link
              href="/keranjang"
              className="relative p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-all duration-200 group"
              aria-label="Keranjang belanja"
            >
              <ShoppingBag className="h-5 w-5" />
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 min-w-[18px] items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-text-inverse)] font-mono text-[10px] font-bold"
              >
                0
              </motion.span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0, paddingTop: mobileOpen ? 12 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] pb-4"
        >
          <div className="flex flex-col gap-2 px-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl font-mono text-sm uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
            >
              Koleksi
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl font-mono text-sm uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
            >
              Admin
            </Link>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}