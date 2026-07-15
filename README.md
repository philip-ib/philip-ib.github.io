# Philip Imanuel B — Portfolio v4

Single-page portfolio website built with vanilla JavaScript and Tailwind CSS.

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
npm install          # Install Tailwind CSS CLI
npm run dev          # Watch CSS changes
npm run build:css    # Build minified CSS once
```

Open `index.html` directly in browser — no dev server needed.

## Deployment

Push to `main` → GitHub Actions builds CSS and deploys to GitHub Pages.
