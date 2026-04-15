import { readPage, extractBusinessData } from "@/lib/content";
import SectionRenderer from "@/components/SectionRenderer";
import JsonLd from "@/components/JsonLd";

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
        {page.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
    </>
  );
}
