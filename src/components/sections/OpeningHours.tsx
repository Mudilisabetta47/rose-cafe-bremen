'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { OPENING } from '@/lib/content';
import { useInViewClass } from '@/hooks/useInViewClass';

const DAYS = [
  { idx: 1, short: 'Mo', long: 'Montag' },
  { idx: 2, short: 'Di', long: 'Dienstag' },
  { idx: 3, short: 'Mi', long: 'Mittwoch' },
  { idx: 4, short: 'Do', long: 'Donnerstag' },
  { idx: 5, short: 'Fr', long: 'Freitag' },
  { idx: 6, short: 'Sa', long: 'Samstag' },
  { idx: 0, short: 'So', long: 'Sonntag' },
];

const AXIS_START = 8;
const AXIS_END = 20;
const pct = (h: number) => ((h - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
const pad = (n: number) => String(n).padStart(2, '0');

/** Aktuelle Zeit in Bremen (unabhängig von der Zeitzone des Besuchers). */
function bremenNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: map[get('weekday')] ?? 0, hours: Number(get('hour')) % 24 + Number(get('minute')) / 60 };
}

function status(now: { day: number; hours: number }) {
  const openToday = OPENING.days.includes(now.day);
  if (openToday && now.hours >= OPENING.open && now.hours < OPENING.close) {
    return { open: true, text: `Jetzt geöffnet · schließt um ${pad(OPENING.close)}:00 Uhr` };
  }
  if (openToday && now.hours < OPENING.open) return { open: false, text: `Geschlossen · öffnet heute um ${pad(OPENING.open)}:00 Uhr` };
  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7;
    if (OPENING.days.includes(d)) {
      const name = DAYS.find((x) => x.idx === d)!.long;
      return { open: false, text: `Geschlossen · öffnet ${i === 1 ? 'morgen' : name} um ${pad(OPENING.open)}:00 Uhr` };
    }
  }
  return { open: false, text: 'Geschlossen' };
}

/**
 * ÖFFNUNGSZEITEN — animierte Wochenansicht. Die Balken füllen sich beim
 * Sichtbarwerden gestaffelt von 10:00 bis 18:00, ein Marker zeigt die
 * aktuelle Uhrzeit (nur im Zeitraum der Öffnung), der Live-Status
 * rechnet in Bremer Zeit. Stagger läuft über CSS-Variable --i.
 */
export function OpeningHours() {
  const { ref, inView } = useInViewClass<HTMLDivElement>('0px 0px -10% 0px');
  const [now, setNow] = useState<{ day: number; hours: number } | null>(null);

  useEffect(() => {
    setNow(bremenNow());
    const t = window.setInterval(() => setNow(bremenNow()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const st = now ? status(now) : null;
  const barLeft = pct(OPENING.open);
  const barWidth = pct(OPENING.close) - pct(OPENING.open);

  return (
    <div ref={ref} className="grid gap-5">
      <div className="flex items-center gap-3" aria-live="polite">
        <span className="relative grid h-3 w-3 place-items-center" aria-hidden="true">
          {st?.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50" />}
          <span className={`relative h-2.5 w-2.5 rounded-full ${st ? (st.open ? 'bg-emerald-500' : 'bg-rose-deep/70') : 'bg-fg-mute/40'}`} />
        </span>
        <p className="font-mono text-[.8rem] uppercase tracking-[.14em] text-ink">{st ? st.text : 'Dienstag – Sonntag · 10:00 – 18:00 Uhr'}</p>
      </div>

      <ul className="grid gap-1">
        {DAYS.map((d, i) => {
          const isOpen = OPENING.days.includes(d.idx);
          const isToday = now?.day === d.idx;
          const showNow = isToday && isOpen && now && now.hours >= OPENING.open && now.hours < OPENING.close;
          return (
            <li
              key={d.idx}
              className={`grid grid-cols-[2.4rem_1fr_6.6rem] items-center gap-3 rounded-[10px] px-2 py-2 transition-colors duration-500 ${
                isToday ? 'bg-rose/10' : ''
              }`}
              style={{ ['--i' as string]: i } as CSSProperties}
            >
              <span className={`font-mono text-[.78rem] uppercase tracking-[.12em] ${isToday ? 'text-rose-deep' : 'text-fg-mute'}`}>
                <abbr title={d.long} className="no-underline">{d.short}</abbr>
              </span>

              <div className="relative h-[10px] overflow-hidden rounded-full bg-ink/[.07]" aria-hidden="true">
                {isOpen && (
                  <div
                    className="absolute inset-y-0 origin-left rounded-full bg-[linear-gradient(90deg,#b8636f,#7d2f3a)] transition-transform duration-[1100ms] ease-cinematic"
                    style={{
                      left: `${barLeft}%`,
                      width: `${barWidth}%`,
                      transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                      transitionDelay: `${i * 90 + 150}ms`,
                    }}
                  />
                )}
                {showNow && now && (
                  <span
                    className="absolute top-1/2 h-[14px] w-[3px] -translate-y-1/2 rounded bg-ink"
                    style={{ left: `${pct(now.hours)}%` }}
                  />
                )}
              </div>

              <span
                className={`text-right font-mono text-[.8rem] tabular-nums transition-all duration-700 ease-cinematic ${
                  isOpen ? 'text-ink' : 'text-fg-mute'
                } ${inView ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`}
                style={{ transitionDelay: `${i * 90 + 500}ms` }}
              >
                {isOpen ? `${pad(OPENING.open)}:00–${pad(OPENING.close)}:00` : 'Ruhetag'}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="grid grid-cols-[2.4rem_1fr_6.6rem] gap-3 px-2 font-mono text-[.62rem] tracking-[.1em] text-fg-mute" aria-hidden="true">
        <span />
        <div className="relative h-4">
          {[8, 10, 12, 14, 16, 18, 20].map((h) => (
            <span key={h} className="absolute -translate-x-1/2" style={{ left: `${pct(h)}%` }}>
              {h}
            </span>
          ))}
        </div>
        <span />
      </div>
    </div>
  );
}
