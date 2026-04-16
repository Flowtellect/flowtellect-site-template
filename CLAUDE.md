# Flowtellect Site Template — Kontekst dla Claude Code

## Co to jest
Next.js template klonowany przez GitHub Template API przy KAŻDEJ generacji
klienta — nowe strony klientów = `Flowtellect/{siteSlug}` (osobne repo per
klient). Ten template renderuje content z `content/*.json` (generowany przez
AI w CMS: `Flowtellect/Flowtellect_CMS`).

**NIE jest to produkcyjna strona.** To template dla generatora — każdy commit
tutaj wpływa na PRZYSZŁE generacje. Istniejące klienckie repo mają własne
snapshoty i NIE re-syncują się z template automatycznie.

## Stack
- Next.js 14.2 (App Router, RSC)
- React 18, TypeScript
- Tailwind CSS 3 + CSS Variables (51 tokens via content/theme.json)
- Netlify Forms (AJAX + action fallback)
- Dynamic imports dla Showcase components (code splitting)

## Content flow

```
CMS pipeline → content/theme.json + content/{slug}.json + pages-manifest.json
             → GitHub Contents API push → Netlify webhook → next build
             → applyTheme() + <SectionRenderer/> → live site
```

## Struktura

### `app/`
- `layout.tsx` — root: Preloader, PreviewListener, DesignProvider wrap,
  scroll progress bar, preconnect hints, `generateViewport` (themeColor
  z accent), `generateMetadata` (OG + Twitter)
- `page.tsx` — homepage (reads `content/homepage.json` or `index.json`)
- `[slug]/page.tsx` — dynamic content pages + utility pages (markdown body).
  Section rhythm wrap via `getSectionBg(dd, i)` dla non-Showcase sections
- `dziekujemy/page.tsx` — thank-you po ContactForm submit (Netlify action fallback)
- `not-found.tsx` — archetype-aware 404 (6 personalities: luxurious/formal/
  casual/playful/minimal/default), preserves auto-reload dla Netlify build-in-flight
- `globals.css` — design token defaults, scroll-driven animations,
  hover micro-interactions, continuous (float/pulse/gradient-shift),
  `prefers-reduced-motion` override

### `components/`
- `SectionRenderer.tsx` — **Tier routing**: `SHOWCASE_MAP` (14 variants
  via `next/dynamic`) → `GenericSection` fallback. Showcase skip
  `ScrollReveal` wrap (mają własne FadeIn), ale anchor id + theme overrides applied.
- `SectionList.tsx` — defensive wrapper z null guard
- `LazyImage.tsx`, `Preloader.tsx`, `CookieConsent.tsx`, `Lightbox.tsx`,
  `GalleryWithLightbox.tsx`
- `ContactForm.tsx` — Netlify Forms compat + **controlled inline validation**
  (on blur + submit), icon states (✓/!), `trustReducer` prop
- `SocialProofBadge.tsx`, `JsonLd.tsx`, `ScrollToTop.tsx`, `PreviewListener.tsx`
- `sections/GenericSection.tsx` — universal Tier 2/3 fallback dla 205+ variants

### `components/showcase/` (15 Tier 1 + infra)
Infrastructure:
- `shared.tsx` — FadeIn, CountUp, CTAButton (reactive do dd.buttonStyle +
  MagneticButton wrap gdy expressive), Eyebrow, ShowcaseImage (z style prop +
  gradeWithAccent overlay), SocialProofBadge (anim-pulse), picks helpers
- `DesignContext.tsx` — `DesignProvider` + `useDesign()` hook
- `designStyles.ts` — 9 helpers: getCardStyle/HoverStyle, getButtonStyle/Radius,
  getImageTreatment, getSectionBg/Padding, getAnimationDelay, shouldAnimate,
  getTypographyStyle
- `TextReveal.tsx` — per-word span z animationDelay stagger
- `MagneticButton.tsx` — mouse-follow transform (expressive CTA only)

Components: HeroImmersive/Split/Minimal, AboutStory, ServicesFeatureGrid/
PricingCards, StatsCounter, TestimonialsCarousel/Grid, GalleryMasonry,
PricingComparison, CTABanner, CTAFloating (**GLOBAL**, nie w SHOWCASE_MAP),
NavbarSmart, FooterMega.

### `lib/`
- `content.ts` — `readPage`, `readPagesManifest`, `extractBusinessData`
- `applyTheme.ts` — `getActiveTheme`, `getThemeStyleObject`,
  `getFaviconUrl`, `getDesignDecisions`
- `designDecisions.ts` — typ + defaults (client-safe, **no `fs`**
  importów — z applyTheme byłby webpack error)
- `markdown.ts` — simple markdown→HTML dla utility pages

## Design Token System

`content/theme.json.tokens` = `Record<string, string>` z 51 kluczami. 
`applyTheme.getThemeStyleObject()` → inline `<html style>`.

**Mapping do Tailwind** w `tailwind.config.ts`:
- `colors: { accent: 'rgb(var(--color-accent) / <alpha-value>)' }`
- `boxShadow: { md: 'var(--shadow-md)' }`
- `borderRadius: { lg: 'var(--radius-lg)' }`

Używając `bg-accent` / `shadow-md` / `rounded-lg` automatycznie reagujesz
na theme change.

**`PreviewListener.tsx`** nadpisuje tokeny przez `postMessage` z CMS —
live preview w iframe bez rebuild.

## Design Decisions (z CMS)

`theme.json.designDecisions` (10 pól) → `<DesignProvider>` w layout →
`useDesign()` hook w Showcase components.

```ts
const dd = useDesign()
const cardStyle = getCardStyle(dd)        // dd.cardStyle
const btnStyle = getButtonStyle(dd, 'primary')  // dd.buttonStyle
const imgStyle = getImageTreatment(dd)    // dd.imageTreatment
```

## Animation gates

Wszystko gated przez `dd.animationLevel`:
- `minimal` — zero animacji (formal/health brands)
- `subtle` — reveals, hover lift, image zoom, link underline
- `expressive` — + parallax bg + TextReveal + MagneticButton + gradient shift

`@media (prefers-reduced-motion: reduce)` w globals.css ZAWSZE override.

## Reguły krytyczne

### Zero hardcoded colors/shadows/spacing
Używaj: `rgb(var(--color-text-primary))`, `var(--shadow-md)`,
`var(--space-section)`. Biały tekst na accent bg? `rgb(var(--color-on-accent))`,
**nie** literally `white`.

### Zero binarek w git
Wszystkie images z URL (Supabase Storage lub Unsplash). Nie commituj
`logo.png` / `favicon.ico`.

### Dynamic imports Showcase
`components/SectionRenderer.tsx` używa `next/dynamic` → 155 kB First Load
mimo 15 components (per-variant chunks loaded only when used).

### Defensive content extraction
```ts
import { pickStr, pickCta, pickHeadline, isValidImage } from './shared'
const heading = pickHeadline(content)  // obsługuje text_array + string
const cta = pickCta(content, 'cta_primary') ?? pickCta(content, 'cta')
```
AI content ma różne field names per variant — pickStr() obsługuje aliasy.

### Utility pages
`[slug]/page.tsx`: `if (page.type === 'utility')` → `markdownToHtml(page.body_content)`.
Bez tego check: crash "Cannot read properties of undefined (reading 'map')".

### page.tsx section rhythm wrap
Sections z własnym bg (`hero_/cta_/footer_/navbar_*`) skipują
`getSectionBg()` wrapper — wrapper by zamaskował ich własne tło.

## Build

```bash
npm install
npm run build   # target: 5/5 static pages, 155 kB First Load
npm run dev
```

Zero env vars wymaganych — wszystko runtime z `content/theme.json`.

## Git workflow

Push do `main` = update template. **NIE propaguje** do istniejących klienckich
repo (każdy klient ma własny snapshot). Force update klientom: regenerate
ich strony w CMS lub manual merge w ich repo.

## Fazy gotowe

- **Faza 1**: Design Token System (51 tokens, 5×3×3 presets)
- **Faza 2**: 15 Showcase Tier 1 components
- **Faza 3**: Visual Intelligence (10 design decisions propagate do wszystkich)
- **Faza 4**: Brand Voice (enforced w ContactForm trustReducer)
- **Faza 5**: Image Intelligence (gradeWithAccent overlay na Heroes/About)
- **Faza 6**: Performance (preconnect, scroll progress, scroll-driven CSS)
- **Custom Animations**: scroll-driven + magnetic + text reveal + ripple

Jeśli user prosi o "dodaj Showcase component X" / "rozszerz animation Y" —
zaproponuj implementację w istniejącej architekturze (shared.tsx +
designStyles helpers + gate przez useDesign).
