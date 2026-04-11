/* eslint-disable @next/next/no-img-element */

// ─── ProductsSection ─────────────────────────────────────────────────────────
// Products / services / blog categories with 4 distinct layout families:
// 3-col grid, 2-col large, alternating rows, and featured + grid.

import {
  ScrollReveal,
  resolveIcon,
  resolveImage,
  str,
  arr,
  Eyebrow,
  Headline,
  Body,
  CtaButton,
  Section,
} from "./shared";

interface ProductsProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

interface ProductItem {
  image: string | null;
  icon: string;
  name: string;
  desc: string;
  price: string;
  href: string;
  ctaLabel: string;
}

function productItems(content: Record<string, unknown>): ProductItem[] {
  return arr(content.items).map((item) => ({
    image: resolveImage(item.image ?? item.src),
    icon: str(item.icon),
    name: str(item.name) || str(item.title) || str(item.label),
    desc: str(item.desc) || str(item.description),
    price: str(item.price),
    href: str(item.href) || str(item.cta_href),
    ctaLabel: str(item.cta_label),
  }));
}

function sectionCta(content: Record<string, unknown>): Record<string, unknown> | null {
  const cta = content.cta;
  if (cta && typeof cta === "object" && !Array.isArray(cta)) {
    return cta as Record<string, unknown>;
  }
  return null;
}

// ── Card sub-components ─────────────────────────────────────────────────────

function CardImage({ src, alt, aspect = "aspect-[4/3]" }: { src: string | null; alt: string; aspect?: string }) {
  if (src) {
    return (
      <div className={`${aspect} overflow-hidden`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className={`${aspect} bg-gradient-to-br from-accent/10 via-surface to-accent/5`} />
  );
}

// ── Variant renderers ───────────────────────────────────────────────────────

function ThreeColGrid({ items }: { items: ProductItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <ScrollReveal key={i} delay={i * 80}>
          <div className="group border border-border rounded-xl overflow-hidden bg-surface transition-all duration-300 hover:shadow-lg hover:border-accent/30 h-full flex flex-col">
            <CardImage src={item.image} alt={item.name} />
            <div className="p-5 flex flex-col flex-grow">
              {item.icon && (
                <span className="text-2xl mb-2">{resolveIcon(item.icon)}</span>
              )}
              <h3 className="font-display text-base font-semibold text-primary">
                {item.href ? (
                  <a href={item.href} className="hover:text-accent transition-colors">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </h3>
              {item.desc && (
                <p className="mt-2 text-sm text-muted font-body leading-relaxed flex-grow">
                  {item.desc}
                </p>
              )}
              {item.price && (
                <p className="mt-3 text-sm font-semibold text-accent font-body">
                  {item.price}
                </p>
              )}
              {item.ctaLabel && item.href && (
                <a
                  href={item.href}
                  className="mt-3 inline-flex items-center text-sm text-accent font-body font-semibold hover:underline"
                >
                  {item.ctaLabel} &rarr;
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function TwoColLarge({ items }: { items: ProductItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item, i) => (
        <ScrollReveal key={i} delay={i * 100}>
          <div className="group border border-border rounded-xl overflow-hidden bg-surface transition-all duration-300 hover:shadow-xl hover:border-accent/30 h-full flex flex-col">
            <CardImage src={item.image} alt={item.name} aspect="aspect-video" />
            <div className="p-6 flex flex-col flex-grow">
              {item.icon && (
                <span className="text-2xl mb-2">{resolveIcon(item.icon)}</span>
              )}
              <h3 className="font-display text-lg font-semibold text-primary">
                {item.href ? (
                  <a href={item.href} className="hover:text-accent transition-colors">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </h3>
              {item.desc && (
                <p className="mt-2 text-sm text-muted font-body leading-relaxed flex-grow">
                  {item.desc}
                </p>
              )}
              {item.price && (
                <p className="mt-4 text-base font-semibold text-accent font-body">
                  {item.price}
                </p>
              )}
              {item.ctaLabel && item.href && (
                <a
                  href={item.href}
                  className="mt-3 inline-flex items-center text-sm text-accent font-body font-semibold hover:underline"
                >
                  {item.ctaLabel} &rarr;
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function AlternatingRows({ items }: { items: ProductItem[] }) {
  return (
    <div className="flex flex-col gap-12">
      {items.map((item, i) => {
        const imageLeft = i % 2 === 0;
        return (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className={`overflow-hidden rounded-xl ${imageLeft ? "" : "md:order-2"}`}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-accent/10 via-surface to-accent/5 rounded-xl" />
                )}
              </div>

              {/* Text */}
              <div className={imageLeft ? "" : "md:order-1"}>
                {item.icon && (
                  <span className="text-3xl mb-3 block">{resolveIcon(item.icon)}</span>
                )}
                <h3 className="font-display text-xl md:text-2xl font-semibold text-primary">
                  {item.name}
                </h3>
                {item.desc && (
                  <p className="mt-3 text-sm md:text-base text-muted font-body leading-relaxed">
                    {item.desc}
                  </p>
                )}
                {item.price && (
                  <p className="mt-4 text-lg font-semibold text-accent font-body">
                    {item.price}
                  </p>
                )}
                {item.ctaLabel && item.href && (
                  <a
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-on-accent font-body font-semibold text-sm hover:shadow-lg hover:brightness-110 transition-all duration-300"
                  >
                    {item.ctaLabel}
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

function FeaturedGrid({ items }: { items: ProductItem[] }) {
  if (items.length === 0) return null;
  const [featured, ...rest] = items;

  return (
    <div className="flex flex-col gap-10">
      {/* Featured item - full width horizontal */}
      <ScrollReveal>
        <div className="group grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-xl overflow-hidden bg-surface transition-all duration-300 hover:shadow-xl hover:border-accent/30">
          <div className="overflow-hidden">
            {featured.image ? (
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-full min-h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full min-h-[240px] bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
            )}
          </div>
          <div className="p-8 flex flex-col justify-center">
            {featured.icon && (
              <span className="text-3xl mb-3">{resolveIcon(featured.icon)}</span>
            )}
            <h3 className="font-display text-xl md:text-2xl font-semibold text-primary">
              {featured.href ? (
                <a href={featured.href} className="hover:text-accent transition-colors">
                  {featured.name}
                </a>
              ) : (
                featured.name
              )}
            </h3>
            {featured.desc && (
              <p className="mt-3 text-sm md:text-base text-muted font-body leading-relaxed">
                {featured.desc}
              </p>
            )}
            {featured.price && (
              <p className="mt-4 text-lg font-semibold text-accent font-body">
                {featured.price}
              </p>
            )}
            {featured.ctaLabel && featured.href && (
              <a
                href={featured.href}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-on-accent font-body font-semibold text-sm hover:shadow-lg hover:brightness-110 transition-all duration-300 self-start"
              >
                {featured.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Rest - 3-col grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((item, i) => (
            <ScrollReveal key={i} delay={(i + 1) * 80}>
              <div className="group border border-border rounded-xl overflow-hidden bg-surface transition-all duration-300 hover:shadow-lg hover:border-accent/30 h-full flex flex-col">
                <CardImage src={item.image} alt={item.name} />
                <div className="p-5 flex flex-col flex-grow">
                  {item.icon && (
                    <span className="text-2xl mb-2">{resolveIcon(item.icon)}</span>
                  )}
                  <h3 className="font-display text-base font-semibold text-primary">
                    {item.href ? (
                      <a href={item.href} className="hover:text-accent transition-colors">
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )}
                  </h3>
                  {item.desc && (
                    <p className="mt-2 text-sm text-muted font-body leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                  )}
                  {item.price && (
                    <p className="mt-3 text-sm font-semibold text-accent font-body">
                      {item.price}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function ProductsSection({ content, vn }: ProductsProps) {
  const items = productItems(content);
  const eyebrow = str(content.eyebrow);
  const title = str(content.headline) || str(content.heading);
  const body = str(content.body);
  const cta = sectionCta(content);

  const renderVariant = () => {
    if (vn <= 5) return <ThreeColGrid items={items} />;
    if (vn <= 10) return <TwoColLarge items={items} />;
    if (vn <= 15) return <AlternatingRows items={items} />;
    return <FeaturedGrid items={items} />;
  };

  return (
    <Section bg="bg-bg">
      <div className="mb-12 text-center">
        <Eyebrow text={eyebrow} center />
        <Headline text={title} center />
        <Body text={body} center />
      </div>
      {renderVariant()}
      {cta && (
        <div className="mt-12 text-center">
          <CtaButton cta={cta} />
        </div>
      )}
    </Section>
  );
}
