'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { clamp, easeOutCubic, lerp } from '@/lib/easing';

/* =====================================================================
   SIGNATURE ROSE ANIMATION — das markenspezifische Bewegungsmotiv.

   Fünf Blütenblätter fliegen beim Scrollen aus unterschiedlichen
   Richtungen zusammen und formen exakt das Rose-Café-Signet. Reine
   Funktion des Scroll-Fortschritts p (0…1) — kein Zeit-Tween, exakt
   reversibel beim Hochscrollen, exakt einfrierbar beim Stehenbleiben.

   Dient zugleich als Section-Transition: am Ende zieht sich die
   Bühne zurück (Scale + Radius) und übergibt an die helle Content-Ebene.
   ===================================================================== */

const PETALS = [0, 72, 144, 216, 288]; // Grad, wie im Logo

export function SignatureRoseReveal() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [p, setP] = useState(0.05);

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', setP);

  const stageScale = useTransform(scrollYProgress, [0.82, 1], [1, 0.9]);
  const stageRadius = useTransform(scrollYProgress, [0.82, 1], [0, 40]);

  const assemble = easeOutCubic(clamp(p / 0.62));
  const wordOpacity = clamp((p - 0.62) / 0.16);
  const retreatGlow = 1 - clamp((p - 0.82) / 0.18);

  return (
    <section className="relative bg-night" aria-hidden="true">
      <div ref={track} className="story__track" style={{ height: reduced ? '70vh' : '160vh' }}>
        <motion.div
          className={`story__stage stage-retreat grid place-items-center ${reduced ? 'relative h-[70vh]' : ''}`}
          style={reduced ? undefined : { scale: stageScale, borderRadius: stageRadius }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: reduced ? 0.6 : retreatGlow,
              background: 'radial-gradient(45% 45% at 50% 48%, rgba(184,99,111,.22), transparent 70%)',
            }}
          />

          <div className="relative grid place-items-center gap-8">
            <svg width="220" height="220" viewBox="-110 -110 220 220" aria-hidden="true">
              {PETALS.map((angle, i) => {
                const a = reduced ? angle : angle + lerp(46, 0, assemble);
                const radius = reduced ? 9 : lerp(230, 9, assemble);
                const rad = (a * Math.PI) / 180;
                const cx = Math.cos(rad) * radius;
                const cy = Math.sin(rad) * radius;
                const opacity = reduced ? 0.9 : clamp(p / 0.18) * (0.55 + 0.35 * assemble);
                return (
                  <ellipse
                    key={angle}
                    cx={cx}
                    cy={cy}
                    rx={16}
                    ry={12.8}
                    transform={`rotate(${a} ${cx} ${cy})`}
                    fill={i % 2 === 0 ? '#c47786' : '#b8636f'}
                    opacity={opacity}
                  />
                );
              })}
              <circle cx={0} cy={0} r={7} fill="#e9c9c9" opacity={reduced ? 1 : clamp(p / 0.3)} />
            </svg>

            <div style={{ opacity: reduced ? 1 : wordOpacity }} className="text-center">
              <p className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-medium tracking-[.03em] text-bone">
                ROSE CAFÉ
              </p>
              <p className="mt-2 font-mono text-[.64rem] uppercase tracking-[.3em] text-rose-pale/70">Bremen</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
