# PAKEINAJA

Website jualan cardigan. Frontend + backend jadi satu (Next.js), tinggal deploy ke Vercel.

Fitur:
- Etalase produk (grid foto, cari, filter Tersedia/Terjual/Semua)
- Halaman detail produk: galeri foto (klik thumbnail ganti foto utama, klik foto utama buat zoom/lightbox)
- Tombol "Tanya via WhatsApp" — otomatis buka chat WA dengan nama & harga produk sudah terisi
- Halaman admin (`/admin`, dilindungi password): tambah produk + upload banyak foto sekaligus, edit, tandai Sold/Tersedia, hapus
- Export seluruh katalog produk ke file `.xlsx` (Excel) dari halaman admin

## 1. Cara jalanin di komputer sendiri (opsional, buat coba-coba dulu)

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Tapi sebelum fitur upload foto & simpan produk bisa jalan, kamu perlu isi environment variable dulu (lihat langkah 3 di bawah), baru jalankan:

```bash
vercel env pull .env.local
```

## 2. Deploy ke Vercel

1. Push folder ini ke repo GitHub (atau upload langsung lewat Vercel CLI: `vercel deploy`).
2. Di [vercel.com](https://vercel.com), klik **Add New Project**, pilih repo ini.
3. Biarkan setting default punya Next.js (Vercel otomatis detect), lalu klik **Deploy**.

Setelah project ke-deploy, lanjut ke langkah 3 — **tanpa ini, produk tidak akan tersimpan.**

## 3. Sambungkan storage (wajib, sekali saja)

Buka project kamu di dashboard Vercel:

1. **Tab "Storage" → Create Database → Blob**
   Ini buat nyimpen foto-foto produk. Setelah dibuat, hubungkan ke project ini — Vercel otomatis nambahin env var `BLOB_READ_WRITE_TOKEN`.

2. **Tab "Storage" → Create Database → pilih Redis (biasanya dari Upstash, via Marketplace)**
   Ini buat nyimpen data produk (nama, harga, status sold, dll). Setelah dibuat & dihubungkan, Vercel otomatis nambahin env var `KV_REST_API_URL` / `UPSTASH_REDIS_REST_URL` dan token-nya.

3. **Tab "Settings" → "Environment Variables"**, tambahkan manual:

   | Nama | Isi |
   |---|---|
   | `ADMIN_PASSWORD` | password buat masuk `/admin`, bebas tapi jangan gampang ditebak |
   | `NEXT_PUBLIC_WA_NUMBER` | nomor WhatsApp toko, format `62xxxxxxxxxx` (tanpa `+`, tanpa spasi/strip) |
   | `NEXT_PUBLIC_BRAND_NAME` | `PAKEINAJA` (atau ganti kalau mau) |
   | `NEXT_PUBLIC_SITE_URL` | URL website kamu setelah deploy, misal `https://pakeinaja.vercel.app` (dipakai buat nyertain link produk di pesan WA) |

4. Habis nambahin env var, klik **Deployments → titik tiga di deployment terakhir → Redeploy** biar env var-nya kepakai.

## 4. Pakai halaman admin

Buka `https://domain-kamu.vercel.app/admin`, masukin `ADMIN_PASSWORD` yang tadi kamu set.

- **+ Tambah produk** → isi nama, harga, deskripsi, upload foto (bisa banyak sekaligus) → Simpan.
- Klik badge **Tersedia/Sold** di daftar produk buat toggle status terjual.
- **Export .xlsx** → download semua data produk (nama, harga, status, jumlah foto, deskripsi) dalam satu file Excel, siap dibuka di laptop/HP.
- **edit** / **hapus** di tiap baris produk.

## Catatan keamanan

Sistem login admin ini sengaja dibuat sederhana (satu password, tanpa akun/role) supaya gampang dipakai sendiri. Cukup buat toko kecil yang dikelola sendiri. Kalau ke depannya butuh multi-admin atau lebih aman lagi, kabari — bisa dikembangkan pakai NextAuth atau sejenisnya.

## Struktur folder singkat

```
app/
  page.js              -> etalase (home)
  produk/[id]/page.js  -> halaman detail produk
  admin/page.js        -> dashboard admin
  admin/login/page.js  -> login admin
  api/                 -> semua backend (products, upload, admin login)
lib/
  kv.js         -> baca/tulis data produk (Redis/Upstash)
  auth.js       -> cek login admin
  whatsapp.js   -> format harga & bikin link WA
components/     -> semua komponen UI
```
