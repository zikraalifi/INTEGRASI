import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const LINKS = [
  { href: '#home', label: 'Beranda' },
  { href: '#katalog', label: 'Hasil Panen' },
  { href: '#chat', label: 'Tanya Cepat' },
];

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Buka menu navigasi"
        aria-expanded={isOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {isOpen && createPortal(
        <>
          <div className="mobile-menu-backdrop" onClick={close} aria-hidden="true" />
          <aside className="mobile-menu-drawer" role="dialog" aria-modal="true" aria-label="Menu navigasi">
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button
                type="button"
                className="mobile-menu-close"
                onClick={close}
                aria-label="Tutup menu"
              >
                ×
              </button>
            </div>
            <nav className="mobile-menu-nav">
              {LINKS.map(({ href, label }) => (
                <a key={href} href={href} onClick={close}>{label}</a>
              ))}
            </nav>
            <div className="mobile-menu-ctas">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Greenhouse+HADE+Citeureup+Dayeuhkolot+Kabupaten+Bandung"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mobile-menu-cta-item"
                onClick={close}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '6px', verticalAlign: '-3px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Lokasi
              </a>
              <a
                href="https://wa.me/6282219008737"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mobile-menu-cta-item"
                onClick={close}
              >
                Hubungi Kami
              </a>
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}

export default MobileMenu;
