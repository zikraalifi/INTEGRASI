export const PORT = Number.parseInt(process.env.PORT || '8787', 10);
export const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
export const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
export const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';
export const RATE_LIMIT_MAX = Number.parseInt(process.env.RATE_LIMIT_MAX || '5', 10);
export const RATE_LIMIT_WINDOW_MS = Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);

if (!ANTHROPIC_API_KEY) {
  console.error('[config] Missing ANTHROPIC_API_KEY.');
  console.error('[config] Copy .env.example to .env and fill in your Anthropic API key.');
  process.exit(1);
}
