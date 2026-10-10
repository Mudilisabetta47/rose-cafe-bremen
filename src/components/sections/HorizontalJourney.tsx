'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const P = '/assets/img/photos/';
const STOPS = [
  { key: 'coffee', label: 'Kaffee', tone: '#c9a463', src: P + 'latte-macchiato.jpg', alt: 'Latte Macchiato und Cappuccino' },
  { key: 'breakfast', label: 'Frühstück', tone: '#e9c9c9', src: P + 'fruehstueck.jpg', alt: 'Frühstücksplatte mit Rührei' },
  { key: 'cake', label: 'Kuchen', tone: '#b8636f', src: P + 'kuchen-cappuccino.jpg', alt: 'Kuchenstück mit Cappuccino' },
  { key: 'dessert', label: 'Eiskaffee', tone: '#7d2f3a', src: P + 'eiskaffee.jpg', alt: 'Eiskaffee mit Sahne und Erdbeere' },
  { key: 'atmosphere', label: 'Atmosphäre', tone: '#8d7a6d', src: P + 'interior-fenster.jpg', alt: 'Fensterplätze im Rose Café' },
  { key: 'rose', label: 'Rose Café', tone: '#b8636f', src: P + 'aussenbereich.jpg', alt: 'Außenbereich des Rose Café' },
];

/**
 * HORIZONTAL SCROLL STORY — während vertikal gescrollt wird, läuft der
 * Inhalt horizontal durch. Die Section bleibt sticky, der Fortschritt
 * kommt aus derselben Scroll-Timeline wie überall sonst.
 */
export function HorizontalJourney() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  /* translateX-Prozente beziehen sich auf die eigene (aufsummierte) Breite
     des Flex-Containers, nicht auf die Viewport-Breite — deshalb in vw
     rechnen, nicht in %. */
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(STOPS.length - 1) * 100}vw`]);

  if (reduced) {
    return (
      <section aria-label="Reise durch Rose Café" className="section-tight bg-cream">
        <div className="shell no-scrollbar flex snap-x gap-4 overflow-x-auto pb-4">
          {STOPS.map((s) => (
            <Stop key={s.key} stop={s} className="w-[78vw] flex-none snap-center sm:w-[360px]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Reise durch Rose Café" className="relative bg-cream">
      <div ref={track} className="story__track" style={{ height: `${STOPS.length * 100}vh` }}>
        <div className="story__stage flex items-center overflow-hidden">
          <motion.div className="flex" style={{ x }}>
            {STOPS.map((s) => (
              <div key={s.key} className="grid w-screen flex-none place-items-center px-[var(--pad)]">
                <Stop stop={s} className="w-full max-w-[560px]" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stop({ stop, className }: { stop: (typeof STOPS)[number]; className?: string }) {
  return (
    <div className={className}>
      <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-[24px]" style={{ background: stop.tone + '33' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={stop.src} alt={stop.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <p className="font-mono text-[.62rem] uppercase tracking-[.24em] text-fg-mute">Station</p>
      <h3 className="display mt-1 text-h3">{stop.label}</h3>
    </div>
  );
}
