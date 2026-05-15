import React from 'react';
import ChatPanel from './ChatPanel';

function ChatSection() {
  return (
    <section className="chat-section" id="chat">
      <div className="container">
        <div className="chat-section-container">
          <div className="chat-section-intro">
            <span className="chat-section-tag">💬 Tanya AI</span>
            <h2>
              Punya pertanyaan? <span>Tanya asisten kami</span>
            </h2>
            <p>
              Cek varian, harga, lokasi, dan cara pemesanan Greenhade langsung lewat chat di samping.
              Asisten AI kami siap bantu 24/7 — kalau ada hal di luar jangkauan, akan diarahkan ke admin kami.
            </p>
            <ul className="chat-section-bullets">
              <li>Info varian & harga ritel real-time</li>
              <li>Detail lokasi & jam operasional</li>
              <li>Panduan pemesanan via WhatsApp admin</li>
            </ul>
          </div>
          <div className="chat-section-panel">
            <ChatPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatSection;
