import React from 'react';
import './App.css';
import ChatSection from './components/ChatSection';
import ChatToast from './components/ChatToast';
import MobileMenu from './components/MobileMenu';

function App() {
  const products = {
    vegetables: [
      { id: 1, name: 'Brokoli Segar', desc: 'Brokoli organik pilihan dengan kualitas premium langsung dari kebun kami.', img: '/product_vegetables.png', imgWebp: '/product_vegetables.webp' },
      { id: 2, name: 'Bayam Merah', desc: 'Bayam merah segar, dipetik hari ini untuk nutrisi keluarga Anda.', img: '/product_vegetables.png', imgWebp: '/product_vegetables.webp' },
      { id: 3, name: 'Kangkung Organik', desc: 'Kangkung hidroponik tanpa pestisida yang terjamin kesegarannya.', img: '/product_vegetables.png', imgWebp: '/product_vegetables.webp' },
      { id: 4, name: 'Selada Air', desc: 'Selada air premium, renyah dan cocok untuk salad Anda.', img: '/product_vegetables.png', imgWebp: '/product_vegetables.webp' },
    ],
  };

  const renderProductCard = (product) => (
    <div className="product-card" key={product.id}>
      <div className="product-image">
        <span className="product-badge">Tersedia</span>
        <picture>
          <source srcSet={product.imgWebp} type="image/webp" />
          <img src={product.img} alt={`Foto ${product.name}`} width="1024" height="1024" loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className="product-info">
        <h4 className="product-title">{product.name}</h4>
        <p className="product-desc">{product.desc}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Skip link (a11y) — must be the very first focusable element */}
      <a href="#main" className="skip-link">Lewati ke konten utama</a>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#home" className="logo" aria-label="Greenhade — beranda">
            <span className="logo-icon" aria-hidden="true">🌿</span>
            Greenhade
          </a>
          <div className="nav-links">
            <a href="#home">Beranda</a>
            <a href="#katalog">Hasil Panen</a>
          </div>
          <div className="nav-actions">
            <a href="#chat" className="btn-outline nav-tanya">Tanya Cepat</a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Greenhouse+HADE+Citeureup+Dayeuhkolot+Kabupaten+Bandung"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline nav-maps"
              aria-label="Buka lokasi di Google Maps"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Lokasi
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn-primary nav-cta" style={{ display: 'inline-block' }}>Hubungi Kami</a>
          </div>
          <MobileMenu />
        </div>
      </nav>

      {/* Main content landmark for skip link */}
      <main id="main">

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Kenalan dengan <span>Greenhouse HADE</span></h1>
              <p>Kebun hidroponik kami di Citeureup, Dayeuhkolot, Kabupaten Bandung, menanam sayuran hijau organik berkualitas premium. Dipanen segar setiap hari, langsung dari kebun untuk Anda.</p>
              <a href="#katalog" className="btn-primary" style={{ display: 'inline-block' }}>Lihat Hasil Panen ➔</a>
            </div>
            <div className="hero-image">
              <picture>
                <source srcSet="/hero_image.webp" type="image/webp" />
                <img src="/hero_image.png" alt="Sayuran segar hasil panen Greenhouse HADE" width="1024" height="1024" decoding="async" fetchPriority="high" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Section (Web Q&A) */}
      <ChatSection />

      {/* Catalog Section */}
      <section className="catalog-section" id="katalog">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow" style={{ color: 'var(--primary-dark)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block', fontWeight: 600 }}>Hasil Panen</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Sayuran dari Kebun Kami</h2>
          </div>

          <div className="category-section">
            <div className="category-header">
              <h3>Sayuran Hijau & Organik</h3>
            </div>
            <div className="product-grid">
              {products.vegetables.map(renderProductCard)}
            </div>
          </div>

        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="footer" id="about">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                Greenhade
              </div>
              <p>Kebun hidroponik penyedia sayuran hijau organik kualitas premium dari Greenhouse HADE di Citeureup, Dayeuhkolot, Kabupaten Bandung. Dipanen segar, tanpa pestisida, langsung dari sumbernya.</p>
            </div>
            <div className="footer-links">
              <h3>Kontak & Info</h3>
              <p className="footer-info">
                <a href="mailto:info@greenhade.id">info@greenhade.id</a>
              </p>
              <p className="footer-info">
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">+62 812 3456 7890</a>
              </p>
              <h3>Subscribe</h3>
              <p className="footer-info footer-info-sub">Dapatkan info terbaru dari kami</p>
              <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="subscribe-email" className="sr-only">Email untuk subscribe</label>
                <input id="subscribe-email" type="email" placeholder="Email Anda" />
                <button type="submit" aria-label="Subscribe">→</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Greenhade Company. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatToast />
    </>
  );
}

export default App;
