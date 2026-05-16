import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { PORT, ALLOWED_ORIGIN, MODEL, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from './config.js';
import { handleChat } from './chat.js';
import { rateLimit } from './rateLimit.js';

const app = new Hono();

app.use('/*', cors({ origin: ALLOWED_ORIGIN }));

app.get('/health', (c) => c.json({ ok: true, model: MODEL }));

app.post('/chat', rateLimit, handleChat);

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`[server] listening on http://localhost:${info.port}`);
  console.log(`[server] model: ${MODEL}`);
  console.log(`[server] CORS origin: ${ALLOWED_ORIGIN}`);
  console.log(`[server] rate limit: ${RATE_LIMIT_MAX} req per ${RATE_LIMIT_WINDOW_MS}ms per IP`);
});
