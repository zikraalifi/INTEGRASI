const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export async function* realChatStream(message, history = []) {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (response.status === 429) {
    const body = await response.json().catch(() => ({}));
    const err = new Error(body.error || 'Terlalu banyak permintaan. Coba lagi sebentar.');
    err.userFacing = true;
    throw err;
  }
  if (!response.ok || !response.body) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split('\n\n');
      buffer = events.pop() || '';

      for (const block of events) {
        if (!block.trim()) continue;
        let eventType = 'message';
        let dataLines = [];
        for (const line of block.split('\n')) {
          if (line.startsWith('event:')) eventType = line.slice(6).trim();
          else if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart());
        }
        const data = dataLines.join('\n');
        if (!data) continue;

        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          continue;
        }

        if (eventType === 'delta' && typeof parsed.text === 'string') {
          yield parsed.text;
        } else if (eventType === 'error') {
          throw new Error(parsed.message || 'Server error');
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
