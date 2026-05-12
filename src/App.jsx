import React from 'react';
import './App.css';

function App() {
  const products = {
    vegetables: [
      { id: 1, name: 'Brokoli Segar', desc: 'Brokoli organik pilihan dengan kualitas premium langsung dari kebun kami.', img: '/product_vegetables.png', rating: 5 },
      { id: 2, name: 'Bayam Merah', desc: 'Bayam merah segar, dipetik hari ini untuk nutrisi keluarga Anda.', img: '/product_vegetables.png', rating: 4.8 },
      { id: 3, name: 'Kangkung Organik', desc: 'Kangkung hidroponik tanpa pestisida yang terjamin kesegarannya.', img: '/product_vegetables.png', rating: 4.9 },
      { id: 4, name: 'Selada Air', desc: 'Selada air premium, renyah dan cocok untuk salad Anda.', img: '/product_vegetables.png', rating: 5 },
    ],
    fruits: [
      { id: 5, name: 'Jeruk Manis', desc: 'Jeruk segar yang kaya akan vitamin C, manis dan menyegarkan.', img: '/product_fruits.png', rating: 4.9 },
      { id: 6, name: 'Apel Fuji', desc: 'Apel fuji pilihan yang renyah dan manis alami.', img: '/product_fruits.png', rating: 5 },
      { id: 7, name: 'Pisang Cavendish', desc: 'Pisang kualitas ekspor yang siap memenuhi kebutuhan energi Anda.', img: '/product_fruits.png', rating: 4.7 },
      { id: 8, name: 'Anggur Merah', desc: 'Anggur merah tanpa biji dengan rasa manis yang khas.', img: '/product_fruits.png', rating: 4.8 },
    ]
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
              <h1>Pilih Berbagai Produk Segar dari <span>Greenhade</span></h1>
              <p>Temukan produk agrikultur, buah-buahan, dan sayuran dengan kualitas premium terbaik langsung dari perusahaan kami yang telah terpercaya.</p>
              <button className="btn-primary" style={{ marginRight: '16px' }}>Lihat Katalog ➔</button>
            </div>
            <div className="hero-image">
              <img src="/hero_image.png" alt="Fresh Food Produce" />
            </div>
          </div>
        </div>
      </section>

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
            <div className="feature-icon">🍎</div>
            <div className="feature-text">
              <h3>Buah Pilihan</h3>
              <p>Manis alami & kaya vitamin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="catalog-section" id="katalog">
        <div className="container">
          <div className="section-header">
            <h2 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Temukan Produk Kami</h2>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Berdasarkan Kategori Pilihan Kebutuhan Anda</h2>
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

          <div className="category-section">
            <div className="category-header">
              <h3>Buah-Buahan Segar</h3>
              <button className="btn-outline">Lihat Semua ➔</button>
            </div>
            <div className="product-grid">
              {products.fruits.map(renderProductCard)}
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
              <p>Perusahaan penyedia berbagai kebutuhan pangan segar seperti sayuran dan buah-buahan dengan kualitas terbaik dan terjamin kesegarannya langsung dari sumbernya.</p>
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
    </>
  );
}

export default App;
