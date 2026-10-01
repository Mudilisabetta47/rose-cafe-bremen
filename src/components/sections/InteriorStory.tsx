'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

/* =====================================================================
   INTERIOR STORY — eine eigene sticky Sequenz für den Innenraum.

   Eine einzige Scroll-Timeline, fünf Phasen (Licht → Tisch → Kaffee →
   Menschen → Atmosphäre). Drei Bildebenen mit unterschiedlicher
   Parallax-Geschwindigkeit (Hintergrund am langsamsten, Vordergrund
   am schnellsten) erzeugen die Tiefe — kein DOM-perspective-Trick.
   ===================================================================== */

const PHASES = [
  { key: 'light', label: 'Licht', text: 'Vormittagslicht fällt schräg durchs Fenster und legt sich auf Holz und Porzellan.' },
  { key: 'table', label: 'Tisch', text: 'Jeder Tisch hat seinen eigenen Platz — nah genug für Gespräche, Raum genug zum Ankommen.' },
  { key: 'coffee', label: 'Kaffee', text: 'Der Duft von frisch gemahlenem Kaffee liegt im Raum, bevor die erste Tasse serviert wird.' },
  { key: 'people', label: 'Menschen', text: 'Gäste, die bleiben statt nur vorbeizukommen — das ist der eigentliche Charakter des Hauses.' },
  { key: 'mood', label: 'Atmosphäre', text: 'Warme Töne, leises Geschirrklirren, Rosen auf dem Tresen. Mehr als ein Café.' },
];

export function InteriorStory() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);

  const op0 = usePhaseOpacity(scrollYProgress, 0);
  const op1 = usePhaseOpacity(scrollYProgress, 1);
  const op2 = usePhaseOpacity(scrollYProgress, 2);
  const op3 = usePhaseOpacity(scrollYProgress, 3);
  const op4 = usePhaseOpacity(scrollYProgress, 4);
  const opacities = [op0, op1, op2, op3, op4];

  return (
    <section aria-labelledby="interior-h" className="relative bg-cream">
      <div ref={track} className="story__track" style={{ height: reduced ? 'auto' : '380vh' }}>
        <div className={`story__stage overflow-hidden ${reduced ? 'relative grid h-auto gap-16 py-[var(--section-y)]' : ''}`}>
          <h2 id="interior-h" className="sr-only">
            Mehr als ein Café — die Innenraum-Story
          </h2>

          {!reduced && (
            <>
              {/* Hintergrund — am langsamsten */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20"
                style={{ y: bgY, background: 'linear-gradient(180deg,#efe3d3,#e2d3bc)' }}
              />
              {/* Mittelgrund — Lichtkegel/Möbel-Silhouette */}
              <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ y: midY }}>
                <div
                  className="absolute left-[8%] top-[18%] h-[40vmin] w-[40vmin] rounded-full opacity-60 blur-[2px]"
                  style={{ background: 'radial-gradient(circle at 40% 35%, rgba(201,164,99,.35), transparent 70%)' }}
                />
                <div
                  className="absolute bottom-[10%] right-[10%] h-[30vmin] w-[30vmin] rounded-full opacity-50"
                  style={{ background: 'radial-gradient(circle at 60% 40%, rgba(125,47,58,.22), transparent 70%)' }}
                />
              </motion.div>
              {/* Vordergrund — am schnellsten */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-[6%] bottom-[6%] -z-[5] h-[22vmin] w-[22vmin] rounded-full opacity-40"
                style={{ y: fgY, background: 'radial-gradient(circle at 50% 50%, rgba(184,99,111,.4), transparent 70%)' }}
              />
            </>
          )}

          {PHASES.map((ph, i) => (
            <PhasePanel key={ph.key} phase={ph} index={i} opacity={reduced ? undefined : opacities[i]} reduced={Boolean(reduced)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function usePhaseOpacity(progress: MotionValue<number>, i: number) {
  const n = 5;
  const start = i * (1 / n);
  const end = start + 1 / n;
  const fadeIn = start + 0.025;
  const fadeOut = end - 0.025;
  return useTransform(progress, [start, fadeIn, fadeOut, end], [0, 1, 1, 0]);
}

function PhasePanel({
  phase,
  index,
  opacity,
  reduced,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  opacity?: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <motion.div
      className={reduced ? 'shell grid gap-6 border-t border-line pt-14' : 'shell absolute inset-0 grid content-center gap-6'}
      style={reduced ? undefined : { opacity, pointerEvents: 'none' }}
    >
      <p className="font-mono text-[.66rem] uppercase tracking-[.24em] text-rose-deep">
        {String(index + 1).padStart(2, '0')} · Interior
      </p>
      <h3 className="display text-[clamp(2.2rem,6vw,4.2rem)]" style={{ maxWidth: '12ch' }}>
        {phase.label}
      </h3>
      <p className="max-w-[48ch] text-lead">{phase.text}</p>
    </motion.div>
  );
}
