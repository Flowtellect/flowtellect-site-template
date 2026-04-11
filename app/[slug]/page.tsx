import { readPage, getAllPageSlugs } from "@/lib/content";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export default function DynamicPage({ params }: PageProps) {
  const page = readPage(params.slug);
  if (!page) return notFound();

  return (
    <main>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
