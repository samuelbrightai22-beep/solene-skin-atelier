# Solène — Skin Atelier

A premium, botanical-themed single-page website for a fictional skincare salon in Portland, Oregon. Built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion, and real Pexels photography.

> "Skin, considered." — A botanical skin atelier in the heart of Mississippi Avenue, Portland. Bespoke facials, derma-grade resurfacing, and slow skincare rituals.

## Live demo

- **Production (Vercel)**: see Vercel deployment section below
- **z.ai sandbox preview**: only accessible to authenticated sandbox users

## Features

- **11 polished sections** in a single continuous page: marquee announcement bar, sticky scroll-aware navigation, cinematic Ken-Burns hero, brand philosophy, signature treatments grid, 4-step "Solène Method", dark forest-green treatment menu, 3 specialist cards, rotating testimonials carousel, journal cards, full booking form with toast feedback, FAQ accordion, and a sticky newsletter footer.
- **Real photography** — 9 images sourced from Pexels (CC-licensed), each VLM-verified for premium salon fit. Full credits in [`public/salon/CREDITS.md`](public/salon/CREDITS.md).
- **Premium design system** — Playfair Display + Cormorant Garamond + Inter typography, warm cream / deep botanical green / antique gold palette, custom CSS utilities (`.eyebrow`, `.link-reveal`, `.shadow-warm`, `.animate-ken-burns`, etc.).
- **Responsive** — mobile-first with a hamburger drawer, sticky footer that respects safe-area insets.
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, alt text on all imagery.
- **Data-driven** — treatments, specialists, testimonials, journal entries, FAQs, and menu items all live in [`src/components/site/data.ts`](src/components/site/data.ts) so you can edit content without touching component code.

## Tech stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **Animations**: Framer Motion + custom CSS keyframes
- **Toasts**: sonner
- **Forms**: react-hook-form
- **Database**: Prisma ORM (SQLite client) — schema exists but no component imports it; site is fully static for now

## Local development

```bash
# 1. Install dependencies
bun install

# 2. (Optional) Set up the database — only needed if you later wire booking
#    form submissions to Prisma. The site currently doesn't read from DB.
cp .env.example .env
bun run db:generate
bun run db:push

# 3. Run the dev server
bun run dev
# → http://localhost:3000
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # Fonts (Playfair + Cormorant + Inter), SEO metadata
│   ├── page.tsx          # Composes all 11 sections
│   └── globals.css       # Salon palette + custom CSS utilities
├── components/
│   ├── ui/               # shadcn/ui component library (pre-installed)
│   └── site/             # Salon-specific components
│       ├── data.ts          # Treatments, specialists, testimonials, journal, FAQ, menu
│       ├── announcement.tsx # Marquee + trust bar
│       ├── navbar.tsx       # Scroll-aware sticky nav with mobile drawer
│       ├── hero.tsx         # Cinematic hero with Ken-Burns zoom + stats
│       ├── philosophy.tsx   # Brand intro + values
│       ├── treatments.tsx   # Featured ritual + 5-card grid
│       ├── method.tsx       # 4-step Solène Method
│       ├── menu.tsx         # Dark forest-green pricing menu
│       ├── specialists.tsx # 3 esthetician portrait cards
│       ├── testimonials.tsx # Rotating testimonial carousel
│       ├── journal.tsx      # 3 editorial article cards
│       ├── booking.tsx      # Full booking form with toast
│       ├── faq.tsx          # Accordion FAQ
│       └── footer.tsx       # Newsletter + link columns + credits
└── lib/
    └── utils.ts          # shadcn utility helpers
public/
└── salon/               # 9 real Pexels photos + CREDITS.md
```

## Customizing content

All site content (treatments, specialists, testimonials, journal posts, FAQs, treatment menu, nav links) is data-driven from `src/components/site/data.ts`. Edit that file to add/remove entries — components will re-render automatically. No component code changes needed.

## Swapping imagery

Real Pexels photography lives in `public/salon/`. To swap any image:

1. Find a new Pexels photo ID (e.g., from https://www.pexels.com)
2. Download via the CDN: `curl -o public/salon/hero.png "https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=1600"`
3. Update the attribution in `public/salon/CREDITS.md`
4. The image filename must match what's referenced in `src/components/site/data.ts` (currently `hero.png`, `treatment-facial.png`, `treatment-led.png`, `treatment-massage.png`, `interior.png`, `botanicals.png`, `specialist-1.png`, `specialist-2.png`, `specialist-3.png`)

## Deployment to Vercel

This site is a standard Next.js 16 app — Vercel auto-detects it.

1. Push the repo to GitHub (see below).
2. Go to https://vercel.com → "Add New Project" → import the GitHub repo.
3. Vercel auto-detects Next.js — keep the default framework settings.
4. **No environment variables are required** (the site doesn't use the database). If you later wire the booking form to a real database, add your `DATABASE_URL` in the Vercel project settings.
5. Click "Deploy". First build takes ~2-3 minutes.
6. Vercel gives you a `*.vercel.app` production URL — you can attach a custom domain (e.g., `soleneatelier.com`) in Project Settings → Domains.

Every `git push` to `main` from now on auto-deploys to Vercel. Pull requests create preview deployments.

## Push to GitHub

```bash
# 1. Create an empty repo on GitHub.com (don't add a README or .gitignore — the project already has both)

# 2. From the project root:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

If you'd prefer to push from this sandbox directly, you can:
1. Create a Personal Access Token at https://github.com/settings/tokens (with `repo` scope)
2. Use it as the password when prompted by `git push`
3. Or set the remote URL as `https://<token>@github.com/<your-username>/<repo-name>.git` (note: this stores the token in `.git/config` — only do this in trusted environments)

## License

- **Code**: MIT — do whatever you want with the code.
- **Photography**: Pexels License (free for commercial use, attribution appreciated). See `public/salon/CREDITS.md` for photo IDs and direct URLs.

## Credits

- **Design & build**: Solène Skin Atelier
- **Photography**: Pexels (full attribution in `public/salon/CREDITS.md`)
- **Typography**: Playfair Display, Cormorant Garamond, Inter (all via Google Fonts)
- **Component library**: shadcn/ui (New York style)
