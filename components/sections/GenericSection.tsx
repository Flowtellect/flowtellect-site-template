// ─── GenericSection ──────────────────────────────────────────────────────────
//
// Uniwersalny renderer sekcji. Renderuje dowolny variant_id z CMS na podstawie
// content_json, bez potrzeby pisania dedykowanego komponentu React.
//
// Rozpoznaje kategorie sekcji po prefixie variant_id (hero_, about_, stats_, etc.)
// i renderuje odpowiedni layout. Kazda kategoria ma swoj "generic template" ktory
// wyswietla typowe pola (eyebrow, headline, body, items, cta, image, etc.).
//
// Dla stron ktore potrzebuja customowego wygladu - nadal mozna pisac dedykowane
// komponenty i mapowac je w SectionRenderer.tsx. GenericSection to fallback.

/* eslint-disable @next/next/no-img-element */

interface GenericProps {
  variant: string;
  content: Record<string, unknown>;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function str(v: unknown): string { return typeof v === 'string' ? v : '' }
function num(v: unknown): number { return typeof v === 'number' ? v : 0 }
function arr(v: unknown): Record<string, unknown>[] {
  return Array.isArray(v) ? v.filter(x => x && typeof x === 'object') as Record<string, unknown>[] : []
}
function strArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter(x => typeof x === 'string') as string[] : []
}

function resolveImage(path: unknown): string | null {
  const s = str(path)
  if (!s || s === 'AUTO') return null
  return s
}

function Eyebrow({ text }: { text: string }) {
  if (!text) return null
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-accent" />
      <span className="text-xs uppercase tracking-[0.3em] text-accent font-accent">{text}</span>
    </div>
  )
}

function Headline({ text }: { text: string }) {
  if (!text) return null
  const lines = Array.isArray(text) ? text : [text]
  return (
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-primary mb-4">
      {lines.map((line, i) => <span key={i}>{str(line)}{i < lines.length - 1 && <br />}</span>)}
    </h2>
  )
}

function Body({ text }: { text: string }) {
  if (!text) return null
  if (text.includes('<')) {
    return <div className="font-body text-sm text-muted leading-relaxed mb-6 prose prose-sm" dangerouslySetInnerHTML={{ __html: text }} />
  }
  return <p className="font-body text-sm md:text-base text-muted leading-relaxed mb-6">{text}</p>
}

function CtaButton({ cta }: { cta: Record<string, unknown> | null }) {
  if (!cta) return null
  const label = str(cta.label)
  const href = str(cta.href) || '#'
  if (!label) return null
  return (
    <a href={href} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-on-accent font-body font-semibold text-sm hover:opacity-90 transition-opacity">
      {label}
    </a>
  )
}

function ImageBlock({ src, alt, className }: { src: string | null; alt?: string; className?: string }) {
  if (!src) return <div className={`bg-surface-deep rounded-xl ${className ?? ''}`} />
  return <img src={src} alt={alt ?? ''} className={`rounded-xl object-cover ${className ?? ''}`} loading="lazy" />
}

// ── Category renderers ──────────────────────────────────────────────────────

function GenericHero({ content }: { content: Record<string, unknown> }) {
  const eyebrow = str(content.eyebrow)
  const headline = content.headline
  const subheadline = str(content.subheadline)
  const image = resolveImage(content.hero_image)
  const cta = content.cta_primary as Record<string, unknown> | null

  return (
    <section className="py-20 md:py-32 bg-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow text={eyebrow} />
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-primary mb-4">
            {Array.isArray(headline) ? headline.map((l, i) => <span key={i}>{str(l)}{i < headline.length - 1 && <br />}</span>) : str(headline)}
          </h1>
          <Body text={subheadline} />
          <div className="flex gap-4 mt-6">
            <CtaButton cta={cta} />
            {content.cta_secondary ? <CtaButton cta={content.cta_secondary as Record<string, unknown>} /> : null}
          </div>
        </div>
        <ImageBlock src={image} alt={str(content.headline)} className="w-full aspect-[4/3]" />
      </div>
    </section>
  )
}

function GenericAbout({ content }: { content: Record<string, unknown> }) {
  const image = resolveImage(content.image) || resolveImage(content.hero_image)
  return (
    <section className="py-20 md:py-32 bg-bg-alt">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {image && <ImageBlock src={image} className="w-full aspect-[4/3]" />}
        <div>
          <Eyebrow text={str(content.eyebrow)} />
          <Headline text={str(content.headline)} />
          <Body text={str(content.body)} />
          {/* Stats row */}
          {arr(content.stats).length > 0 && (
            <div className="flex gap-8 mt-8 pt-6 border-t border-border">
              {arr(content.stats).map((s, i) => (
                <div key={i}>
                  <div className="font-display text-2xl text-accent font-bold">{str(s.value)}</div>
                  <div className="font-body text-xs text-muted">{str(s.label)}</div>
                </div>
              ))}
            </div>
          )}
          {/* Highlights */}
          {arr(content.highlights).length > 0 && (
            <div className="grid gap-4 mt-8">
              {arr(content.highlights).map((h, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm flex-shrink-0">{str(h.icon) || '✦'}</div>
                  <div>
                    <div className="font-display text-sm text-primary font-semibold">{str(h.label || h.title)}</div>
                    <div className="font-body text-xs text-muted">{str(h.desc)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pillars (misja/wizja/wartosci) */}
          {arr(content.pillars).length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {arr(content.pillars).map((p, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-2">{str(p.icon) || '✦'}</div>
                  <div className="font-display text-base text-primary font-semibold mb-1">{str(p.title)}</div>
                  <div className="font-body text-xs text-muted">{str(p.body)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function GenericItems({ content, bg }: { content: Record<string, unknown>; bg?: string }) {
  const items = arr(content.items) || arr(content.categories) || arr(content.tabs)
  return (
    <section className={`py-20 md:py-28 ${bg ?? 'bg-bg'}`}>
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-12">
          <Eyebrow text={str(content.eyebrow)} />
          <Headline text={str(content.headline || content.heading)} />
          <Body text={str(content.body)} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const image = resolveImage(item.image || item.src)
            return (
              <div key={i} className="group border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300">
                {image && <img src={image} alt={str(item.name || item.title || item.label)} className="w-full aspect-[4/3] object-cover" loading="lazy" />}
                <div className="p-5">
                  {str(item.icon) && <div className="text-xl mb-2">{str(item.icon)}</div>}
                  <h3 className="font-display text-base text-primary font-semibold mb-1">{str(item.name || item.title || item.label)}</h3>
                  {str(item.desc || item.description) && (
                    <p className="font-body text-xs text-muted leading-relaxed mb-2">{str(item.desc || item.description)}</p>
                  )}
                  {str(item.price) && (
                    <div className="font-display text-sm text-accent font-bold">{str(item.price)}</div>
                  )}
                  {str(item.href || item.cta_href) && str(item.cta_label) && (
                    <a href={str(item.href || item.cta_href)} className="inline-block mt-2 text-xs text-accent font-semibold hover:underline">
                      {str(item.cta_label)} →
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {content.cta ? <div className="mt-10"><CtaButton cta={content.cta as Record<string, unknown>} /></div> : null}
      </div>
    </section>
  )
}

function GenericStats({ content }: { content: Record<string, unknown> }) {
  const items = arr(content.items)
  return (
    <section className="py-16 md:py-20 bg-accent text-on-accent">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {str(content.headline || content.eyebrow) && (
          <h2 className="font-display text-2xl md:text-3xl text-center mb-10">{str(content.headline || content.eyebrow)}</h2>
        )}
        <div className="flex flex-wrap justify-around gap-8 text-center">
          {items.map((item, i) => (
            <div key={i}>
              <div className="font-display text-4xl md:text-5xl font-bold leading-none">
                {num(item.value) || str(item.value)}{str(item.suffix)}
              </div>
              <div className="font-body text-sm mt-1 opacity-80">{str(item.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericTestimonials({ content }: { content: Record<string, unknown> }) {
  const items = arr(content.items)
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-surface rounded-xl p-6 border border-border">
              {num(item.rating) > 0 && (
                <div className="text-accent text-sm mb-3">{'★'.repeat(num(item.rating))}{'☆'.repeat(5 - num(item.rating))}</div>
              )}
              <p className="font-body text-sm text-muted leading-relaxed mb-4 italic">&ldquo;{str(item.quote)}&rdquo;</p>
              <div className="flex items-center gap-3">
                {resolveImage(item.photo) && <img src={resolveImage(item.photo)!} alt="" className="w-8 h-8 rounded-full object-cover" />}
                <div>
                  <div className="font-body text-xs text-primary font-semibold">{str(item.author)}</div>
                  {str(item.role || item.company) && <div className="font-body text-xs text-muted">{str(item.role)}{str(item.company) && `, ${str(item.company)}`}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericGallery({ content }: { content: Record<string, unknown> }) {
  const images = arr(content.images)
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {str(content.heading || content.headline) && (
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => {
            const src = resolveImage(img.src || img.image)
            return src ? (
              <img key={i} src={src} alt={str(img.alt || img.caption)} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
            ) : (
              <div key={i} className="w-full aspect-square bg-surface-deep rounded-lg" />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GenericCta({ content }: { content: Record<string, unknown> }) {
  return (
    <section className="py-20 md:py-28 bg-accent text-on-accent">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto text-center">
        {str(content.eyebrow) && <div className="text-xs uppercase tracking-[0.3em] opacity-80 mb-4 font-accent">{str(content.eyebrow)}</div>}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">{str(content.headline || content.heading)}</h2>
        <Body text={str(content.body || content.text)} />
        <div className="mt-8">
          {content.cta ? (
            <a href={str((content.cta as Record<string, unknown>).href) || '#'} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-bg text-primary font-body font-semibold text-sm hover:opacity-90 transition-opacity">
              {str((content.cta as Record<string, unknown>).label)}
            </a>
          ) : null}
        </div>
        {str(content.note) && <p className="mt-4 text-xs opacity-70">{str(content.note)}</p>}
      </div>
    </section>
  )
}

function GenericContact({ content }: { content: Record<string, unknown> }) {
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <Eyebrow text={str(content.eyebrow)} />
            <Headline text={str(content.headline)} />
            <div className="flex flex-col gap-6 mt-8">
              {str(content.address) && (
                <div><div className="text-xs uppercase tracking-[0.2em] text-accent font-accent mb-1">Adres</div><p className="font-body text-sm text-primary">{str(content.address)}</p></div>
              )}
              {str(content.phone) && (
                <div><div className="text-xs uppercase tracking-[0.2em] text-accent font-accent mb-1">Telefon</div><a href={`tel:${str(content.phone)}`} className="font-body text-sm text-primary hover:text-accent transition-colors">{str(content.phone)}</a></div>
              )}
              {str(content.email) && (
                <div><div className="text-xs uppercase tracking-[0.2em] text-accent font-accent mb-1">E-mail</div><a href={`mailto:${str(content.email)}`} className="font-body text-sm text-primary hover:text-accent transition-colors">{str(content.email)}</a></div>
              )}
              {str(content.hours) && (
                <div><div className="text-xs uppercase tracking-[0.2em] text-accent font-accent mb-1">Godziny</div><p className="font-body text-sm text-primary">{str(content.hours)}</p></div>
              )}
            </div>
          </div>
          <div>
            <Body text={str(content.body || content.note)} />
          </div>
        </div>
      </div>
    </section>
  )
}

function GenericFooter({ content }: { content: Record<string, unknown> }) {
  const links = arr(content.links)
  const columns = arr(content.columns)
  return (
    <footer className="py-12 md:py-16 bg-surface-deep border-t border-border">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-12 mb-8">
          <div className="flex-shrink-0">
            {resolveImage(content.logo) && <img src={resolveImage(content.logo)!} alt="Logo" className="h-8 mb-3" />}
            {str(content.tagline) && <p className="font-body text-xs text-muted max-w-xs">{str(content.tagline)}</p>}
          </div>
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-display text-sm text-primary font-semibold mb-3">{str(col.heading)}</h4>
              {arr(col.links).map((link, j) => (
                <a key={j} href={str(link.href) || '#'} className="block font-body text-xs text-muted hover:text-accent transition-colors mb-2">{str(link.label)}</a>
              ))}
            </div>
          ))}
          {links.length > 0 && columns.length === 0 && (
            <div className="flex gap-6">
              {links.map((link, i) => (
                <a key={i} href={str(link.href) || '#'} className="font-body text-xs text-muted hover:text-accent transition-colors">{str(link.label)}</a>
              ))}
            </div>
          )}
        </div>
        {str(content.copyright) && (
          <div className="pt-6 border-t border-border">
            <p className="font-body text-xs text-dim">{str(content.copyright)}</p>
          </div>
        )}
      </div>
    </footer>
  )
}

function GenericNavbar({ content }: { content: Record<string, unknown> }) {
  const links = arr(content.links)
  const cta = content.cta as Record<string, unknown> | null
  return (
    <nav className="py-4 bg-bg border-b border-border sticky top-0 z-50">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {resolveImage(content.logo) && <img src={resolveImage(content.logo)!} alt="Logo" className="h-8" />}
        </div>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, i) => (
            <a key={i} href={str(link.href) || '#'} className="font-body text-sm text-muted hover:text-primary transition-colors">{str(link.label)}</a>
          ))}
        </div>
        {cta && <CtaButton cta={cta} />}
      </div>
    </nav>
  )
}

function GenericFaq({ content }: { content: Record<string, unknown> }) {
  const items = arr(content.items)
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <details key={i} className="group border-b border-border">
              <summary className="flex items-center justify-between py-5 cursor-pointer font-display text-sm text-primary font-semibold list-none">
                {str(item.question)}
                <span className="text-accent text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="pb-5 font-body text-sm text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: str(item.answer) }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericPricing({ content }: { content: Record<string, unknown> }) {
  const tiers = arr(content.tiers) || arr(content.plans) || arr(content.packages)
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto text-center">
        <Headline text={str(content.heading || content.headline)} />
        <Body text={str(content.subtitle || content.body)} />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {tiers.map((tier, i) => (
            <div key={i} className={`rounded-xl border p-8 ${tier.highlighted ? 'border-accent bg-accent/5 scale-105' : 'border-border bg-surface'}`}>
              <h3 className="font-display text-lg text-primary font-semibold mb-1">{str(tier.name)}</h3>
              <div className="font-display text-3xl text-accent font-bold mb-1">{str(tier.price)}</div>
              {str(tier.period) && <div className="font-body text-xs text-muted mb-6">{str(tier.period)}</div>}
              <ul className="text-left mb-6">
                {strArr(tier.features).map((f, j) => (
                  <li key={j} className="font-body text-sm text-muted py-2 border-b border-border/50 flex gap-2">
                    <span className="text-accent">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={str(tier.cta_link || tier.cta_href) || '#'} className={`block text-center py-3 rounded-lg font-body font-semibold text-sm ${tier.highlighted ? 'bg-accent text-on-accent' : 'border border-border text-primary hover:border-accent hover:text-accent'} transition-all`}>
                {str(tier.cta_text || tier.cta_label) || 'Wybierz'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericFallback({ content }: { variant: string; content: Record<string, unknown> }) {
  // Ostateczny fallback - renderuj co sie da
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <Eyebrow text={str(content.eyebrow)} />
        <Headline text={str(content.headline || content.heading || content.title || content.name)} />
        <Body text={str(content.body || content.text || content.description || content.subtitle || content.subheadline)} />
        {resolveImage(content.image || content.hero_image) && (
          <ImageBlock src={resolveImage(content.image || content.hero_image)} className="w-full max-w-2xl aspect-video mt-8" />
        )}
        {arr(content.items).length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {arr(content.items).map((item, i) => (
              <div key={i} className="border border-border rounded-xl p-5">
                {str(item.icon) && <div className="text-xl mb-2">{str(item.icon)}</div>}
                <h3 className="font-display text-base text-primary font-semibold mb-1">{str(item.name || item.title || item.label)}</h3>
                <p className="font-body text-xs text-muted">{str(item.desc || item.description)}</p>
                {str(item.price) && <div className="font-display text-sm text-accent font-bold mt-2">{str(item.price)}</div>}
              </div>
            ))}
          </div>
        )}
        {content.cta ? <div className="mt-8"><CtaButton cta={content.cta as Record<string, unknown>} /></div> : null}
      </div>
    </section>
  )
}

// ── Main component ──────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, (props: { content: Record<string, unknown> }) => React.ReactNode> = {
  navbar:       GenericNavbar,
  hero:         GenericHero,
  about:        GenericAbout,
  products:     GenericItems,
  services:     GenericItems,
  advantages:   (p) => <GenericItems content={p.content} bg="bg-bg-alt" />,
  showcase:     GenericGallery,
  stats:        GenericStats,
  testimonials: GenericTestimonials,
  gallery:      GenericGallery,
  cta:          GenericCta,
  contact:      GenericContact,
  pricing:      GenericPricing,
  faq:          GenericFaq,
  blog:         GenericItems,
  footer:       GenericFooter,
}

export default function GenericSection({ variant, content }: GenericProps) {
  // Wyciagnij kategorie z variant_id: "stats_6" -> "stats"
  const category = variant.replace(/_\d+$/, '')
  const Renderer = CATEGORY_MAP[category]

  if (Renderer) {
    return <Renderer content={content} />
  }

  return <GenericFallback variant={variant} content={content} />
}
