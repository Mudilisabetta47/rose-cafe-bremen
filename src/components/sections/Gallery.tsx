'use client';

import { GALLERY, type GalleryItem } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import { Slug } from '@/components/ui/Slug';

const SIZE_CLS: Record<GalleryItem['size'], string> = {
  sm: 'md:col-span-3 aspect-[4/5]',
  md: 'md:col-span-4 aspect-[3/4]',
  lg: 'md:col-span-5 aspect-[4/3]',
};

const MODE_BY_FROM: Record<GalleryItem['from'], 'mask' | 'up' | 'mask-fast'> = {
  left: 'mask',
  right: 'mask-fast',
  up: 'up',
};

/**
 * INTERAKTIVE GALERIE — asymmetrisches Editorial-Grid mit den echten
 * Fotos des Rose Café. Mask-Reveals von unterschiedlichen Seiten,
 * Custom-Cursor-Label VIEW, Hover-Zoom.
 */
export function Gallery() {
  return (
    <section id="atmosphere" className="section bg-bone" aria-labelledby="gallery-h">
      <div className="shell">
        <Slug left="Atmosphäre" right="Rose Café · Bremen" />
        <p className="eyebrow mb-6">Ein Blick hinein</p>
        <h2 id="gallery-h" className="display mb-12 text-h2" style={{ maxWidth: '16ch' }}>
          Kaffee, Kuchen, Platz zum Bleiben.
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {GALLERY.map((item) => (
            <Reveal key={item.key} mode={MODE_BY_FROM[item.from]} className={SIZE_CLS[item.size]}>
              <figure
                className="group relative h-full w-full cursor-none overflow-hidden rounded-[20px] bg-cream"
                data-cursor="media"
                data-cursor-label="VIEW"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-2 font-mono text-[.68rem] uppercase tracking-[.16em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
