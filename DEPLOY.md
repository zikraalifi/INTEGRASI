# Deploy & Hand-off — Greenhouse HADE Website

Project = Vite + React SPA (frontend) + Node + Hono server (backend) dengan chat widget Q&A di-power Claude Haiku 4.5.

---

## Quick start (local dev)

Prerequisite: **Node 20.6+** (untuk `--env-file` + `--watch-path` flag).

```sh
# 1. Install deps
npm install

# 2. Copy env template + isi ANTHROPIC_API_KEY
cp .env.example .env
# edit .env, paste key dari https://console.anthropic.com/

# 3. Minta folder docs/ dari maintainer (gitignored, share out-of-band)
#    Berisi: persona.md, rules.md, examples.md, content-kb.md
#    Tanpa folder ini, backend tetap jalan tapi bot bingung (system prompt kosong).

# 4. Jalanin 2 terminal:
npm run dev:server   # terminal 1 — backend port 8787
npm run dev          # terminal 2 — frontend port 5173
```

Buka `http://localhost:5173`. Chat widget di section bawah hero.

**Mode mock (no API call):** set `VITE_USE_MOCK_API=true` di `.env` untuk dev UI tanpa hit Anthropic.

---

## Environment variables

Lihat `.env.example` untuk template lengkap. Required vs optional:

| Variable | Required? | Default | Notes |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ wajib | — | Dari Anthropic Console |
| `PORT` | optional | `8787` | Backend port |
| `ALLOWED_ORIGIN` | optional | `http://localhost:5173` | CORS allowlist. **Production: ganti ke domain real.** |
| `ANTHROPIC_MODEL` | optional | `claude-haiku-4-5-20251001` | LLM model ID |
| `RATE_LIMIT_MAX` | optional | `5` | Max req per window per IP |
| `RATE_LIMIT_WINDOW_MS` | optional | `60000` | Rate limit window (60s default) |
| `VITE_API_URL` | optional | `http://localhost:8787` | Backend URL untuk frontend (override saat backend di host beda) |
| `VITE_USE_MOCK_API` | optional | unset | Set `true` buat skip Anthropic call (dev only) |

---

## Build for production

```sh
npm run build      # frontend → dist/ (static, deploy ke CDN)
npm run preview    # local preview dist/ di port 4173
# backend: jalanin langsung node server/index.js dengan --env-file=.env
```

**Frontend (`dist/`):** static files, deploy ke Vercel / Netlify / Cloudflare Pages / S3+CloudFront / dll.

**Backend (`server/`):** Node long-running process, deploy ke Railway / Render / Fly.io / VPS. **Jangan** pakai Vercel Functions/Workers tanpa refactor — Hono server pakai SSE streaming yang butuh persistent connection.

---

## Hand-off checklist

### Owner responsibility (sebelum hand-off ke ops/kampus)
- [ ] **Anthropic budget cap** — set di Anthropic Console (Settings → Limits) sebelum production go-live. **Wajib.** Kalau gak, anonymous traffic bisa drain credit unbounded. Suggest: $5/day cap + email alert.
- [ ] **Share folder `docs/*.md`** — files gitignored (per owner decision), harus copy manual ke ops/kampus + dokumentasi cara update isinya. Tanpa folder ini bot mati.
- [ ] **`ANTHROPIC_API_KEY` provisioning** — generate di console, share via secure channel (1Password / signal / encrypted email), JANGAN commit / chat.

### Ops responsibility (kampus / siapa pun yg handle infra)
- [ ] Pilih platform (lihat rekomendasi di "Build for production" atas)
- [ ] Setup domain + DNS
- [ ] SSL/HTTPS (umumnya auto via platform)
- [ ] Set env vars di platform (jangan commit `.env`)
- [ ] CI/CD: auto-deploy on push to `main` branch
- [ ] **Update `ALLOWED_ORIGIN`** ke domain production (kalau tidak, CORS akan tolak request frontend)
- [ ] **Update OG image URL ke absolute** di `index.html` (`og:image`, `twitter:image`) — opsional tapi recommended buat LinkedIn/Twitter scraper

### Anti-abuse layer (recommended pre-launch)
- [ ] **Cloudflare di depan domain** (Free tier cukup) — DNS-level: Bot Fight Mode, WAF, DDoS protection, Turnstile (invisible CAPTCHA). Most cost-effective anti-abuse layer.

### Post-deploy verification
- [ ] Site load via domain — visual OK, no console error
- [ ] `/health` endpoint return `{"ok":true,"model":"..."}`
- [ ] Chat widget kirim message → bot reply normal (verify `cache_read > 0` di backend log setelah request ke-2)
- [ ] Rate limit aktif — spam 6× request → 6th return `429`
- [ ] Lighthouse mobile audit — target 90+ semua kategori (current baseline: 93/96/100/100)

### Monitoring (recommended, minimal effort)
- [ ] **UptimeRobot** (gratis) — monitor `https://<domain>/health` setiap 5 menit. Email alert kalau down. ~5 menit setup. URL: https://uptimerobot.com/
- Anthropic usage dashboard (built-in) — cek token spend & request count harian
- Server log (`console.log` di `server/chat.js`) — bisa di-scrape kalau perlu data "apa yang user tanya" later

---

## Update content (non-dev workflow)

KB content + bot persona/rules/examples ada di `docs/*.md`. **Tidak perlu sentuh code JS.** Edit file markdown, restart server (atau biarkan `--watch-path=./docs` auto-reload).

| File | Isinya |
|---|---|
| `docs/persona.md` | Role + tone bot |
| `docs/rules.md` | Aturan jawaban (fallback admin, B2B routing, format, dll) |
| `docs/examples.md` | Few-shot interaksi (~25 contoh) — bot belajar tone dari sini |
| `docs/content-kb.md` | Knowledge base: alamat, jam, produk, harga, payment, dll |

**Catatan prompt caching:** total system prompt saat ini ~4162 token, di atas threshold 4096 Haiku 4.5. Kalau trim/shrink konten, cek log `cache_read > 0` setelah edit. Kalau drop ke `cache_read=0` artinya jatuh di bawah threshold — perlu tambah konten balik.

---

## References
