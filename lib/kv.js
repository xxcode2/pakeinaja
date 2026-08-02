const KEY = "pakeinaja:products";

async function kvRequest(method, path, body) {
  const baseUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!baseUrl || !token) {
    throw new Error("Redis env vars not set: KV_REST_API_URL / KV_REST_API_TOKEN");
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`KV request failed: ${res.status} ${err}`);
  }

  return res.json();
}

async function readAll() {
  const data = await kvRequest("GET", `/get/${KEY}`);
  return data.result ? JSON.parse(data.result) : [];
}

async function writeAll(all) {
  await kvRequest("POST", `/set/${KEY}`, JSON.stringify(all));
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