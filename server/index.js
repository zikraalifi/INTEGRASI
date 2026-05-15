import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { PORT, ALLOWED_ORIGIN, MODEL } from './config.js';
import { handleChat } from './chat.js';

const app = new Hono();

app.use('/*', cors({ origin: ALLOWED_ORIGIN }));

app.get('/health', (c) => c.json({ ok: true, model: MODEL }));

app.post('/chat', handleChat);

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`[server] listening on http://localhost:${info.port}`);
  console.log(`[server] model: ${MODEL}`);
  console.log(`[server] CORS origin: ${ALLOWED_ORIGIN}`);
});
