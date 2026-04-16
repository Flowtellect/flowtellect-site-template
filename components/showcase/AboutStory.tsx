"use client";

// ─── AboutStory (Showcase Tier 1) ────────────────────────────────────────────
//
// Editorial "our story" layout: 2-col text + sticky image, founder quote
// pullout z left accent border, timeline milestones alternating left/right.
// Mobile: linear layout, hidden timeline line (data przesunieta w lewo).

import { FadeIn, Eyebrow, ShowcaseImage, pickStr, isValidImage } from "./shared";

interface Milestone {
  year?: string;
  date?: string;
  title?: string;
  name?: string;
  description?: string;
  body?: string;
}

interface Props {
  content: Record<string, unknown>;
}

export default function AboutStory({ content }: Props) {
  const c = content;
  const heading = pickStr(c, "headline", "heading", "title");
  const sub = pickStr(c, "subheadline", "subtitle", "description");
  const body = pickStr(c, "body", "text", "content", "story");
  const eyebrow = pickStr(c, "eyebrow", "badge", "label");
  const image = pickStr(c, "image", "hero_image", "photo", "about_image");
  const quote = pickStr(c, "quote", "founder_quote", "pullquote");
  const quoteAuthor = pickStr(c, "quote_author", "founder", "author");
  const timelineTitle =
    pickStr(c, "timeline_title", "milestones_title") || "Nasza droga";

  const rawMilestones = (c.milestones ?? c.timeline ?? []) as Milestone[];
  const milestones = Array.isArray(rawMilestones)
    ? rawMilestones.slice(0, 6)
    : [];

  const hasImage = isValidImage(image);

  return (
    <section
      className="relative bg-bg overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Two-column: text + image */}
        <div
          className={`grid gap-12 lg:gap-20 items-start ${
            hasImage ? "lg:grid-cols-2" : ""
          }`}
        >
          <div>
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
                  style={{
                    fontSize: "var(--text-lg)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  {sub}
                </p>
              </FadeIn>
            )}

            {body && (
              <FadeIn delay={250}>
                <div
                  className="font-body text-muted mt-6"
                  style={{
                    fontSize: "var(--text-base)",
                    lineHeight: "var(--leading-relaxed)",
                    maxWidth: "60ch",
                  }}
                >
                  {body.split("\n").map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-4" : ""}>
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Founder quote pullout */}
            {quote && (
              <FadeIn delay={350}>
                <blockquote
                  className="mt-8 relative"
                  style={{
                    borderLeft: "3px solid rgb(var(--color-accent))",
                    paddingLeft: "var(--space-lg, 24px)",
                  }}
                >
                  <p
                    className="font-body text-primary italic"
                    style={{
                      fontSize: "var(--text-lg)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                  {quoteAuthor && (
                    <footer
                      className="font-body text-muted mt-3 not-italic"
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      — {quoteAuthor}
                    </footer>
                  )}
                </blockquote>
              </FadeIn>
            )}
          </div>

          {hasImage && (
            <FadeIn delay={200} direction="left">
              <div className="relative lg:sticky lg:top-24">
                <ShowcaseImage
                  src={image}
                  alt={heading || "About"}
                  className="rounded-xl shadow-lg"
                  aspectRatio="3/4"
                />
                <div
                  className="absolute -inset-6 -z-10"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(var(--color-accent), 0.06) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
              </div>
            </FadeIn>
          )}
        </div>

        {/* Timeline milestones */}
        {milestones.length > 0 && (
          <div className="mt-20">
            <FadeIn>
              <h3
                className="font-display font-semibold text-primary text-center mb-12"
                style={{ fontSize: "var(--text-2xl)" }}
              >
                {timelineTitle}
              </h3>
            </FadeIn>

            <div className="relative">
              {/* Vertical line (desktop only) */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
                style={{ background: "rgb(var(--color-border-soft))" }}
              />

              <div className="space-y-12">
                {milestones.map((m, i) => {
                  const year = m.year ?? m.date ?? "";
                  const title = m.title ?? m.name ?? "";
                  const desc = m.description ?? m.body ?? "";
                  const isLeft = i % 2 === 0;

                  return (
                    <FadeIn
                      key={i}
                      delay={100 + i * 100}
                      direction={isLeft ? "right" : "left"}
                    >
                      <div
                        className={`relative flex flex-col md:flex-row md:items-start md:gap-8 ${
                          isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Year dot (desktop) */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1">
                          <div
                            style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "var(--radius-full)",
                              background: "rgb(var(--color-accent))",
                              border: "3px solid rgb(var(--color-bg))",
                              boxShadow: "var(--shadow-sm)",
                            }}
                          />
                        </div>

                        <div
                          className={`md:w-[calc(50%-2rem)] pl-10 md:pl-0 ${
                            isLeft ? "md:text-right md:pr-4" : "md:pl-4"
                          }`}
                        >
                          {year && (
                            <span
                              className="font-accent font-bold text-accent"
                              style={{ fontSize: "var(--text-sm)" }}
                            >
                              {year}
                            </span>
                          )}
                          {title && (
                            <h4
                              className="font-display font-semibold text-primary mt-1"
                              style={{ fontSize: "var(--text-lg)" }}
                            >
                              {title}
                            </h4>
                          )}
                          {desc && (
                            <p
                              className="font-body text-muted mt-2"
                              style={{
                                fontSize: "var(--text-sm)",
                                lineHeight: "var(--leading-normal)",
                              }}
                            >
                              {desc}
                            </p>
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
