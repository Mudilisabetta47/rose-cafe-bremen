'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FEATURED } from '@/lib/content';

type Dish = (typeof FEATURED)[number];

/**
 * FOOD SHOWCASE — einzelne Gerichte füllen den ganzen Bildschirm.
 * Pro Gericht eine eigene Scroll-Timeline: Bild zoomt langsam, danach
 * erscheinen nacheinander Kategorie → Name → Beschreibung → Preis → CTA.
 * Alle Angaben stammen 1:1 aus der Speisekarte.
 */
export function FoodShowcase() {
  return (
    <div aria-label="Gerichte im Rose Café">
      {FEATURED.map((d, i) => (
        <FoodMoment key={d.key} dish={d} index={i} />
      ))}
    </div>
  );
}

function FoodMoment({ dish, index }: { dish: Dish; index: number }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: track, offset: ['start start', 'end end'] });

  const imgScale = useTransform(p, [0, 1], [1.02, 1.22]);
  const imgY = useTransform(p, [0, 1], ['0%', '-5%']);
  const labelO = useTransform(p, [0.08, 0.2], [0, 1]);
  const nameO = useTransform(p, [0.16, 0.3], [0, 1]);
  const nameY = useTransform(p, [0.16, 0.3], [40, 0]);
  const noteO = useTransform(p, [0.3, 0.44], [0, 1]);
  const priceO = useTransform(p, [0.44, 0.56], [0, 1]);
  const priceY = useTransform(p, [0.44, 0.56], [24, 0]);
  const ctaO = useTransform(p, [0.56, 0.68], [0, 1]);

  if (reduced) {
    return (
      <section className="relative bg-night py-[var(--section-y)]">
        <div className="shell grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dish.src} alt={dish.alt} loading="lazy" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
          <DishText dish={dish} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-night">
      <div ref={track} className="story__track" style={{ height: '230vh' }}>
        <div className="story__stage">
          <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dish.src} alt={dish.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover" />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,15,13,.35),transparent_35%,rgba(20,15,13,.88)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 pb-[clamp(2.5rem,9vh,6rem)]" style={{ paddingInline: 'var(--pad)' }}>
            <div className="mx-auto max-w-shell">
              <motion.p className="eyebrow eyebrow-night mb-4" style={{ opacity: labelO }}>
                {dish.label}
              </motion.p>
              <motion.h3 className="display text-[clamp(2.4rem,8vw,6.5rem)] text-bone" style={{ opacity: nameO, y: nameY }}>
                {dish.name}
              </motion.h3>
              <motion.p className="mt-4 max-w-[46ch] text-lead text-bone/75" style={{ opacity: noteO }}>
                {dish.note}
              </motion.p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <motion.span className="font-mono text-[1.4rem] tracking-[.06em] text-rose-pale" style={{ opacity: priceO, y: priceY }}>
                  {dish.price}
                </motion.span>
                <motion.div style={{ opacity: ctaO }}>
                  <Link href="#food" className="tlink text-bone" data-cursor="special" data-cursor-label="EXPLORE">
                    Zur Speisekarte <span aria-hidden="true" className="arw">→</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DishText({ dish }: { dish: Dish }) {
  return (
    <div>
      <p className="eyebrow eyebrow-night mb-4">{dish.label}</p>
      <h3 className="display text-[clamp(2.2rem,6vw,4.5rem)] text-bone">{dish.name}</h3>
      <p className="mt-4 max-w-[46ch] text-lead text-bone/75">{dish.note}</p>
      <p className="mt-5 font-mono text-[1.3rem] text-rose-pale">{dish.price}</p>
    </div>
  );
}
