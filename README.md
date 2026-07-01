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
# VITE_SITE_URL=https://alema.dev
```

## Deploy (Cloudflare + alema.dev)

This site targets **Cloudflare Workers** (`cloudflare-module` preset). Recommended setup:

### 1. Get the domain

Register **alema.dev** at [Cloudflare Registrar](https://dash.cloudflare.com/?to=/:account/domains/register) (or any registrar). If you buy elsewhere, add the domain to Cloudflare and point its nameservers to Cloudflare.

### 2. One-time Cloudflare login

```bash
npx wrangler login
```

### 3. Deploy from your machine

```bash
cp .env.example .env
npm install
npm run deploy
```

This builds the site and publishes to Cloudflare. You’ll get a `*.workers.dev` URL first.

### 4. Attach alema.dev

In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **alema-em-portfolio** → **Settings** → **Domains & Routes**:

- Add **alema.dev**
- Optionally add **www.alema.dev** and set a redirect to `https://alema.dev`

`VITE_SITE_URL` must be `https://alema.dev` in `.env` **before** you run `npm run deploy` so OG tags and canonical URLs are correct.

### Auto-deploy on git push (optional)

Connect **Alema-em/Portfolio** in **Workers & Pages** → **Create** → **Workers** → **Import a repository**, then set:

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Deploy command | `npx nitro deploy --prebuilt` |
| Environment variable | `VITE_SITE_URL=https://alema.dev` |

Future pushes to `master` will redeploy automatically.

## Deploy (other hosts)

Adjust the Nitro preset in `vite.config.ts` (e.g. `vercel`, `netlify`).

## Asset scripts

Optional maintainer scripts live in `scripts/`:

- `npm run capture:plant` — regenerate the PlantOS project screenshot
- `npm run mascot:*` — mascot sprite pipeline

## Contact

- Email: [alemaemran@gmail.com](mailto:alemaemran@gmail.com)
- LinkedIn: [alemaemran](https://www.linkedin.com/in/alemaemran)
- GitHub: [Alema-em](https://github.com/Alema-em)
