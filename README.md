# Alema Emran — Portfolio

Personal portfolio site for **Alema Emran** — software engineer, product builder, and Digital Media & Marketing Lead at Axiomaera.

Live stack: React 19, TanStack Start, Motion, Tailwind CSS v4, deployed via Nitro (Cloudflare Workers).

## Projects featured

- **BrandKit AI** — AI brand identity generator
- **Lama OS** — personal productivity operating system
- **MarketMate** — fintech portfolio tracker with AI copilot
- **PlantOS** — nursery inventory management

## Development

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:8080](http://localhost:8080).

## Production build

```bash
npm run build
npm run preview
```

Set your public URL for canonical and Open Graph tags:

```bash
cp .env.example .env
# VITE_SITE_URL=https://your-domain.com
```

## Deploy

The build targets **Cloudflare Workers** (`cloudflare-module` preset). After `npm run build`, deploy the `.output` directory with Wrangler or connect the repo to Cloudflare Pages.

For other hosts, adjust the Nitro preset in `vite.config.ts`.

## Asset scripts

Optional maintainer scripts live in `scripts/`:

- `npm run capture:plant` — regenerate the PlantOS project screenshot
- `npm run mascot:*` — mascot sprite pipeline

## Contact

- Email: [alemaemran@gmail.com](mailto:alemaemran@gmail.com)
- LinkedIn: [alemaemran](https://www.linkedin.com/in/alemaemran)
- GitHub: [Alema-em](https://github.com/Alema-em)
