"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Gagal masuk.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-tag border border-bone-200/15 bg-pine-900 p-6"
      >
        <h1 className="font-display text-lg font-bold text-bone-50">
          Masuk admin PAKEINAJA
        </h1>
        <p className="mt-1 font-mono text-xs text-bone-200/40">
          khusus buat kelola produk
        </p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-5 w-full rounded-tag border border-bone-200/15 bg-pine-950 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-200/30 focus:outline-none focus:ring-1 focus:ring-mustard-500"
        />

        {error && <p className="mt-2 font-mono text-xs text-brick-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-tag bg-mustard-500 py-2.5 font-display text-sm font-medium text-pine-950 transition-colors hover:bg-mustard-400 disabled:opacity-50"
        >
          {loading ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </main>
  );
}
