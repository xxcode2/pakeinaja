import { Redis } from "@upstash/redis";

const kv = Redis.fromEnv();

const KEY = "pakeinaja:products";

function slugId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function getAllProducts() {
  const data = await kv.get(KEY);
  if (!data) return [];
  // newest first
  return [...data].sort((a, b) => b.createdAt - a.createdAt);
}

export async function getProduct(id) {
  const all = await getAllProducts();
  return all.find((p) => p.id === id) || null;
}

export async function createProduct(input) {
  const all = (await kv.get(KEY)) || [];
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
  await kv.set(KEY, all);
  return product;
}

export async function updateProduct(id, patch) {
  const all = (await kv.get(KEY)) || [];
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, id: all[idx].id, createdAt: all[idx].createdAt };
  await kv.set(KEY, all);
  return all[idx];
}

export async function deleteProduct(id) {
  const all = (await kv.get(KEY)) || [];
  const next = all.filter((p) => p.id !== id);
  await kv.set(KEY, next);
  return next.length !== all.length;
}
