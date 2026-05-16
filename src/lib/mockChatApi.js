const FALLBACK_NUMBER = '[+62 812 3456 7890](https://wa.me/6281234567890)';

const RESPONSES = {
  greeting: `Halo! Saya asisten Greenhade. Ada yang bisa saya bantu seputar produk, harga, atau lokasi kami?`,

  price: `Berikut harga produk kami saat ini:

**Sayuran:**
- Brokoli Segar — Rp 22.000 / pack (500g)
- Bayam Merah — Rp 10.000 / ikat (250g)
- Kangkung Organik — Rp 8.000 / ikat (250g)
- Selada Air — Rp 18.000 / pack (200g)

**Buah:**
- Jeruk Manis — Rp 32.000 / kg
- Apel Fuji — Rp 52.000 / kg
- Pisang Cavendish — Rp 28.000 / sisir
- Anggur Merah — Rp 42.000 / 500g

Untuk pesan, hubungi admin di ${FALLBACK_NUMBER}.`,

  location: `Lokasi kami di **Greenhouse HADE, Citeureup, Dayeuhkolot, Kabupaten Bandung**.

Jam operasional:
- Senin–Sabtu: 08.00–15.00 WIB
- Minggu: Tutup

Bisa pickup langsung di lokasi sesuai jam operasional.`,

  order: `Pemesanan saat ini melalui **WhatsApp admin** di ${FALLBACK_NUMBER}.

Langkah:
1. Hubungi admin via WhatsApp
2. Sebutkan produk + jumlah
3. Admin konfirmasi ketersediaan & total harga
4. Pembayaran transfer (BCA / Mandiri)

Saat ini layanan delivery belum tersedia — bisa pickup di lokasi Greenhouse HADE.`,

  contact: `Anda bisa menghubungi admin kami via:
- **WhatsApp:** ${FALLBACK_NUMBER}
- **Email:** info@greenhade.id`,

  about: `Greenhouse HADE adalah kebun hidroponik yang fokus pada sayuran hijau organik kualitas premium. Sayuran ditanam dengan metode hidroponik dan organik di Greenhouse HADE, Citeureup, Dayeuhkolot, Kabupaten Bandung. Panen hari yang sama, tanpa pestisida.`,

  fallback: `Maaf, saya kurang yakin dengan pertanyaan ini. Untuk informasi lebih lanjut, silakan hubungi admin kami langsung di ${FALLBACK_NUMBER}.`,
};

function pickResponse(message) {
  const m = message.toLowerCase();
  if (/^(halo|hai|hi|hello|pagi|siang|sore|malam)\b/.test(m)) return RESPONSES.greeting;
  if (/(harga|berapa|biaya|tarif|cost)/.test(m)) return RESPONSES.price;
  if (/(lokasi|alamat|dimana|di mana|jam|buka|tutup|operasional|pickup)/.test(m)) return RESPONSES.location;
  if (/(pesan|order|beli|delivery|antar|pengiriman|bayar)/.test(m)) return RESPONSES.order;
  if (/(kontak|admin|whatsapp|wa|telepon|email|hubungi)/.test(m)) return RESPONSES.contact;
  if (/(apa|tentang|greenhade|siapa|brand|perusahaan)/.test(m)) return RESPONSES.about;
  return RESPONSES.fallback;
}

export async function* mockChatStream(message) {
  const fullResponse = pickResponse(message);
  await new Promise((r) => setTimeout(r, 280));

  const chunks = fullResponse.match(/\S+\s*|\s+/g) || [fullResponse];
  for (const chunk of chunks) {
    yield chunk;
    await new Promise((r) => setTimeout(r, 18 + Math.random() * 30));
  }
}
