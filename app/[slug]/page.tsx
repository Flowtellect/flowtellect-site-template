import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import { tryReadPage, readPagesManifest, extractBusinessData } from "@/lib/content";
import { getDesignDecisions } from "@/lib/applyTheme";
import { markdownToHtml } from "@/lib/markdown";
import SectionRenderer from "@/components/SectionRenderer";
import JsonLd from "@/components/JsonLd";
import { getSectionBg } from "@/components/showcase/designStyles";

const CTAFloating = dynamic(() => import("@/components/showcase/CTAFloating"), {
  ssr: false,
});

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

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render every page from pages-manifest.json at build time. Homepage served
// at '/' via app/page.tsx so skip it here.
export function generateStaticParams() {
  const manifest = readPagesManifest();
  return manifest
    .filter((p) => p.slug && p.slug !== "homepage" && p.slug !== "index")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = tryReadPage(slug);
  if (!page) return { title: "Strona nie znaleziona" };
  return {
    title: page.meta.title,
    description: page.meta.description,
    openGraph: {
      type: "website",
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
      images: ["/og-image.svg"],
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  // /homepage i /index serwowane na /
  if (slug === "homepage" || slug === "index") redirect("/");

  const page = tryReadPage(slug);
  if (!page) notFound();

  // Utility page (polityka prywatnosci, regulamin) - markdown body
  if (page.type === "utility") {
    const html = markdownToHtml(page.body_content ?? "");
    return (
      <main
        id="main-content"
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          fontFamily: "var(--font-body, system-ui)",
          color: "rgb(var(--color-text-primary, 15 15 20))",
          lineHeight: 1.8,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 700,
            fontFamily: "var(--font-display, system-ui)",
            marginBottom: "32px",
            letterSpacing: "-0.02em",
          }}
        >
          {page.meta.title}
        </h1>
        <div
          style={{ fontSize: "15px", color: "rgba(var(--color-text-primary, 15 15 20), 0.78)" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    );
  }

  // Content page - sections
  const biz = extractBusinessData(page);
  const heroCta = extractHeroCta(page.sections ?? []);
  const dd = getDesignDecisions();

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
        {(page.sections ?? []).map((section, i) => {
          const key = section.id ?? i;
          if (hasOwnBg(section.variant)) {
            return <SectionRenderer key={key} section={section} />;
          }
          return (
            <div
              key={key}
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
