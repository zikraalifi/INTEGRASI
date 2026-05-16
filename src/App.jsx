import React from 'react';
import './App.css';
import ChatSection from './components/ChatSection';
import ChatToast from './components/ChatToast';

function App() {
  const products = {
    vegetables: [
      { id: 1, name: 'Brokoli Segar', desc: 'Brokoli organik pilihan dengan kualitas premium langsung dari kebun kami.', img: '/product_vegetables.png', rating: 5 },
      { id: 2, name: 'Bayam Merah', desc: 'Bayam merah segar, dipetik hari ini untuk nutrisi keluarga Anda.', img: '/product_vegetables.png', rating: 4.8 },
      { id: 3, name: 'Kangkung Organik', desc: 'Kangkung hidroponik tanpa pestisida yang terjamin kesegarannya.', img: '/product_vegetables.png', rating: 4.9 },
      { id: 4, name: 'Selada Air', desc: 'Selada air premium, renyah dan cocok untuk salad Anda.', img: '/product_vegetables.png', rating: 5 },
    ],
  };

  const renderProductCard = (product) => (
    <div className="product-card" key={product.id}>
      <div className="product-image">
        <span className="product-badge">Tersedia</span>
        <img src={product.img} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="product-rating">
          {"★".repeat(Math.floor(product.rating))} {product.rating}
        </div>
        <h4 className="product-title">{product.name}</h4>
        <p className="product-desc">{product.desc}</p>
        <div className="product-meta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          Greenhade, Bandung
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon">🌿</div>
            Greenhade
          </div>
          <div className="nav-links">
          </div>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block' }}>Hubungi Kami</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Kenalan dengan <span>Greenhouse HADE</span></h1>
              <p>Kebun hidroponik kami di Citeureup, Bandung — menanam sayuran hijau organik berkualitas premium. Dipanen segar setiap hari, langsung dari kebun untuk Anda.</p>
              <a href="#katalog" className="btn-primary" style={{ marginRight: '16px', display: 'inline-block' }}>Lihat Hasil Panen ➔</a>
            </div>
            <div className="hero-image">
              <img src="/hero_image.png" alt="Fresh Food Produce" />
            </div>
          </div>
        </div>
      </section>

      {/* Chat Section (Web Q&A) */}
      <ChatSection />

      {/* Features */}
      <section className="features">
        <div className="container features-container">
          <div className="feature-card">
            <div className="feature-icon">🥬</div>
            <div className="feature-text">
              <h3>Sayuran Segar</h3>
              <p>Dipanen hari ini untuk Anda</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <div className="feature-text">
              <h3>Tanpa Pestisida</h3>
              <p>Hidroponik & organik premium</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="catalog-section" id="katalog">
        <div className="container">
          <div className="section-header">
            <h2 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Hasil Panen</h2>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Sayuran dari Kebun Kami</h2>
          </div>

          <div className="category-section">
            <div className="category-header">
              <h3>Sayuran Hijau & Organik</h3>
              <button className="btn-outline">Lihat Semua ➔</button>
            </div>
            <div className="product-grid">
              {products.vegetables.map(renderProductCard)}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="about">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon" style={{color: '#064e3b'}}>🌿</div>
                Greenhade
              </div>
              <p>Kebun hidroponik penyedia sayuran hijau organik kualitas premium dari Greenhouse HADE, Citeureup. Dipanen segar, tanpa pestisida, langsung dari sumbernya.</p>
            </div>
            <div className="footer-links">
              <h4>Kontak & Info</h4>
              <p style={{color: '#a7f3d0', marginBottom: '8px'}}>info@greenhade.id</p>
              <p style={{color: '#a7f3d0', marginBottom: '16px'}}>+62 812 3456 7890</p>
              <h4>Subscribe</h4>
              <p style={{color: '#a7f3d0', fontSize: '0.85rem'}}>Dapatkan info terbaru dari kami</p>
              <div className="subscribe-form">
                <input type="email" placeholder="Email Anda" />
                <button>→</button>
              </div>
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
