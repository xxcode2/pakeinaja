const KEY = "pakeinaja:products";

// Use Upstash REST API if available (Vercel KV), otherwise fallback to ioredis with REDIS_URL
const useRestApi = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;

let redisClient = null;

async function getRedisClient() {
  if (useRestApi) return null; // We'll use REST API directly

  if (!redisClient) {
    const Redis = (await import("ioredis")).default;
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("REDIS_URL not set in environment variables");
    redisClient = new Redis(url, { maxRetriesPerRequest: 3 });
  }
  return redisClient;
}

async function kvRequest(method, path, body) {
  const baseUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!baseUrl || !token) {
    // Missing KV config – fail silently for build / preview
    return null;
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
  try {
    if (useRestApi) {
      const data = await kvRequest("GET", `/get/${KEY}`);
      return data?.result ? JSON.parse(data.result) : [];
    }

    const client = await getRedisClient();
    const raw = await client.get(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("[kv] readAll error:", e);
    return [];
  }
}

async function writeAll(all) {
  try {
    if (useRestApi) {
      await kvRequest("POST", `/set/${KEY}`, JSON.stringify(all));
      return;
    }

    const client = await getRedisClient();
    await client.set(KEY, JSON.stringify(all));
  } catch (e) {
    console.error("[kv] writeAll error:", e);
  }
}

function slugId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function getAllProducts() {
  try {
    const all = await readAll();
    return Array.isArray(all) ? [...all].sort((a, b) => b.createdAt - a.createdAt) : [];
  } catch (e) {
    console.error("[kv] getAllProducts error:", e);
    return [];
  }
}

export async function getProduct(id) {
  try {
    const all = await readAll();
    return Array.isArray(all) ? all.find((p) => p.id === id) || null : null;
  } catch (e) {
    console.error("[kv] getProduct error:", e);
    return null;
  }
}

export async function createProduct(input) {
  try {
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
  } catch (e) {
    console.error("[kv] createProduct error:", e);
    throw e;
  }
}

export async function updateProduct(id, patch) {
  try {
    const all = await readAll();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...patch, id: all[idx].id, createdAt: all[idx].createdAt };
    await writeAll(all);
    return all[idx];
  } catch (e) {
    console.error("[kv] updateProduct error:", e);
    return null;
  }
}

export async function deleteProduct(id) {
  try {
    const all = await readAll();
    const next = all.filter((p) => p.id !== id);
    await writeAll(next);
    return next.length !== all.length;
  } catch (e) {
    console.error("[kv] deleteProduct error:", e);
    return false;
  }
}