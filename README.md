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

Set your public URL after the first deploy (free `*.workers.dev` link from Cloudflare):

```bash
cp .env.example .env
# VITE_SITE_URL=https://alema-em-portfolio.<your-account>.workers.dev
```

## Deploy (free — Cloudflare Workers)

No domain purchase needed. Cloudflare gives you a free `*.workers.dev` URL.

### One-time setup

```bash
npx wrangler login
cp .env.example .env
npm install
npm run deploy
```

After deploy, Cloudflare prints your live URL. Paste it into `.env` as `VITE_SITE_URL`, update `public/sitemap.xml` if you care about SEO, then run `npm run deploy` once more.

### Auto-deploy on git push (optional, still free)

In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → connect **Alema-em/Portfolio**:

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Deploy command | `npx nitro deploy --prebuilt` |

Set `VITE_SITE_URL` to your `*.workers.dev` URL in the project environment variables after the first successful deploy.

## Other free hosts

Vercel (`*.vercel.app`) and Netlify (`*.netlify.app`) also have free tiers, but you’d change the Nitro preset in `vite.config.ts`. Cloudflare is already configured — stick with it for zero cost and zero config changes.

## Asset scripts

Optional maintainer scripts live in `scripts/`:

- `npm run capture:plant` — regenerate the PlantOS project screenshot
- `npm run mascot:*` — mascot sprite pipeline

## Contact

- Email: [alemaemran@gmail.com](mailto:alemaemran@gmail.com)
- LinkedIn: [alemaemran](https://www.linkedin.com/in/alemaemran)
- GitHub: [Alema-em](https://github.com/Alema-em)
