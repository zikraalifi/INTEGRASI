import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = resolve(__dirname, '../docs');

const PROMPT_PARTS = [
  'persona.md',
  'rules.md',
  'examples.md',
  'content-kb.md',
];

function loadPart(name) {
  try {
    return readFileSync(resolve(DOCS_DIR, name), 'utf-8').trim();
  } catch (err) {
    console.error(`[systemPrompt] Failed to load docs/${name}: ${err.message}`);
    process.exit(1);
  }
}

export const SYSTEM_PROMPT = PROMPT_PARTS.map(loadPart).join('\n\n');
