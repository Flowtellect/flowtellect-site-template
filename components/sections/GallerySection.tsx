/* eslint-disable @next/next/no-img-element */

// ─── GallerySection ──────────────────────────────────────────────────────────
// Image gallery with 6 distinct layout families: grid, masonry, bento,
// justified rows, 2-col large, and polaroid.

import {
  ScrollReveal,
  resolveImage,
  str,
  arr,
  Headline,
  Section,
} from "./shared";

interface GalleryProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function images(content: Record<string, unknown>) {
  return arr(content.images).map((img, i) => ({
    src: resolveImage(img.src ?? img.image),
    alt: str(img.alt) || `Gallery image ${i + 1}`,
    caption: str(img.caption),
  }));
}

function heading(content: Record<string, unknown>) {
  return str(content.heading) || str(content.headline);
}

// ── Variant renderers ───────────────────────────────────────────────────────

function GridGallery({ items }: { items: ReturnType<typeof images> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((img, i) => (
        <ScrollReveal key={i} delay={i * 60}>
          <div className="overflow-hidden rounded-lg">
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="aspect-square w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function MasonryGallery({ items }: { items: ReturnType<typeof images> }) {
  return (
    <>
      {/* Mobile: 2 columns, md+: 3 columns */}
      <div
        className="hidden md:block"
        style={{ columnCount: 3, columnGap: "12px" }}
      >
        {items.map((img, i) => (
          <ScrollReveal key={i} delay={i * 50}>
            <div className="mb-3 overflow-hidden rounded-lg">
              {img.src ? (
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                  loading="lazy"
                />
              ) : (
                <div className={`w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`} />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
      <div
        className="md:hidden"
        style={{ columnCount: 2, columnGap: "12px" }}
      >
        {items.map((img, i) => (
          <div key={i} className="mb-3 overflow-hidden rounded-lg">
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                loading="lazy"
              />
            ) : (
              <div className={`w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function BentoGallery({ items }: { items: ReturnType<typeof images> }) {
  if (items.length === 0) return null;
  const [first, ...rest] = items;

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
    >
      {/* First image spans 2 cols + 2 rows */}
      <div className="md:col-span-2 md:row-span-2 col-span-3 overflow-hidden rounded-lg">
        <ScrollReveal>
          {first.src ? (
            <img
              src={first.src}
              alt={first.alt}
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="aspect-square w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
          )}
        </ScrollReveal>
      </div>
      {rest.map((img, i) => (
        <ScrollReveal key={i} delay={(i + 1) * 80}>
          <div className="overflow-hidden rounded-lg">
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="aspect-square w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function JustifiedGallery({ items }: { items: ReturnType<typeof images> }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((img, i) => (
        <ScrollReveal key={i} delay={i * 50} className="flex-grow">
          <div className="overflow-hidden rounded-lg">
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className="h-48 md:h-64 w-auto object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="h-48 md:h-64 w-48 bg-gradient-to-br from-accent/10 via-surface to-accent/5 rounded-lg" />
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function TwoColGallery({ items }: { items: ReturnType<typeof images> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((img, i) => (
        <ScrollReveal key={i} delay={i * 80}>
          <div className="group overflow-hidden rounded-xl">
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
            )}
          </div>
          {img.caption && (
            <p className="mt-2 text-sm text-muted font-body">{img.caption}</p>
          )}
        </ScrollReveal>
      ))}
    </div>
  );
}

function PolaroidGallery({ items }: { items: ReturnType<typeof images> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {items.map((img, i) => {
        const rotation = (i % 5 - 2) * 2;
        return (
          <ScrollReveal key={i} delay={i * 70}>
            <div
              className="bg-white p-2 shadow-lg transition-transform duration-300 hover:rotate-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="overflow-hidden">
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-square w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
                )}
              </div>
              {img.caption && (
                <p className="mt-2 pb-1 text-center text-xs text-gray-600 font-body">
                  {img.caption}
                </p>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function GallerySection({ content, vn }: GalleryProps) {
  const items = images(content);
  const title = heading(content);

  const renderVariant = () => {
    if (vn <= 3) return <GridGallery items={items} />;
    if (vn <= 5) return <MasonryGallery items={items} />;
    if (vn <= 8) return <BentoGallery items={items} />;
    if (vn <= 10) return <JustifiedGallery items={items} />;
    if (vn <= 15) return <TwoColGallery items={items} />;
    return <PolaroidGallery items={items} />;
  };

  return (
    <Section bg="bg-bg">
      {title && (
        <div className="mb-12">
          <Headline text={title} center />
        </div>
      )}
      {renderVariant()}
    </Section>
  );
}
