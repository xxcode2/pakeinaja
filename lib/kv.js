import Redis from "ioredis";

const KEY = "pakeinaja:products";

// Simpan koneksi di global supaya tidak buka koneksi baru tiap request
// di lingkungan serverless (Vercel function reuse antar invocation).
const globalForRedis = globalThis;

function getClient() {
  if (!globalForRedis._pakeinajaRedis) {
    if (!process.env.REDIS_URL) {
      throw new Error("REDIS_URL belum diisi di environment variables.");
    }
    globalForRedis._pakeinajaRedis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
    });
  }
  return globalForRedis._pakeinajaRedis;
}

async function readAll() {
  const client = getClient();
  const raw = await client.get(KEY);
  return raw ? JSON.parse(raw) : [];
}

async function writeAll(all) {
  const client = getClient();
  await client.set(KEY, JSON.stringify(all));
}

function slugId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function getAllProducts() {
  const all = await readAll();
  return [...all].sort((a, b) => b.createdAt - a.createdAt);
}

export async function getProduct(id) {
  const all = await readAll();
  return all.find((p) => p.id === id) || null;
}

export async function createProduct(input) {
  const all = await readAll();
  const product = {
    id: slugId(),
    name: input.name,
    price: Number(input.price) || 0,
    description: input.description || "",
    photos: input.photos || [],
    sold: false,
    createdAt: Date.now(),
  };
  all.push(product);
  await writeAll(all);
  return product;
}

export async function updateProduct(id, patch) {
  const all = await readAll();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, id: all[idx].id, createdAt: all[idx].createdAt };
  await writeAll(all);
  return all[idx];
}

export async function deleteProduct(id) {
  const all = await readAll();
  const next = all.filter((p) => p.id !== id);
  await writeAll(next);
  return next.length !== all.length;
}
