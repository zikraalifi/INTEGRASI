import Anthropic from '@anthropic-ai/sdk';
import { streamSSE } from 'hono/streaming';
import { MODEL, ANTHROPIC_API_KEY } from './config.js';
import { SYSTEM_PROMPT } from './systemPrompt.js';

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const MAX_HISTORY_TURNS = 4;

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  const valid = [];
  for (const item of history) {
    if (!item || typeof item !== 'object') continue;
    if (item.role !== 'user' && item.role !== 'assistant') continue;
    if (typeof item.content !== 'string' || !item.content.trim()) continue;
    valid.push({ role: item.role, content: item.content });
  }
  return valid.slice(-MAX_HISTORY_TURNS);
}

export async function handleChat(c) {
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400);
  }

  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return c.json({ error: 'Field "message" (string, non-empty) is required.' }, 400);
  }
  if (message.length > 2000) {
    return c.json({ error: 'Message too long (max 2000 chars).' }, 400);
  }

  const history = sanitizeHistory(body.history);
  const messages = [...history, { role: 'user', content: message }];

  return streamSSE(c, async (stream) => {
    let apiStream;
    try {
      apiStream = client.messages.stream({
        model: MODEL,
        max_tokens: 500,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages,
      });

      apiStream.on('text', async (delta) => {
        await stream.writeSSE({
          event: 'delta',
          data: JSON.stringify({ text: delta }),
        });
      });

      const final = await apiStream.finalMessage();

      await stream.writeSSE({
        event: 'done',
        data: JSON.stringify({
          stop_reason: final.stop_reason,
          usage: final.usage,
        }),
      });

      const u = final.usage || {};
      console.log(
        `[chat] ok stop=${final.stop_reason} input=${u.input_tokens ?? 0} output=${u.output_tokens ?? 0} cache_read=${u.cache_read_input_tokens ?? 0} cache_write=${u.cache_creation_input_tokens ?? 0}`
      );
    } catch (err) {
      const status = err instanceof Anthropic.APIError ? err.status : 500;
      const msg =
        err instanceof Anthropic.APIError
          ? `Anthropic ${status}: ${err.message}`
          : err?.message || 'Unknown server error';
      console.error('[chat] error:', msg);
      await stream.writeSSE({
        event: 'error',
        data: JSON.stringify({ message: 'Untuk sementara, silakan hubungi admin di [+62 822 1900 8737](https://wa.me/6282219008737) untuk bertanya seputar GreenHade.' }),
      });
    }
  });
}
