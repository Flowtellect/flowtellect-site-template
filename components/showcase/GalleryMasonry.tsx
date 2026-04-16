"use client";

// ─── GalleryMasonry (Showcase Tier 1) ────────────────────────────────────────
//
// True column-based masonry (nie CSS grid hack — kazdy col to osobny flex-col),
// varied aspect ratios per image (rotacja 6 ratios dla visual variety), click
// opens Lightbox (reuse istniejacego componenta). Mobile: plain 2-col square grid.

import { useState } from "react";
import { FadeIn, Eyebrow, pickStr } from "./shared";
import Lightbox from "../Lightbox";
import { useDesign } from "./DesignContext";
import { getImageTreatment } from "./designStyles";

interface GalleryImage {
  src?: string;
  image?: string;
  url?: string;
  alt?: string;
  caption?: string;
  title?: string;
}

interface Props {
  content: Record<string, unknown>;
}

export default function GalleryMasonry({ content }: Props) {
  const c = content;
  const dd = useDesign();
  const imgStyle = getImageTreatment(dd);
  // radius z imgStyle steruje thumbnail + lightbox trigger button.
  // `raw` -> 0, `rounded` -> var(--radius-lg), itd.
  const thumbRadius =
    (imgStyle.borderRadius as string) ?? "var(--radius-md, 10px)";
  const heading = pickStr(c, "headline", "heading", "title");
  const eyebrow = pickStr(c, "eyebrow", "badge", "label");
  const sub = pickStr(c, "subheadline", "subtitle", "description");

  const rawImages = (c.images ??
    c.items ??
    c.gallery ??
    c.photos ??
    []) as GalleryImage[];
  const images = Array.isArray(rawImages) ? rawImages.slice(0, 12) : [];

  const validImages = images
    .map((img) => ({
      src: img.src ?? img.image ?? img.url ?? "",
      alt: img.alt ?? img.caption ?? img.title ?? "",
    }))
    .filter(
      (img) =>
        !!img.src &&
        img.src !== "AUTO" &&
        (img.src.startsWith("/") || img.src.startsWith("http"))
    );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (validImages.length === 0) return null;

  // Masonry column distribution (round-robin)
  const columns = 3;
  const columnArrays: { img: typeof validImages[number]; globalIdx: number }[][] =
    Array.from({ length: columns }, () => []);
  validImages.forEach((img, i) => {
    columnArrays[i % columns].push({ img, globalIdx: i });
  });

  const aspects = ["3/4", "4/3", "1/1", "3/4", "4/5", "3/2"];

  return (
    <section
      className="relative bg-bg overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {(heading || eyebrow) && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {eyebrow && (
              <FadeIn>
                <Eyebrow text={eyebrow} className="mb-4" />
              </FadeIn>
            )}
            {heading && (
              <FadeIn delay={100}>
                <h2
                  className="font-display font-bold text-primary"
                  style={{
                    fontSize: "var(--text-3xl)",
                    lineHeight: "var(--leading-tight)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  {heading}
                </h2>
              </FadeIn>
            )}
            {sub && (
              <FadeIn delay={200}>
                <p
                  className="font-body text-muted mt-4"
                  style={{ fontSize: "var(--text-lg)" }}
                >
                  {sub}
                </p>
              </FadeIn>
            )}
          </div>
        )}

        {/* Desktop: column masonry */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {columnArrays.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map(({ img, globalIdx }) => {
                const aspect = aspects[globalIdx % aspects.length];
                return (
                  <FadeIn key={globalIdx} delay={100 + globalIdx * 60}>
                    <button
                      onClick={() => {
                        setLightboxIndex(globalIdx);
                        setLightboxOpen(true);
                      }}
                      className={`block w-full overflow-hidden cursor-zoom-in group ${
                        dd.animationLevel !== "minimal" ? "anim-image-zoom" : ""
                      }`}
                      style={{ borderRadius: thumbRadius }}
                    >
                      <div
                        className="overflow-hidden"
                        style={{ aspectRatio: aspect }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  </FadeIn>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile: simple 2-col square grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {validImages.map((img, i) => (
            <FadeIn key={i} delay={60 + i * 40}>
              <button
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
                className="block w-full overflow-hidden cursor-zoom-in"
                style={{
                  borderRadius: thumbRadius,
                  aspectRatio: "1/1",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={validImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
