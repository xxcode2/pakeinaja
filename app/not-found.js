import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-brick-500">
        404
      </p>
      <h1 className="font-display text-2xl font-bold text-bone-50">
        Produknya kayaknya udah gaada.
      </h1>
      <Link href="/" className="font-mono text-sm text-mustard-500 underline">
        Balik ke etalase
      </Link>
    </main>
  );
}
