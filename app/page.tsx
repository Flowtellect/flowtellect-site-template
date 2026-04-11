import { readPage } from "@/lib/content";
import SectionRenderer from "@/components/SectionRenderer";

export default function HomePage() {
  const page = readPage("homepage");
  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted text-sm">Strona w przygotowaniu</p>
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
