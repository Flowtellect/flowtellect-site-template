import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { tryReadPage, readPagesManifest, extractBusinessData } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import SectionRenderer from "@/components/SectionRenderer";
import JsonLd from "@/components/JsonLd";

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
        {(page.sections ?? []).map((section, i) => (
          <SectionRenderer key={section.id ?? i} section={section} />
        ))}
      </main>
    </>
  );
}
