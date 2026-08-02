import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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

const tag = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-tag",
});

const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "PAKEINAJA";

export const metadata = {
  title: `${brand} — Cardigan enak dipake, harga bersahabat`,
  description:
    "Toko online cardigan. Lihat detail, cek stok, dan langsung tanya via WhatsApp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} ${tag.variable}`}>
      <body className="min-h-screen bg-pine-950">{children}</body>
    </html>
  );
}
