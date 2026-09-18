# Rose Café Bremen — Website

Premium-Website für das Rose Café in Bremen-Schwachhausen (Next.js 15, React 19, Tailwind, Framer Motion, Lenis).

## Entwickeln

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statischer Export nach out/
```

## Inhalte pflegen

Alles Inhaltliche steht in `src/lib/content.ts`:

- `BIZ` — Adresse, Telefon, E-Mail, Öffnungszeiten (noch Platzhalter in eckigen Klammern)
- `MENU_CATEGORIES` — die Speisekarte (aus der Original-Speisekarte übernommen)
- `REVIEWS` — Bewertungen (Platzhalter, durch echte ersetzen)
- `FAQS`, `GALLERY`, `SIGNATURE`

Vor dem Livegang ersetzen: Platzhalter in `BIZ`, Reviews, Impressum/Datenschutz, Galerie-/Menübilder (aktuell gemalte Illustrationen), Logo (aktuell Vektor-Nachbau in `src/components/layout/Brand.tsx`), `SITE_URL`.

## Architektur (Motion Engine)

- `src/components/core/` — Smooth Scroll (Lenis), Custom Cursor, Loader, Scroll-Progress
- `src/components/scene/CafeCanvas.tsx` — Canvas-2D-Szene mit eigener Lochkamera-Projektion, alles reine Funktion des Scroll-Fortschritts
- `src/components/sections/` — Hero, Story, Menü, Signature, Horizontal, Galerie, Reviews, Reservierung
- `src/components/ui/` — Reveal-Engine, Text-Splitting, Magnetic Buttons
- `src/lib/easing.ts` — Easing-Kurven; `src/app/globals.css` — Design-Tokens & Sticky-Story-Mechanik
- `prefers-reduced-motion` schaltet Smooth Scroll, Sticky-Stories und Canvas-Animation ab.
