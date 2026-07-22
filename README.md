# Philip Imanuel B — Portfolio v4

Single-page portfolio website built with vanilla JavaScript and Tailwind CSS.

## Architecture

```
Browser
  │
  ├─ index.html          ← Single-page entry point (all 6 sections)
  │   ├─ /style.css      ← Tailwind v4 compiled output (design tokens + utilities)
  │   ├─ /js/main.js     ← Vanilla JS (no framework), 5 modules:
  │   │    1. Mobile menu toggle (hamburger + overlay + Escape key)
  │   │    2. Scroll-reveal animations (IntersectionObserver)
  │   │    3. Skill bar fill animation
  │   │    4. Active nav link highlighting
  │   │    5. Dynamic project card rendering
  │   ├─ /data/projects.js  ← Project data array (global variable)
  │   ├─ /images/           ← Static images (avatar, etc.)
  │   └─ /pdf/              ← Downloadable files (CV)
  │
  └─ External CDN
      ├─ Google Fonts (Inter)
      └─ Font Awesome 4.7 (icons)

Build
  │
  ├─ src/input.css       ← Tailwind v4 input + CSS custom properties (design tokens)
  │   └─ npm run build:css  →  style.css (committed, 949 lines)
  │       └─ @tailwindcss/cli (dev dependency only)
  │
  └─ Deploy
      └─ .github/workflows/deploy.yml  →  GitHub Pages (push-to-deploy)
```

### Design Tokens

All colors and visual properties are defined as CSS custom properties in `src/input.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0f0f13` | Page background |
| `--surface` | `#1a1a24` | Card/surface background |
| `--border` | `#ffffff0a` | Subtle border |
| `--text-primary` | `#e4e4ec` | Primary text |
| `--text-secondary` | `#9494a8` | Muted text |
| `--accent` | `#818cf8` | Accent (indigo) |
| `--amber` | `#f59e0b` | Warm accent |

### Data Flow

```
data/projects.js        js/main.js              DOM
  ┌──────────┐       ┌──────────────┐       ┌──────────────┐
  │ projects │──────►│ renderProjects│──────►│ #projects-grid│
  │ Data[]   │       │   ()          │       │ (dynamic HTML)│
  └──────────┘       └──────────────┘       └──────────────┘

IntersectionObserver API
  ┌──────────────────┐
  │ .reveal elements │──► add .visible class (CSS transition)
  │ section[id]      │──► highlight nav link
  │ #about           │──► trigger skill bar animation
  └──────────────────┘
```

## Tech Stack

- **HTML** — single `index.html` with all 6 sections
- **CSS** — Tailwind CSS v4 via CLI + custom design tokens
- **JavaScript** — vanilla JS for interactivity (no framework)
- **Zero runtime dependencies** — only `@tailwindcss/cli` as dev dependency

## Project Structure

```
├── index.html              # Single-page — Navbar, Hero, About, Projects, Socials, Footer
├── style.css               # Generated Tailwind CSS output (committed)
├── src/
│   └── input.css           # Tailwind input + design tokens + custom utilities
├── js/
│   └── main.js             # Mobile menu, scroll reveal, skill bars, nav highlight, project cards
├── data/
│   └── projects.js         # Project data (edit to add/update projects)
├── images/                 # Static images (avatar, etc.)
├── pdf/                    # Downloadable files (CV)
├── package.json            # npm scripts (build:css, watch, dev)
└── .github/workflows/deploy.yml  # Auto-deploy to GitHub Pages
```

## Development

```bash
# 1. Install Tailwind CSS CLI (once)
npm install

# 2. Start the local dev server (pick one)
npx serve . -p 3000          # Recommended — serves over HTTP
# or
python -m http.server 3000   # If you have Python installed

# 3. Watch CSS changes (in a separate terminal)
npm run dev
```

Then open **http://localhost:3000** in your browser.

> **Note:** Do NOT open `index.html` directly from the file system (`file://` protocol).
> The site uses absolute paths (e.g. `/style.css`, `/js/main.js`) which require an
> HTTP server to resolve correctly. Opening directly will show an unstyled page.

### npm Scripts

| Command | Description |
|---|---|
| `npm run dev` | Watch `src/input.css` and rebuild on changes |
| `npm run build:css` | Build minified `style.css` once |
| `npm run build` | Alias for `build:css` |

## Deployment

Push to `main` → GitHub Actions builds CSS and deploys to GitHub Pages.
