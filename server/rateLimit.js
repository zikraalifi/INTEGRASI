import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from './config.js';

const buckets = new Map();
let lastSweep = Date.now();

function getClientIp(c) {
  const xff = c.req.header('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = c.req.header('x-real-ip');
  if (real) return real.trim();
  return c.env?.incoming?.socket?.remoteAddress || 'unknown';
}

function sweep(now) {
  if (now - lastSweep < RATE_LIMIT_WINDOW_MS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  lastSweep = now;
}

export async function rateLimit(c, next) {
  const ip = getClientIp(c);
  const now = Date.now();
  sweep(now);

  let bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    buckets.set(ip, bucket);
  }

  bucket.count += 1;
  const remaining = Math.max(0, RATE_LIMIT_MAX - bucket.count);
  const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);

  c.header('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
  c.header('X-RateLimit-Remaining', String(remaining));
  c.header('X-RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)));

  if (bucket.count > RATE_LIMIT_MAX) {
    c.header('Retry-After', String(retryAfter));
    console.warn(`[rate-limit] blocked ip=${ip} count=${bucket.count}`);
    return c.json(
      { error: `Terlalu banyak permintaan. Coba lagi dalam ${retryAfter} detik.` },
      429
    );
  }

  await next();
}
