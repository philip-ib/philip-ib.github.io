# Product Requirement Document (PRD)
## Project: Portfolio Website v3 — Astro Framework

### 1. Objective & Overview
Proyek ini merombak total website portofolio dari **v2 (Phoenix Framework)** ke **v3 (Astro Framework)**.
v2 dihapus sepenuhnya dan digantikan oleh v3 yang dibangun dengan Astro — static site generator modern yang memang didesain untuk output static HTML.

Astro dipilih karena:
- Zero-JS output by default (tetap bisa tambah interaktivitas jika perlu)
- Built-in Tailwind CSS support
- Komponen `.astro` — HTML-first, scoped styles
- Build ke static HTML tanpa perlu trik export seperti Phoenix
- Ekosistem npm yang luas

### 2. Core Requirements & Tech Stack
- **Framework:** Astro 5
- **Styling:** Tailwind CSS v4 + daisyUI v5 (via npm, bukan CDN)
- **Data:** TypeScript (`src/data/projects.ts`)
- **Package Manager:** npm
- **Deployment:** GitHub Actions auto-build & deploy ke GitHub Pages
- **Design Theme:** Dark & Moody — deep charcoal, indigo accent, amber highlights

### 3. Key Features & Sections
- **Navbar:** Transparan + blur, smooth scroll links, Download CV
- **Hero:** Radial gradient background, dot pattern, avatar glow ring, nama + tagline
- **About:** Bio + skill bars (gradient indigo→amber) + tech tags
- **My Project:** 6 project card grid, hover glow, staggered animation, dummy data
- **Socials:** Brand-colored buttons (Twitter, Instagram, GitHub, WhatsApp)
- **Footer:** Simple border-top, copyright

### 4. Project Structure
```
philip-ib.github.io/
├── src/
│   ├── pages/index.astro          # Main single-page
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   ├── Socials.astro
│   │   └── Footer.astro
│   ├── layouts/BaseLayout.astro   # Dark theme + global styles
│   ├── data/projects.ts           # Project data (TypeScript)
│   └── styles/global.css          # CSS variables, animations
├── public/                        # Static assets
│   ├── images/
│   ├── pdf/
│   └── favicon.ico
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml   # Auto-deploy ke GitHub Pages
```

### 5. Deployment Workflow
1. Push kode ke branch `main`
2. GitHub Actions trigger: checkout → `npm ci` → `npm run build` → deploy `dist/` ke GitHub Pages
3. Site live di `philip-ib.github.io` — tidak perlu build lokal

### 6. Success Criteria
- Website v3 berjalan di GitHub Pages melalui URL utama
- Bagian My Project menampilkan 6 project dummy dengan rapi
- Dark theme tampil konsisten di semua section
- Auto-deploy berjalan tanpa intervensi manual
- Tidak ada sisa kode v1/v2 di repository
