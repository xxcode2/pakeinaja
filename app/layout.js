import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import ToastContainer from "@/components/ToastContainer";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

export const metadata = {
  title: `${brand} — Cardigan enak dipake, harga bersahabat`,
  description: "Toko online cardigan. Lihat detail, cek stok, dan langsung tanya via WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[var(--color-bg)]">
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}