import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatStream } from '../lib/chatApi';

const GREETING = {
  role: 'assistant',
  content: 'Halo! Saya asisten Greenhade. Tanya saja seputar produk, harga, atau lokasi kami.',
};

const SUGGESTIONS = [
  'Berapa harga produknya?',
  'Lokasinya di mana?',
  'Cara pesan gimana?',
];

function ChatPanel() {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const listRef = useRef(null);
  const lockScrollRef = useRef(false);

  useEffect(() => {
    if (lockScrollRef.current) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    lockScrollRef.current = !atBottom;
  };

  const send = async (text) => {
    const content = text.trim();
    if (!content || streaming) return;

    const history = messages.slice(1).map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, { role: 'user', content }, { role: 'assistant', content: '' }]);
    setInput('');
    setStreaming(true);
    lockScrollRef.current = false;

    let acc = '';
    try {
      for await (const chunk of chatStream(content, history)) {
        acc += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: acc }];
        });
      }
    } catch (err) {
      let errorMsg;
      if (err?.userFacing) {
        errorMsg = err.message;
      } else if (acc) {
        errorMsg = `${acc}\n\n_(Koneksi terputus. Hubungi admin di [+62 812 3456 7890](https://wa.me/6281234567890) untuk lanjut.)_`;
      } else {
        errorMsg = 'Maaf, terjadi kendala. Silakan hubungi admin di [**+62 812 3456 7890**](https://wa.me/6281234567890) untuk bertanya seputar Greenhouse HADE.';
      }
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...last, content: errorMsg }];
      });
      console.error('[chat] stream error:', err);
    } finally {
      setStreaming(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="chat-panel" role="dialog" aria-label="Chat asisten Greenhade">
      <div className="chat-panel-header">
        <div className="chat-panel-avatar" aria-hidden="true">🌿</div>
        <div>
          <div className="chat-panel-title">Greenhade Assistant</div>
          <div className="chat-panel-subtitle">
            <span className="chat-panel-status-dot" /> Online — biasanya balas dalam beberapa detik
          </div>
        </div>
      </div>

      <div
        className="chat-panel-messages"
        ref={listRef}
        onScroll={handleScroll}
        aria-live="polite"
      >
        {messages.map((m, i) => {
          if (m.role === 'assistant' && m.content === '') return null;
          return (
            <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
              {m.role === 'assistant' ? (
                <div className="chat-bubble-md">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <span>{m.content}</span>
              )}
            </div>
          );
        })}
        {streaming && messages[messages.length - 1]?.content === '' && (
          <div className="chat-typing"><span></span><span></span><span></span></div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="chat-suggestions">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="chat-suggestion-chip"
              onClick={() => send(s)}
              disabled={streaming}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form className="chat-panel-input" onSubmit={onSubmit}>
        <textarea
          rows={1}
          placeholder="Tulis pertanyaan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={streaming}
          aria-label="Tulis pertanyaan"
        />
        <button type="submit" className="chat-send-btn" disabled={!input.trim() || streaming} aria-label="Kirim">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatPanel;
