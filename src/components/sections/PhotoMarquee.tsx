const P = '/assets/img/photos/';
const ROW_A = [
  ['cappuccino-latte-art', 'Cappuccino mit Latte Art'],
  ['burrata-salat', 'Burrata Salat'],
  ['interior-vitrine', 'Tresen und Kuchenvitrine'],
  ['waffel-cappuccino', 'Waffel mit Cappuccino'],
  ['mezze-hummus', 'Hummus, Oliven und Falafel'],
  ['erdbeerkuchen', 'Rosa Beerenkuchen'],
];
const ROW_B = [
  ['fruehstueck', 'Frühstücksplatte'],
  ['interior-fenster', 'Fensterplätze'],
  ['baiserkuchen', 'Baiserkuchen'],
  ['latte-torte-terrasse', 'Latte Macchiato mit Torte'],
  ['sucuk-fruehstueck', 'Orientalisches Frühstück'],
  ['fassade', 'Eingang Kirchbachstraße'],
];

function Row({ items, reverse }: { items: string[][]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className={`flex w-max gap-4 ${reverse ? 'marquee-rev' : 'marquee-track'}`} style={{ animationDuration: '60s' }}>
        {loop.map(([file, alt], i) => (
          <div key={i} className="h-[clamp(150px,22vw,260px)] w-[clamp(200px,30vw,360px)] flex-none overflow-hidden rounded-[18px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${P}${file}.jpg`} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Zwei gegenläufige Foto-Bänder — reine CSS-Animation, pausiert bei reduzierter Bewegung. */
export function PhotoMarquee() {
  return (
    <section className="grid gap-4 overflow-hidden bg-bone py-[clamp(2.5rem,6vw,5rem)]" aria-label="Eindrücke aus dem Rose Café">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </section>
  );
}
