import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { BrandStory } from '@/components/sections/BrandStory';
import { SignatureRoseReveal } from '@/components/sections/SignatureRoseReveal';
import { About } from '@/components/sections/About';
import { MenuExperience } from '@/components/sections/MenuExperience';
import { SignatureProduct } from '@/components/sections/SignatureProduct';
import { InteriorStory } from '@/components/sections/InteriorStory';
import { HorizontalJourney } from '@/components/sections/HorizontalJourney';
import { Gallery } from '@/components/sections/Gallery';
import { Instagram } from '@/components/sections/Instagram';
import { Reviews } from '@/components/sections/Reviews';
import { Visit } from '@/components/sections/Visit';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { FAQS } from '@/lib/content';
import { buildMetadata, faqSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rose Café Bremen | Café, Frühstück & Kuchen in Schwachhausen',
  description:
    'Rose Café Bremen: Frühstück, Kaffee und hausgemachte Kuchen in Bremen-Schwachhausen. Café Bremen, Brunch Bremen, Kuchen Bremen — in warmer, editorialer Atmosphäre.',
  path: '/',
});

/* =====================================================================
   Die Seite als digitale Reise, nicht als Hero → 3 Cards → Footer:

   INTRO (Hero) → BRAND (Story + Signature Rose) → FOOD (Menü +
   Signature Product) → INTERIOR → HORIZONTAL EXPERIENCE → ATMOSPHERE
   (Gallery/Instagram) → REVIEWS → LOCATION/RESERVATION (Visit/FAQ) →
   FINAL CTA. Jede Phase bekommt einen eigenen visuellen Charakter.
   ===================================================================== */
export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteSchema(), faqSchema(FAQS)]} />
      <Hero />
      <BrandStory />
      <SignatureRoseReveal />
      <About />
      <MenuExperience />
      <SignatureProduct />
      <InteriorStory />
      <HorizontalJourney />
      <Gallery />
      <Instagram />
      <Reviews />
      <Visit />
      <Faq />
      <FinalCta />
    </>
  );
}
