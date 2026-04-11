/* eslint-disable @next/next/no-img-element */

// ─── TestimonialsSection ─────────────────────────────────────────────────────
// Client testimonials / reviews with 6 distinct layout families: simple grid,
// single large, featured + small, on-image overlay, large 2-col, and wall.

import {
  ScrollReveal,
  resolveImage,
  str,
  num,
  arr,
  Headline,
  Section,
} from "./shared";

interface TestimonialsProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  photo: string | null;
}

function testimonials(content: Record<string, unknown>): Testimonial[] {
  return arr(content.items).map((item) => ({
    quote: str(item.quote),
    author: str(item.author),
    role: str(item.role),
    company: str(item.company),
    rating: num(item.rating) || 5,
    photo: resolveImage(item.photo),
  }));
}

function heading(content: Record<string, unknown>) {
  return str(content.heading) || str(content.headline);
}

function Stars({ rating }: { rating: number }) {
  if (rating <= 0) return null;
  return (
    <span className="text-accent text-sm" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(Math.min(rating, 5))}
    </span>
  );
}

function AuthorPhoto({ photo, author }: { photo: string | null; author: string }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={author}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        loading="lazy"
      />
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
      <span className="text-accent text-sm font-semibold">
        {author.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

// ── Variant renderers ───────────────────────────────────────────────────────

function SimpleGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((t, i) => (
        <ScrollReveal key={i} delay={i * 80}>
          <div className="bg-surface rounded-xl p-6 border border-border h-full flex flex-col">
            <Stars rating={t.rating} />
            <p className="mt-3 text-primary font-body italic leading-relaxed flex-grow">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3 pt-4 border-t border-border">
              <AuthorPhoto photo={t.photo} author={t.author} />
              <div>
                <p className="text-sm font-semibold text-primary font-body">{t.author}</p>
                {(t.role || t.company) && (
                  <p className="text-xs text-muted font-body">
                    {t.role}{t.role && t.company ? ", " : ""}{t.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function SingleLarge({ items }: { items: Testimonial[] }) {
  const t = items[0];
  if (!t) return null;
  return (
    <ScrollReveal>
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative">
          <span className="text-6xl text-accent/20 font-serif absolute -top-4 -left-2 leading-none select-none">
            &ldquo;
          </span>
          <p className="text-lg md:text-xl italic text-primary font-body leading-relaxed pt-6 px-6">
            {t.quote}
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          {t.photo ? (
            <img
              src={t.photo}
              alt={t.author}
              className="w-16 h-16 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-accent text-xl font-semibold">
                {t.author.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <Stars rating={t.rating} />
            <p className="text-sm font-semibold text-primary font-body mt-1">{t.author}</p>
            {(t.role || t.company) && (
              <p className="text-xs text-muted font-body">
                {t.role}{t.role && t.company ? ", " : ""}{t.company}
              </p>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function FeaturedSmall({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  const [featured, ...rest] = items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Featured - 2/5 width */}
      <ScrollReveal className="md:col-span-2">
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-8 h-full flex flex-col">
          <Stars rating={featured.rating} />
          <p className="mt-3 text-primary font-body italic text-base leading-relaxed flex-grow">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <AuthorPhoto photo={featured.photo} author={featured.author} />
            <div>
              <p className="text-sm font-semibold text-primary font-body">{featured.author}</p>
              {(featured.role || featured.company) && (
                <p className="text-xs text-muted font-body">
                  {featured.role}{featured.role && featured.company ? ", " : ""}{featured.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Rest - 3/5 width, stacked */}
      <div className="md:col-span-3 flex flex-col gap-4">
        {rest.map((t, i) => (
          <ScrollReveal key={i} delay={(i + 1) * 80}>
            <div className="bg-surface rounded-xl px-6 py-4 border border-border flex items-start gap-4">
              <AuthorPhoto photo={t.photo} author={t.author} />
              <div className="flex-grow min-w-0">
                <Stars rating={t.rating} />
                <p className="mt-1 text-sm text-primary font-body italic leading-relaxed line-clamp-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold text-muted font-body">
                  {t.author}{t.role ? ` - ${t.role}` : ""}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function OnImage({ items, content }: { items: Testimonial[]; content: Record<string, unknown> }) {
  const bgImage = resolveImage(content.background_image ?? content.bg_image ?? content.image);

  return (
    <section className="relative py-20 md:py-28">
      {/* Background */}
      {bgImage ? (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {heading(content) && (
          <div className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-white text-center mb-4">
              {heading(content)}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6">
                <Stars rating={t.rating} />
                <p className="mt-3 text-white font-body italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-white/20">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">
                        {t.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white font-body">{t.author}</p>
                    {(t.role || t.company) && (
                      <p className="text-xs text-white/70 font-body">
                        {t.role}{t.role && t.company ? ", " : ""}{t.company}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LargeTwoCol({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((t, i) => (
        <ScrollReveal key={i} delay={i * 100}>
          <div className="bg-surface rounded-2xl p-8 border border-border h-full flex flex-col">
            <Stars rating={t.rating} />
            <p className="mt-4 text-base text-primary font-body italic leading-relaxed flex-grow">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
              <AuthorPhoto photo={t.photo} author={t.author} />
              <div>
                <p className="text-sm font-semibold text-primary font-body">{t.author}</p>
                {(t.role || t.company) && (
                  <p className="text-xs text-muted font-body">
                    {t.role}{t.role && t.company ? ", " : ""}{t.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function Wall({ items }: { items: Testimonial[] }) {
  return (
    <>
      <div
        className="hidden md:block"
        style={{ columnCount: 3, columnGap: "16px" }}
      >
        {items.map((t, i) => (
          <ScrollReveal key={i} delay={i * 60}>
            <div className="bg-surface rounded-xl p-5 border border-border mb-4 break-inside-avoid">
              <Stars rating={t.rating} />
              <p className="mt-2 text-sm text-primary font-body italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border">
                <AuthorPhoto photo={t.photo} author={t.author} />
                <div>
                  <p className="text-xs font-semibold text-primary font-body">{t.author}</p>
                  {(t.role || t.company) && (
                    <p className="text-[11px] text-muted font-body">
                      {t.role}{t.role && t.company ? ", " : ""}{t.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      {/* Mobile: single column */}
      <div className="md:hidden flex flex-col gap-4">
        {items.map((t, i) => (
          <div key={i} className="bg-surface rounded-xl p-5 border border-border">
            <Stars rating={t.rating} />
            <p className="mt-2 text-sm text-primary font-body italic leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border">
              <AuthorPhoto photo={t.photo} author={t.author} />
              <div>
                <p className="text-xs font-semibold text-primary font-body">{t.author}</p>
                {(t.role || t.company) && (
                  <p className="text-[11px] text-muted font-body">
                    {t.role}{t.role && t.company ? ", " : ""}{t.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function TestimonialsSection({ content, vn }: TestimonialsProps) {
  const items = testimonials(content);
  const title = heading(content);

  // vn 7-8 uses its own Section with background image - render separately
  if (vn >= 7 && vn <= 8) {
    return <OnImage items={items} content={content} />;
  }

  const renderVariant = () => {
    if (vn <= 2) return <SimpleGrid items={items} />;
    if (vn <= 4) return <SingleLarge items={items} />;
    if (vn <= 6) return <FeaturedSmall items={items} />;
    if (vn <= 10) return <LargeTwoCol items={items} />;
    return <Wall items={items} />;
  };

  return (
    <Section bg="bg-bg-alt">
      {title && (
        <div className="mb-12">
          <Headline text={title} center />
        </div>
      )}
      {renderVariant()}
    </Section>
  );
}
