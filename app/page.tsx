import dynamic from "next/dynamic";
import { readPage, extractBusinessData } from "@/lib/content";
import { getDesignDecisions } from "@/lib/applyTheme";
import SectionRenderer from "@/components/SectionRenderer";
import JsonLd from "@/components/JsonLd";
import { getSectionBg } from "@/components/showcase/designStyles";

// CTAFloating: sticky mobile CTA, revealed po 40% scroll. Client-only,
// wyciaga label/href z hero.cta_primary.
const CTAFloating = dynamic(() => import("@/components/showcase/CTAFloating"), {
  ssr: false,
});

/**
 * Pulls CTA primary from the first hero section so the floating mobile CTA
 * reuses the top-of-page goal (consistency + no per-page config).
 */
function extractHeroCta(
  sections: Array<{ variant?: string; content?: Record<string, unknown> }>
): { label: string; href: string } | null {
  const hero = sections.find((s) => s.variant?.startsWith("hero"));
  const cta = hero?.content?.cta_primary as
    | Record<string, unknown>
    | undefined;
  const label = cta && typeof cta.label === "string" ? cta.label : "";
  if (!label) return null;
  const href = cta && typeof cta.href === "string" ? cta.href : "#contact";
  return { label, href };
}

export default function HomePage() {
  // CMS publishes to "index.json", generator creates "homepage.json"
  const page = readPage("index") || readPage("homepage");
  if (!page) {
    return (
      <main id="main-content" className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm">Strona w przygotowaniu</p>
      </main>
    );
  }

  const biz = extractBusinessData(page);
  const heroCta = extractHeroCta(page.sections ?? []);
  const dd = getDesignDecisions();

  // Sekcje z wlasnym bg (Showcase hero/cta/footer/navbar) pomijaja section
  // rhythm wrapper — wrapper dla generic sekcji (services, about, stats, etc.)
  // implementuje dd.sectionRhythm (monotone / alternating / accented / gradient).
  const OWN_BG_PREFIXES = ["hero", "cta", "footer", "navbar"];
  const hasOwnBg = (variant: string) =>
    OWN_BG_PREFIXES.some((p) => variant.startsWith(p));

  return (
    <>
      {biz.brandName && (
        <JsonLd
          businessName={biz.brandName}
          description={page.meta.description}
          phone={biz.phone}
          email={biz.email}
          address={biz.address}
          openingHours={biz.openingHours}
        />
      )}
      <main id="main-content">
        {page.sections.map((section, i) => {
          if (hasOwnBg(section.variant)) {
            return <SectionRenderer key={section.id} section={section} />;
          }
          return (
            <div
              key={section.id}
              style={{ background: getSectionBg(dd, i, i === 0) }}
            >
              <SectionRenderer section={section} />
            </div>
          );
        })}
      </main>
      {heroCta && <CTAFloating label={heroCta.label} href={heroCta.href} />}
    </>
  );
}
