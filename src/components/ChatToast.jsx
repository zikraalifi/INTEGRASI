import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'greenhade-chat-toast-dismissed';
const TOAST_DELAY_MS = 1200;

function scrollToChat() {
  const el = document.getElementById('chat');
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ChatToast() {
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'hidden';
    return sessionStorage.getItem(STORAGE_KEY) === '1' ? 'minimized' : 'hidden';
  });

  useEffect(() => {
    if (phase !== 'hidden') return undefined;
    const t = setTimeout(() => setPhase('toast'), TOAST_DELAY_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setPhase('minimized');
  };

  const openChat = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setPhase('minimized');
    scrollToChat();
  };

  if (phase === 'hidden') return null;

  if (phase === 'toast') {
    return (
      <div className="chat-toast" role="dialog" aria-label="Promosi asisten Greenhade">
        <button
          type="button"
          className="chat-toast-close"
          onClick={dismiss}
          aria-label="Tutup notifikasi"
        >
          ×
        </button>
        <div className="chat-toast-icon" aria-hidden="true">💬</div>
        <div className="chat-toast-body">
          <div className="chat-toast-title">Tanya asisten Greenhade</div>
          <div className="chat-toast-text">
            Cek harga, lokasi, atau cara pesan langsung lewat AI kami.
          </div>
          <button type="button" className="chat-toast-cta" onClick={openChat}>
            Buka chat →
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="chat-shortcut-btn"
      onClick={openChat}
      aria-label="Buka chat asisten Greenhade"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  );
}

export default ChatToast;
