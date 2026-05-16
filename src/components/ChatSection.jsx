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
              Butuh info <span>secepatnya?</span>
            </h2>
            <p>
              Dapatkan jawaban langsung tentang varian, harga, lokasi, dan cara pemesanan
              Greenhouse HADE, tanpa menunggu balasan admin.
            </p>
            <ul className="chat-section-bullets">
              <li>Cek varian & harga ritel dalam hitungan detik</li>
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
