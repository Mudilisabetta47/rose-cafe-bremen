import Link from 'next/link';

/**
 * Wortmarke — das echte Rose-Café-Logo (Hexagon + Kaffeetasse + Schriftzug),
 * schwarz auf transparent. Für dunkle Flächen (Hero, Footer, Loader) wird
 * es per CSS-Filter auf Weiß invertiert statt eine zweite Datei zu pflegen.
 */
export function Brand({ compact = false, night = false }: { compact?: boolean; night?: boolean } = {}) {
  const height = compact ? 30 : 38;
  return (
    <Link
      href="/"
      className="flex flex-none cursor-none items-center gap-3"
      aria-label="Rose Café Bremen – zur Startseite"
      data-cursor="cta"
      data-cursor-label="HOME"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/img/logo.png"
        alt="Rose Café"
        height={height}
        className="w-auto flex-none transition-[height,filter] duration-500 ease-cinematic"
        style={{ height, filter: night ? 'invert(1) brightness(1.15)' : 'none' }}
      />
      <span
        aria-hidden="true"
        className={`hidden self-stretch border-l pl-3 font-mono text-[.6rem] uppercase tracking-[.26em] sm:flex sm:items-center ${
          night ? 'border-bone/25 text-bone/60' : 'border-ink/15 text-fg-mute'
        }`}
      >
        Bremen
      </span>
    </Link>
  );
}

/** Nur das Tassen-Icon aus dem Logo (goldene App-Icon-Variante) — für Loader und kleine Flächen. */
export function RoseCafeBadge({
  size = 120,
  tone = 'gold',
  className,
}: {
  size?: number;
  tone?: 'gold' | 'ink' | 'bone';
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/img/icon.png"
      alt="Rose Café"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        filter: tone === 'ink' ? 'grayscale(1) brightness(.2)' : tone === 'bone' ? 'grayscale(1) invert(1)' : 'none',
      }}
    />
  );
}
