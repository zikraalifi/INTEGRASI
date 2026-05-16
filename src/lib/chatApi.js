import { mockChatStream } from './mockChatApi';
import { realChatStream } from './realChatApi';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const chatStream = USE_MOCK ? mockChatStream : realChatStream;
