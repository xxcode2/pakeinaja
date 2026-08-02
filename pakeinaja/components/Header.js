import Link from "next/link";

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

export default function Header() {
  return (
    <header className="border-b border-bone-200/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-bone-50 sm:text-2xl">
            {brand}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-mustard-500">
            cardigan store
          </span>
        </Link>
        <Link
          href="/admin"
          className="font-mono text-[11px] uppercase tracking-wider text-bone-200/40 hover:text-bone-200/80"
        >
          admin
        </Link>
      </div>
    </header>
  );
}
