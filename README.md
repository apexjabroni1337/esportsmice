# EsportsMice.com

Pro esports gaming mice analytics — 2,000+ players, 45 mice, 13 games.

## Deploy to Vercel (easiest)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → select this repo
4. Click **Deploy** — Vercel auto-detects Vite and builds it
5. Your site is live!

### Connect your domain
- In Vercel: Settings → Domains → Add `esportsmice.com`
- In Hostinger DNS: update the A record and CNAME as Vercel instructs

## Run locally (optional)

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Mouse images

Drop `.png` files into `public/images/mice/` named like:
- `razer-viper-v3-pro.png`
- `logitech-g-pro-x-superlight-2.png`

They'll automatically appear on the site.
