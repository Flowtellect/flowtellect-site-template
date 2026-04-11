import { readPage, getAllPageSlugs } from "@/lib/content";
import SectionRenderer from "@/components/SectionRenderer";

export async function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export default function DynamicPage({ params }: { params: { slug: string } }) {
  const page = readPage(params.slug);
  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm">Strona nie znaleziona</p>
      </main>
    );
  }

  return (
    <main>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
