import { BIZ } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';

const SHOTS = [
  ['cappuccino-latte-art', 'Cappuccino mit Latte Art'],
  ['waffel-cappuccino', 'Waffel mit Cappuccino'],
  ['erdbeerkuchen', 'Rosa Beerenkuchen'],
  ['falafel-teller', 'Falafel-Teller'],
  ['latte-torte-terrasse', 'Latte Macchiato mit Torte'],
  ['burrata-salat', 'Burrata Salat'],
];

export function Instagram() {
  return (
    <section className="section-tight bg-night" aria-labelledby="ig-h">
      <div className="shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow eyebrow-night mb-4">Folgt uns</p>
            <h2 id="ig-h" className="display text-h3 text-bone">
              Rose Café auf Instagram
            </h2>
          </div>
          <a
            href={BIZ.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="tlink text-rose-pale"
            data-cursor="cta"
          >
            {BIZ.instagram} <span aria-hidden="true" className="arw">→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {SHOTS.map(([file, alt], i) => (
            <Reveal key={file} mode="scale" delay={i * 60}>
              <a
                href={BIZ.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square cursor-none overflow-hidden rounded-[14px]"
                data-cursor="media"
                data-cursor-label="INSTAGRAM"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/img/photos/${file}.jpg`}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.08]"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
