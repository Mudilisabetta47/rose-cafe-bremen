'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { clamp, easeInOutCubic, lerp } from '@/lib/easing';

const P = '/assets/img/photos/';
const FRAMES = [
  { src: P + 'aussenbereich.jpg', alt: 'Außenbereich des Rose Café', label: 'Ankommen' },
  { src: P + 'interior-saeule.jpg', alt: 'Innenraum mit Tresen und Pendelleuchten', label: 'Der Raum' },
  { src: P + 'cappuccino-latte-art.jpg', alt: 'Cappuccino mit Latte Art', label: 'Kaffee' },
  { src: P + 'erdbeerkuchen.jpg', alt: 'Stück rosa Beerenkuchen', label: 'Kuchen' },
  { src: P + 'waffel-espresso.jpg', alt: 'Waffel mit Erdbeeren und Espresso', label: 'Waffeln' },
];

/**
 * CAFÉ IN MOTION — echte Fotos gehen beim Scrollen ineinander über:
 * jedes neue Bild öffnet sich per Clip-Path-Maske über dem vorherigen,
 * während alle Bilder langsam zoomen. Reine Funktion des Scroll-
 * Fortschritts: exakt reversibel, exakt einfrierbar.
 */
export function CafeInMotion() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', setP);

  const n = FRAMES.length;
  const pos = clamp(p) * (n - 1); // 0 … n-1
  const active = Math.min(n - 1, Math.round(pos));

  if (reduced) {
    return (
      <section className="section-tight bg-night" aria-label="Café in Motion">
        <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMES.map((f) => (
            <figure key={f.src} className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Café in Motion" className="relative bg-night">
      <div ref={track} className="story__track" style={{ height: `${n * 90 + 60}vh` }}>
        <div className="story__stage bg-night">
          {FRAMES.map((f, i) => {
            const enter = i === 0 ? 1 : easeInOutCubic(clamp(pos - (i - 1)));
            const age = clamp(pos - (i - 1), 0, 2.2) + (i === 0 ? clamp(pos) : 0);
            const scale = lerp(1.22, 1.02, clamp(age / 2.2));
            return (
              <motion.div
                key={f.src}
                aria-hidden={i !== active}
                className="absolute inset-0 will-change-transform"
                style={{ zIndex: i, clipPath: `inset(${(1 - enter) * 100}% 0 0 0)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ transform: `scale(${scale.toFixed(4)})` }}
                />
              </motion.div>
            );
          })}

          <div className="pointer-events-none absolute inset-0 z-[20] bg-[linear-gradient(180deg,rgba(20,15,13,.55),transparent_30%,transparent_55%,rgba(20,15,13,.8))]" />

          <div className="absolute inset-x-0 bottom-0 z-[30] pb-[clamp(2rem,6vh,4rem)]" style={{ paddingInline: 'var(--pad)' }}>
            <div className="mx-auto flex max-w-shell items-end justify-between gap-6">
              <div>
                <p className="eyebrow eyebrow-night mb-3">Café in Motion</p>
                <p className="display text-[clamp(2.4rem,7vw,5.5rem)] text-bone">{FRAMES[active].label}</p>
              </div>
              <p className="font-mono text-[.78rem] tabular-nums tracking-[.2em] text-bone/60">
                {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
