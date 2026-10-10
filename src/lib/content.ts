/**
 * Zentrale Inhaltsquelle für ROSE CAFÉ, Bremen.
 * Alles, was ohne Code-Änderung gepflegt werden soll, steht hier.
 *
 * WICHTIG: Öffnungszeiten, Telefonnummer, Adresse, Bewertungen und Preise
 * sind Platzhalter und MÜSSEN vor Livegang durch echte Daten ersetzt werden.
 * Es wurden bewusst keine Zahlen oder Zitate erfunden.
 */

export const SITE_URL = 'https://rose-cafe-bremen.de';

export const BIZ = {
  name: 'Rose Café Bremen',
  short: 'ROSE CAFÉ',
  street: 'Kirchbachstraße 200',
  zip: '28211',
  city: 'Bremen',
  district: 'Schwachhausen',
  phoneDisplay: '0421 89752323',
  phoneLink: '+4942189752323',
  /** TODO vor Livegang: echte E-Mail-Adresse eintragen (aktuell Platzhalter). */
  email: 'info@rose-cafe-bremen.de',
  /** Öffnungszeiten laut Inhaber: Dienstag bis Sonntag, 10:00 – 18:00 Uhr. */
  hours: [{ d: 'Dienstag – Sonntag', t: '10:00 – 18:00' }],
  instagram: '@rosecafe_bremen1',
  instagramHref: 'https://www.instagram.com/rosecafe_bremen1/',
} as const;

/** Öffnungszeiten als Daten (0 = Sonntag … 6 = Samstag), für Animation, Live-Status und Schema. */
export const OPENING = { open: 10, close: 18, days: [2, 3, 4, 5, 6, 0] as number[] };

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: 'Story', href: '#story' },
  { label: 'Frühstück', href: '#food' },
  { label: 'Signature', href: '#signature' },
  { label: 'Atmosphäre', href: '#atmosphere' },
  { label: 'Bewertungen', href: '#reviews' },
  { label: 'Besuch uns', href: '#visit' },
];

/* =====================================================================
   FOOD STORY — die Speisekarte als Szenenfolge, nicht als Tabelle.
   Jede Phase bekommt Kamera-Fokus, eigene Lichtstimmung und Typografie.
   ===================================================================== */

/**
 * Die Speisekarte — 1:1 aus der Original-Speisekarte des Rose Café
 * übernommen (Gerichte, Preise, Beschreibungen). Keine erfundenen
 * Inhalte. Bei fehlenden Angaben (z. B. Brunch-Preise) steht ein
 * ausdrücklicher Platzhalter statt einer Zahl.
 */
export type MenuItem = { name: string; price?: string; note?: string };
export type MenuCategory = {
  key: string;
  num: string;
  title: string;
  tone: 'dawn' | 'roast' | 'sugar' | 'signature' | 'green' | 'drink';
  intro?: string;
  items: MenuItem[];
  footnote?: string;
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    key: 'kaffee',
    num: '01',
    title: 'Kaffee',
    tone: 'roast',
    items: [
      { name: 'Espresso', price: '2,50 €' },
      { name: 'Espresso Doppelt', price: '3,50 €' },
      { name: 'Espresso Macchiato', price: '3,60 €' },
      { name: 'Americano', price: '3,00 €' },
      { name: 'Flat White', price: '4,50 €' },
      { name: 'Cappuccino', price: '4,20 €' },
      { name: 'Latte Macchiato', price: '4,50 €' },
      { name: 'Café con Leche', price: '3,50 €' },
      { name: 'Rose Latte', price: '4,90 €' },
      { name: 'Orientalisches Mocca', price: '3,00 €' },
      { name: 'Heiße Schokolade', price: '4,90 €' },
      { name: 'Chai Latte', price: '4,90 €' },
      { name: 'Café Crema', price: '2,50 €' },
    ],
  },
  {
    key: 'heissgetraenke',
    num: '02',
    title: 'Heißgetränke',
    tone: 'dawn',
    items: [
      { name: 'Schwarzer Tee', price: '3,00 €' },
      { name: 'Grüner Tee', price: '3,50 €' },
      { name: 'Frischer Minztee', price: '4,20 €' },
      { name: 'Rooibos Tee', price: '3,50 €' },
      { name: 'Ingwer-Tee', price: '4,20 €' },
      { name: 'Zitronen-Tee', price: '4,20 €' },
      { name: 'Vitaminbombe', price: '5,90 €' },
      { name: 'Capu-Schock', price: '4,80 €' },
    ],
  },
  {
    key: 'extras',
    num: '03',
    title: 'Extras & Milch',
    tone: 'dawn',
    items: [
      { name: 'Extra Shot Espresso', price: '1,00 €' },
      { name: 'Haferdrink', price: '0,50 €' },
      { name: 'Laktosefreie Milch', price: '0,50 €' },
    ],
  },
  {
    key: 'fruehstueck',
    num: '04',
    title: 'Frühstück',
    tone: 'dawn',
    items: [
      {
        name: 'Frühstück für eine Person',
        price: '15,95 €',
        note: 'Zwei knusprige Brötchen, serviert mit Butter, gekochtem Ei, Gouda, Schinken, Bacon sowie einer Auswahl an Marmelade und Honig.',
      },
      {
        name: 'Frühstücksplatte für zwei Personen',
        price: '35,90 €',
        note: 'Vier frische Brötchen, dazu eine feine Auswahl an Käse und Schinken. Frisch zubereitetes Rührei. Für den süßen Genuss Butter, Marmelade, Honig, Nutella sowie eine Auswahl an cremigen Aufstrichen.',
      },
    ],
  },
  {
    key: 'orientalisch',
    num: '05',
    title: 'Orientalisches Frühstück',
    tone: 'dawn',
    items: [
      {
        name: 'Omelette mit Sucuk',
        price: '12,90 €',
        note: 'Sucuk (Knoblauchwurst), Paprika und Tomaten, gebraten mit Eiern und Kräutern – in der Pfanne serviert mit frischem Brot.',
      },
      {
        name: 'Menemen',
        price: '12,90 €',
        note: 'Türkisches Rührei mit Gemüse: Eier, Zwiebeln und Tomaten, leicht gewürzt, in der Pfanne geschmort. Auf Wunsch mit frischer Chili. Serviert mit Brot zum Dippen.',
      },
    ],
  },
  {
    key: 'hauptgerichte',
    num: '06',
    title: 'Hauptgerichte',
    tone: 'green',
    items: [
      { name: 'Wechselnde Tagesgerichte', price: 'ab 10,90 €', note: 'Auch vegane und glutenfreie Speisen erhältlich (siehe Wochenkarte).' },
      { name: 'Hausgemachte Linsensuppe', price: '5,90 €' },
      { name: 'Falafel-Teller', price: '10,90 €', note: 'Mit Hummus und einem gemischten Salat serviert.' },
      {
        name: 'Falafel Bowl',
        price: '13,90 €',
        note: 'Serviert mit Salat, Reis, Hummus, frischem Gemüse, Kräutern und einem hausgemachten Dressing. Dazu knusprige Falafel.',
      },
      { name: 'Mujadara', price: '9,90 €', note: 'Linsen und Reis mit knusprigen Röstzwiebeln, serviert mit frischem Joghurt.' },
      { name: 'Hähnchenschnitzel', price: '13,90 €', note: 'Serviert mit Basmati-Reis, frischem Salat und einer hausgemachten Sauce.' },
      { name: 'Falafel-To-Go-Wrap', price: '9,90 €', note: 'Frisch gerollt mit knusprigen Falafel, Salat, Gemüse, Hummus und einer hausgemachten Sauce.' },
      {
        name: 'Schnitzel mit Pommes',
        price: '14,90 €',
        note: 'Knusprig paniertes Schnitzel, serviert mit knusprigen Pommes frites. Auf Wunsch auch mit Jägersoße oder Rahmsoße.',
      },
    ],
  },
  {
    key: 'salate',
    num: '07',
    title: 'Salate',
    tone: 'green',
    items: [
      { name: 'Burrata Salat', price: '10,90 €', note: 'Serviert mit cremigem Burrata, frischem Rucola, Cherrytomaten, Balsamico-Dressing und knusprigem Brot.' },
      { name: 'Gemischter Salat', price: '8,90 €', note: 'Frisch zubereitet mit verschiedenen Blattsalaten, Tomaten, Gurken, Paprika und einem hausgemachten Dressing.' },
      { name: 'Obstsalat', price: '10,90 €', note: 'Frisch geschnittenes, saisonales Obst – eine leichte und erfrischende Wahl.' },
    ],
  },
  {
    key: 'suesses',
    num: '08',
    title: 'Süßes',
    tone: 'sugar',
    items: [{ name: 'Hausgemachter Kuchen', price: 'ab 3,80 €', note: 'Auch vegan und glutenfrei erhältlich.' }],
  },
  {
    key: 'waffeln',
    num: '09',
    title: 'Waffeln',
    tone: 'sugar',
    items: [
      { name: 'Waffel mit Puderzucker', price: '4,50 €' },
      { name: 'Waffel mit heißen Kirschen', price: '7,90 €', note: 'Serviert mit Kirschen und Sahne.' },
      { name: 'Waffel mit heißer Schokolade', price: '6,90 €', note: 'Auf Wunsch mit Nutella und Sahne — zzgl. 0,50 €.' },
    ],
    footnote: 'Auch to go möglich.',
  },
  {
    key: 'softdrinks',
    num: '10',
    title: 'Softdrinks',
    tone: 'drink',
    items: [
      { name: 'Coca Cola', price: '3,00 €' },
      { name: 'Sprite', price: '3,00 €' },
      { name: 'Fanta', price: '3,00 €' },
      { name: 'Mezzo Mix', price: '3,00 €' },
      { name: 'ViO Wasser (mit Kohlensäure / still)', price: '3,00 €' },
      { name: 'Vita Malz', price: '3,00 €' },
      { name: 'Fritz, diverse Sorten', price: '3,00 €' },
    ],
    footnote: 'zzgl. Pfand.',
  },
  {
    key: 'brunch',
    num: '11',
    title: 'Brunch',
    tone: 'signature',
    intro: 'Brunch jeden Sonntag, 10:00 – 12:00 Uhr — nur mit Reservierung. Die Sitzplätze sind begrenzt; ohne Reservierung kann kein Platz garantiert werden.',
    items: [
      { name: 'Erwachsene', price: 'Preis pro Person — auf Anfrage' },
      { name: 'Kinder', price: 'Preis pro Person — auf Anfrage' },
    ],
  },
  {
    key: 'veranstaltungen',
    num: '12',
    title: 'Veranstaltungen',
    tone: 'signature',
    intro: 'Für private Feiern und Veranstaltungen im Rose Café sprechen Sie uns gerne persönlich oder telefonisch an.',
    items: [],
  },
];

/* =====================================================================
   SIGNATURE PRODUCT — der eine Hauptdarsteller.
   ===================================================================== */

export const SIGNATURE = {
  eyebrow: 'Rose Café Signature',
  name: 'Rose Latte',
  description: 'Das Signature-Getränk des Hauses.',
  price: '4,90 €',
};

/* =====================================================================
   GALERIE / ATMOSPHÄRE — Platzhalterbilder werden per data-tone gemalt,
   bis echtes Bildmaterial vorliegt (siehe README).
   ===================================================================== */

export type GalleryItem = {
  key: string;
  src: string;
  alt: string;
  caption: string;
  size: 'sm' | 'md' | 'lg';
  from: 'left' | 'right' | 'up';
};

/** Fotos aus dem Google-Eintrag des Rose Café (public/assets/img/photos). */
const P = '/assets/img/photos/';
export const GALLERY: GalleryItem[] = [
  { key: 'g1', src: P + 'interior-saeule.jpg', alt: 'Innenraum des Rose Café mit Tresen und Pendelleuchten', caption: 'Der Raum', size: 'lg', from: 'left' },
  { key: 'g2', src: P + 'cappuccino-latte-art.jpg', alt: 'Cappuccino mit Latte Art', caption: 'Cappuccino', size: 'sm', from: 'right' },
  { key: 'g3', src: P + 'interior-fenster.jpg', alt: 'Fensterplätze im Rose Café', caption: 'Am Fenster', size: 'md', from: 'up' },
  { key: 'g4', src: P + 'erdbeerkuchen.jpg', alt: 'Stück rosa Beerenkuchen', caption: 'Kuchen', size: 'sm', from: 'left' },
  { key: 'g5', src: P + 'fruehstueck.jpg', alt: 'Frühstücksplatte mit Rührei', caption: 'Frühstück', size: 'md', from: 'right' },
  { key: 'g6', src: P + 'aussenbereich.jpg', alt: 'Außenbereich des Rose Café', caption: 'Draußen sitzen', size: 'lg', from: 'up' },
  { key: 'g7', src: P + 'burrata-salat.jpg', alt: 'Burrata Salat mit Erdbeeren', caption: 'Burrata Salat', size: 'md', from: 'left' },
  { key: 'g8', src: P + 'waffel-cappuccino.jpg', alt: 'Waffel mit Puderzucker und Cappuccino', caption: 'Waffeln', size: 'sm', from: 'right' },
  { key: 'g9', src: P + 'falafel-teller.jpg', alt: 'Falafel-Teller mit Hummus und Salat', caption: 'Falafel-Teller', size: 'lg', from: 'left' },
  { key: 'g10', src: P + 'baiserkuchen.jpg', alt: 'Baiserkuchen mit Mandeln', caption: 'Hausgemachter Kuchen', size: 'sm', from: 'up' },
  { key: 'g11', src: P + 'mezze-hummus.jpg', alt: 'Hummus, Oliven und Falafel', caption: 'Orientalisch', size: 'md', from: 'right' },
  { key: 'g12', src: P + 'fassade.jpg', alt: 'Eingang des Rose Café in der Kirchbachstraße', caption: 'Kirchbachstraße 200', size: 'md', from: 'up' },
];

/** Gerichte für die Vollbild-Showcase — Name und Preis 1:1 aus der Speisekarte. */
export const FEATURED = [
  { key: 'falafel', src: P + 'falafel-teller.jpg', alt: 'Falafel-Teller mit Hummus und Salat', label: 'Hauptgerichte', name: 'Falafel-Teller', price: '10,90 €', note: 'Mit Hummus und einem gemischten Salat serviert.', cat: 'hauptgerichte' },
  { key: 'burrata', src: P + 'burrata-salat.jpg', alt: 'Burrata Salat mit Erdbeeren', label: 'Salate', name: 'Burrata Salat', price: '10,90 €', note: 'Serviert mit cremigem Burrata, frischem Rucola, Cherrytomaten, Balsamico-Dressing und knusprigem Brot.', cat: 'salate' },
  { key: 'sucuk', src: P + 'sucuk-fruehstueck.jpg', alt: 'Orientalisches Frühstück mit Sucuk und Rührei', label: 'Orientalisches Frühstück', name: 'Omelette mit Sucuk', price: '12,90 €', note: 'Sucuk, Paprika und Tomaten, gebraten mit Eiern und Kräutern – serviert mit frischem Brot.', cat: 'orientalisch' },
  { key: 'waffel', src: P + 'waffel-cappuccino.jpg', alt: 'Waffel mit Puderzucker und Cappuccino', label: 'Waffeln', name: 'Waffel mit Puderzucker', price: '4,50 €', note: 'Auch to go möglich.', cat: 'waffeln' },
] as const;

/** Foto je Speisekarten-Kategorie (nur wo ein echtes Foto existiert). */
export const MENU_PHOTOS: Record<string, { src: string; alt: string }> = {
  kaffee: { src: P + 'cappuccino-latte-art.jpg', alt: 'Cappuccino mit Latte Art' },
  heissgetraenke: { src: P + 'latte-torte-terrasse.jpg', alt: 'Latte Macchiato und Tortenstück auf der Terrasse' },
  extras: { src: P + 'latte-glas.jpg', alt: 'Milchkaffee im Glas' },
  fruehstueck: { src: P + 'fruehstueck.jpg', alt: 'Frühstücksplatte mit Rührei' },
  orientalisch: { src: P + 'sucuk-fruehstueck.jpg', alt: 'Orientalisches Frühstück mit Sucuk und Rührei' },
  hauptgerichte: { src: P + 'falafel-teller.jpg', alt: 'Falafel-Teller mit Hummus und Salat' },
  salate: { src: P + 'burrata-salat.jpg', alt: 'Burrata Salat mit Erdbeeren' },
  suesses: { src: P + 'erdbeerkuchen.jpg', alt: 'Stück rosa Beerenkuchen' },
  waffeln: { src: P + 'waffel-espresso.jpg', alt: 'Waffel mit Erdbeeren und Espresso' },
  softdrinks: { src: P + 'aussenbereich.jpg', alt: 'Außenbereich des Rose Café' },
  brunch: { src: P + 'mezze-hummus.jpg', alt: 'Hummus, Oliven und Falafel' },
  veranstaltungen: { src: P + 'interior-vitrine.jpg', alt: 'Tresen und Kuchenvitrine im Rose Café' },
};

/* =====================================================================
   BEWERTUNGEN — Platzhalter. Vor Livegang durch echte, zitierfähige
   Bewertungen ersetzen (z. B. Google/Yelp mit Einverständnis).
   ===================================================================== */

export type Review = { name: string; text: string; rating: number };

export const REVIEWS: Review[] = [
  { name: '[Name]', text: '[Platzhalter für eine echte Gästebewertung.]', rating: 5 },
  { name: '[Name]', text: '[Platzhalter für eine echte Gästebewertung.]', rating: 5 },
  { name: '[Name]', text: '[Platzhalter für eine echte Gästebewertung.]', rating: 5 },
];

/* =====================================================================
   FAQ
   ===================================================================== */

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Nehmt ihr Reservierungen an?',
    a: 'Ja, für Gruppen empfehlen wir eine kurze Reservierung im Voraus. Nutzen Sie das Formular auf dieser Seite oder rufen Sie uns direkt an.',
  },
  {
    q: 'Gibt es vegane oder glutenfreie Optionen?',
    a: 'Wir kennzeichnen unsere Optionen auf der Karte vor Ort und beraten Sie gerne persönlich zu Alternativen.',
  },
  {
    q: 'Ist das Café barrierefrei erreichbar?',
    a: 'Bitte sprechen Sie uns bei Fragen zur Erreichbarkeit direkt an — wir helfen gerne weiter.',
  },
  {
    q: 'Gibt es WLAN und Arbeitsplätze?',
    a: 'Ja, WLAN steht für Gäste zur Verfügung. Für konzentriertes Arbeiten empfehlen wir die ruhigeren Vormittagsstunden.',
  },
];

/**
 * Endpunkt für das Reservierungsformular. Leer lassen = Fallback auf das
 * E-Mail-Programm des Nutzers.
 */
export const FORM_ENDPOINT = '';

export const PARTY_SIZES = ['1–2 Personen', '3–4 Personen', '5–8 Personen', 'mehr als 8 Personen'];
