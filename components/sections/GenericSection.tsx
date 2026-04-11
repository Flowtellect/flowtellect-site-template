// ─── GenericSection ──────────────────────────────────────────────────────────
//
// Uniwersalny renderer sekcji z variant-aware layoutami.
// Kazda kategoria ma 3-5 roznych layoutow, mapowanych po numerze wariantu.
// Icon names sa mapowane na emoji. Dla custom wygladu - nadal mozna
// pisac dedykowane komponenty w SectionRenderer.tsx.

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
function variantNum(variant: string): number {
  const m = variant.match(/_(\d+)$/)
  return m ? parseInt(m[1], 10) : 1
}

function resolveImage(path: unknown): string | null {
  const s = str(path)
  if (!s || s === 'AUTO') return null
  return s
}

// ── Icon mapping ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, string> = {
  leaf: '🍃', tree: '🌳', flower: '🌸', sun: '☀️', moon: '🌙', star: '⭐',
  sparkles: '✨', sparkle: '✨', fire: '🔥', flame: '🔥', water: '💧',
  droplets: '💧', droplet: '💧', drop: '💧', rain: '🌧️',
  palette: '🎨', pencil: '✏️', brush: '🖌️', scissors: '✂️', pen: '🖊️',
  heart: '❤️', hearts: '💕', diamond: '💎', gem: '💎', crown: '👑',
  trophy: '🏆', medal: '🥇', award: '🏅', ribbon: '🎀',
  clock: '🕐', time: '⏰', calendar: '📅', hourglass: '⏳',
  mail: '✉️', email: '📧', envelope: '✉️',
  phone: '📱', call: '📞', mobile: '📱',
  camera: '📷', photo: '📸', film: '🎬', video: '🎥',
  music: '🎵', note: '🎵', headphones: '🎧',
  book: '📖', books: '📚', library: '📚', read: '📖',
  check: '✅', checkmark: '✅', verified: '✓', tick: '✓',
  shield: '🛡️', security: '🔒', lock: '🔒', key: '🔑',
  rocket: '🚀', launch: '🚀', speed: '⚡',
  target: '🎯', bullseye: '🎯', aim: '🎯',
  lightning: '⚡', bolt: '⚡', zap: '⚡', energy: '⚡', power: '⚡',
  gift: '🎁', present: '🎁', surprise: '🎁',
  chart: '📊', graph: '📊', analytics: '📊', stats: '📊',
  trending: '📈', growth: '📈', increase: '📈',
  globe: '🌍', world: '🌎', earth: '🌍', international: '🌐',
  link: '🔗', chain: '🔗', connect: '🔗',
  code: '💻', laptop: '💻', computer: '💻', tech: '💻', developer: '👨‍💻',
  settings: '⚙️', gear: '⚙️', config: '⚙️', cog: '⚙️', tool: '🔧', tools: '🛠️', wrench: '🔧',
  building: '🏢', office: '🏢', corporate: '🏢',
  store: '🏪', shop: '🛍️', retail: '🛍️',
  cart: '🛒', shopping: '🛒', bag: '👜', basket: '🧺',
  money: '💰', dollar: '💵', euro: '💶', coins: '🪙', cash: '💵', payment: '💳', card: '💳', wallet: '👛',
  handshake: '🤝', deal: '🤝', partner: '🤝', partnership: '🤝',
  team: '👥', users: '👥', people: '👥', group: '👥', community: '👥',
  user: '👤', person: '👤', profile: '👤', account: '👤',
  repeat: '🔄', refresh: '🔄', cycle: '🔄', loop: '🔄', sync: '🔄', subscription: '🔄',
  recycle: '♻️', eco: '🌱', green: '🌿', nature: '🌿', organic: '🌿', natural: '🌿',
  pin: '📍', location: '📍', map: '🗺️', navigate: '🧭', compass: '🧭',
  home: '🏠', house: '🏡',
  car: '🚗', vehicle: '🚗', drive: '🚗', transport: '🚚',
  plane: '✈️', flight: '✈️', travel: '✈️', ship: '🚢',
  package: '📦', box: '📦', delivery: '🚚', shipping: '📦',
  coffee: '☕', tea: '🍵', drink: '🥤',
  food: '🍽️', restaurant: '🍴', dining: '🍽️', chef: '👨‍🍳', cooking: '🍳',
  wine: '🍷', glass: '🥂', cocktail: '🍸', beer: '🍺',
  cake: '🎂', dessert: '🍰', sweet: '🍬', candy: '🍭',
  magic: '🪄', wand: '🪄', wizard: '🧙',
  puzzle: '🧩', solution: '🧩', integration: '🧩',
  bulb: '💡', idea: '💡', light: '💡', lamp: '💡', inspiration: '💡', innovation: '💡',
  mountain: '⛰️', peak: '🏔️', summit: '⛰️',
  wave: '🌊', ocean: '🌊', sea: '🌊', beach: '🏖️',
  wind: '💨', air: '💨', breeze: '💨',
  snowflake: '❄️', snow: '❄️', cold: '❄️', winter: '❄️',
  eye: '👁️', vision: '👁️', see: '👁️', view: '👀', watch: '👀',
  search: '🔍', find: '🔎', magnifier: '🔎', discover: '🔍',
  thumb: '👍', thumbsup: '👍', like: '👍', approve: '👍',
  chat: '💬', message: '💬', comment: '💬', talk: '💬', speech: '💬', conversation: '💬',
  alert: '🔔', bell: '🔔', notification: '🔔', ring: '🔔',
  download: '⬇️', upload: '⬆️', share: '📤', send: '📤',
  play: '▶️', start: '▶️', begin: '▶️',
  edit: '✍️', write: '✍️', compose: '✍️',
  delete: '🗑️', trash: '🗑️', remove: '❌', close: '❌', cancel: '❌',
  info: 'ℹ️', help: '❓', question: '❓', support: '🆘',
  warning: '⚠️', danger: '🚨', error: '❌',
  success: '✅', done: '✅', complete: '✅',
  candle: '🕯️', aroma: '🌺', scent: '🌺', fragrance: '🌺', perfume: '🌺', wax: '🕯️',
  soap: '🧼', clean: '✨', wash: '🧴', spa: '💆', relax: '🧘', yoga: '🧘',
  fitness: '💪', gym: '🏋️', sport: '⚽', health: '💚', medical: '🏥', hospital: '🏥',
  pill: '💊', medicine: '💊', therapy: '🩺', doctor: '👨‍⚕️',
  paint: '🎨', art: '🖼️', design: '🎨', creative: '🎨', draw: '✏️',
  fashion: '👗', dress: '👗', clothing: '👔', style: '✨',
  hair: '💇', haircut: '✂️', salon: '💇', barber: '💈', beauty: '💄', makeup: '💄', cosmetics: '💄',
  pet: '🐾', dog: '🐕', cat: '🐈', animal: '🐾', paw: '🐾',
  smile: '😊', happy: '😊', joy: '😃',
  love: '💕', couple: '💑',
  baby: '👶', child: '👧', family: '👨‍👩‍👧',
  graduate: '🎓', education: '📚', school: '🏫', learn: '📖', study: '📖', course: '🎓', training: '🎓',
  certificate: '📜', diploma: '📜', license: '📋',
  quality: '⭐', premium: '💎', luxury: '✨', exclusive: '🌟',
  fast: '⚡', quick: '🏃', express: '🚀',
  safe: '🛡️', trust: '🤝', reliable: '✅', guarantee: '🛡️',
  custom: '🎨', personalize: '✨', unique: '🌟', bespoke: '✨', handmade: '🤲', handcraft: '🤲', craft: '🤲',
  percent: '💯', discount: '🏷️', sale: '🏷️', offer: '🎫', deal: '🤝', promo: '🎉',
  new: '🆕', hot: '🔥', trending_up: '📈',
  wifi: '📶', signal: '📡', network: '🌐', cloud: '☁️', data: '💾', database: '🗄️',
  print: '🖨️', document: '📄', file: '📁', folder: '📂', report: '📊',
  mic: '🎤', microphone: '🎤', podcast: '🎙️', radio: '📻',
  tv: '📺', screen: '🖥️', monitor: '🖥️', display: '📺',
  battery: '🔋', charge: '🔌', plug: '🔌', electric: '⚡',
  construction: '🏗️', hammer: '🔨', build: '🏗️', repair: '🔧', fix: '🔧', maintenance: '🔧',
  garden: '🌻', plant: '🪴', seed: '🌱', grow: '🌱',
  harvest: '🌾', farm: '🌾', agriculture: '🌾',
  fish: '🐟', fishing: '🎣', marine: '🐠',
  real_estate: '🏘️', property: '🏘️', apartment: '🏢', rent: '🏠',
  insurance: '🛡️', protect: '🛡️', coverage: '☂️', umbrella: '☂️',
  legal: '⚖️', law: '⚖️', justice: '⚖️', court: '🏛️',
  flag: '🚩', milestone: '🏁', finish: '🏁',
  camera_lens: '📷', focus: '🎯', zoom: '🔎',
  thumb_down: '👎', dislike: '👎',
  infinity: '♾️', eternal: '♾️', forever: '♾️',
}

function resolveIcon(icon: unknown): string {
  const raw = str(icon).toLowerCase().trim()
  if (!raw) return '✦'
  // Already an emoji? (starts with non-ASCII)
  if (raw.charCodeAt(0) > 127) return raw
  // Try exact match
  if (ICON_MAP[raw]) return ICON_MAP[raw]
  // Try partial match (e.g. "leaf_icon" -> "leaf")
  for (const key of Object.keys(ICON_MAP)) {
    if (raw.includes(key)) return ICON_MAP[key]
  }
  return '✦'
}

// ── Shared UI pieces ────────────────────────────────────────────────────────

function Eyebrow({ text }: { text: string }) {
  if (!text) return null
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-accent" />
      <span className="text-xs uppercase tracking-[0.3em] text-accent font-accent">{text}</span>
    </div>
  )
}

function Headline({ text, center }: { text: string; center?: boolean }) {
  if (!text) return null
  const lines = Array.isArray(text) ? text : [text]
  return (
    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-primary mb-4 ${center ? 'text-center' : ''}`}>
      {lines.map((line, i) => <span key={i}>{str(line)}{i < lines.length - 1 && <br />}</span>)}
    </h2>
  )
}

function Body({ text, center }: { text: string; center?: boolean }) {
  if (!text) return null
  if (text.includes('<')) {
    return <div className={`font-body text-sm text-muted leading-relaxed mb-6 prose prose-sm ${center ? 'text-center mx-auto' : ''}`} dangerouslySetInnerHTML={{ __html: text }} />
  }
  return <p className={`font-body text-sm md:text-base text-muted leading-relaxed mb-6 max-w-2xl ${center ? 'text-center mx-auto' : ''}`}>{text}</p>
}

function CtaButton({ cta, inverted }: { cta: Record<string, unknown> | null; inverted?: boolean }) {
  if (!cta) return null
  const label = str(cta.label)
  const href = str(cta.href) || '#'
  if (!label) return null
  const cls = inverted
    ? 'inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-bg text-primary font-body font-semibold text-sm hover:opacity-90 transition-opacity'
    : 'inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-on-accent font-body font-semibold text-sm hover:opacity-90 transition-opacity'
  return <a href={href} className={cls}>{label}</a>
}

function CtaOutline({ cta }: { cta: Record<string, unknown> | null }) {
  if (!cta) return null
  const label = str(cta.label)
  const href = str(cta.href) || '#'
  if (!label) return null
  return (
    <a href={href} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-accent text-accent font-body font-semibold text-sm hover:bg-accent hover:text-on-accent transition-all">
      {label}
    </a>
  )
}

function ImageBlock({ src, alt, className }: { src: string | null; alt?: string; className?: string }) {
  if (!src) return <div className={`bg-surface-deep rounded-xl ${className ?? ''}`} />
  return <img src={src} alt={alt ?? ''} className={`rounded-xl object-cover ${className ?? ''}`} loading="lazy" />
}

// ── Category renderers (variant-aware) ──────────────────────────────────────

function GenericNavbar({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const links = arr(content.links)
  const cta = content.cta as Record<string, unknown> | null
  const logo = resolveImage(content.logo)
  const brandName = str(content.brand_name || content.company_name)

  // Patterns: 1-3 classic, 4-6 centered, 7-10 minimal
  if (vn >= 4 && vn <= 6) {
    // Centered logo layout
    return (
      <nav className="py-4 bg-bg border-b border-border sticky top-0 z-50">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {logo && <img src={logo} alt="Logo" className="h-10" />}
            {brandName && <span className="font-display text-lg text-primary font-semibold">{brandName}</span>}
          </div>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <a key={i} href={str(link.href) || '#'} className="font-body text-sm text-muted hover:text-accent transition-colors">{str(link.label)}</a>
            ))}
            {cta && <CtaButton cta={cta} />}
          </div>
        </div>
      </nav>
    )
  }

  if (vn >= 7) {
    // Minimal/transparent
    return (
      <nav className="py-5 bg-transparent absolute top-0 left-0 right-0 z-50">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logo && <img src={logo} alt="Logo" className="h-10" />}
            {brandName && <span className="font-display text-lg text-primary font-bold">{brandName}</span>}
          </div>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <a key={i} href={str(link.href) || '#'} className="font-body text-sm text-primary hover:text-accent transition-colors font-medium">{str(link.label)}</a>
            ))}
          </div>
          {cta && <CtaButton cta={cta} />}
        </div>
      </nav>
    )
  }

  // Classic: logo left, links + cta right
  return (
    <nav className="py-4 bg-bg border-b border-border sticky top-0 z-50">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logo && <img src={logo} alt="Logo" className="h-9" />}
          {brandName && <span className="font-display text-lg text-primary font-semibold">{brandName}</span>}
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <a key={i} href={str(link.href) || '#'} className="font-body text-sm text-muted hover:text-primary transition-colors">{str(link.label)}</a>
          ))}
        </div>
        {cta && <CtaButton cta={cta} />}
      </div>
    </nav>
  )
}

function GenericHero({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const eyebrow = str(content.eyebrow)
  const headline = content.headline
  const subheadline = str(content.subheadline)
  const image = resolveImage(content.hero_image)
  const cta = content.cta_primary as Record<string, unknown> | null
  const ctaSec = content.cta_secondary as Record<string, unknown> | null

  const headlineEl = (
    <>
      {Array.isArray(headline)
        ? headline.map((l, i) => <span key={i}>{str(l)}{i < headline.length - 1 && <br />}</span>)
        : str(headline)}
    </>
  )

  // Pattern C: Centered text over background image (7-9)
  if (vn >= 7 && vn <= 9 && image) {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 px-6 md:px-12 max-w-3xl mx-auto text-center text-white">
          {eyebrow && <div className="text-xs uppercase tracking-[0.4em] mb-6 opacity-80 font-accent">{eyebrow}</div>}
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl leading-tight mb-6">{headlineEl}</h1>
          <p className="font-body text-base md:text-lg opacity-80 mb-8 max-w-xl mx-auto">{subheadline}</p>
          <div className="flex gap-4 justify-center">
            <CtaButton cta={cta} />
            {ctaSec ? <CtaOutline cta={ctaSec} /> : null}
          </div>
        </div>
      </section>
    )
  }

  // Pattern D: Full-screen gradient overlay (10-12)
  if (vn >= 10 && vn <= 12) {
    return (
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {image && <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pb-20 w-full">
          {eyebrow && <div className="text-xs uppercase tracking-[0.4em] text-white/70 mb-4 font-accent">{eyebrow}</div>}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-4 max-w-3xl">{headlineEl}</h1>
          <p className="font-body text-base text-white/70 mb-8 max-w-xl">{subheadline}</p>
          <div className="flex gap-4">
            <CtaButton cta={cta} />
            {ctaSec ? <CtaOutline cta={ctaSec} /> : null}
          </div>
        </div>
      </section>
    )
  }

  // Pattern E: Minimal centered, typography-focused (13-15)
  if (vn >= 13) {
    return (
      <section className="py-28 md:py-40 bg-bg">
        <div className="px-6 md:px-12 max-w-4xl mx-auto text-center">
          {eyebrow && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.4em] text-accent font-accent">{eyebrow}</span>
              <div className="w-12 h-px bg-accent" />
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-primary mb-6">{headlineEl}</h1>
          <p className="font-body text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">{subheadline}</p>
          <div className="flex gap-4 justify-center">
            <CtaButton cta={cta} />
            {ctaSec ? <CtaOutline cta={ctaSec} /> : null}
          </div>
        </div>
      </section>
    )
  }

  // Pattern B: Image left, text right (4-6)
  if (vn >= 4 && vn <= 6) {
    return (
      <section className="py-20 md:py-32 bg-bg">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ImageBlock src={image} alt={str(content.headline)} className="w-full aspect-[4/3]" />
          <div>
            <Eyebrow text={eyebrow} />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-primary mb-4">{headlineEl}</h1>
            <Body text={subheadline} />
            <div className="flex gap-4 mt-6">
              <CtaButton cta={cta} />
              {ctaSec ? <CtaOutline cta={ctaSec} /> : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Pattern A: Text left, image right (1-3, default)
  return (
    <section className="py-20 md:py-32 bg-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow text={eyebrow} />
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-primary mb-4">{headlineEl}</h1>
          <Body text={subheadline} />
          <div className="flex gap-4 mt-6">
            <CtaButton cta={cta} />
            {ctaSec ? <CtaOutline cta={ctaSec} /> : null}
          </div>
        </div>
        <ImageBlock src={image} alt={str(content.headline)} className="w-full aspect-[4/3]" />
      </div>
    </section>
  )
}

function GenericAbout({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const image = resolveImage(content.image) || resolveImage(content.hero_image)
  const highlights = arr(content.highlights)
  const pillars = arr(content.pillars)
  const stats = arr(content.stats)

  const textBlock = (
    <>
      <Eyebrow text={str(content.eyebrow)} />
      <Headline text={str(content.headline)} />
      <Body text={str(content.body)} />
      {stats.length > 0 && (
        <div className="flex gap-8 mt-8 pt-6 border-t border-border">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="font-display text-2xl text-accent font-bold">{str(s.value)}</div>
              <div className="font-body text-xs text-muted">{str(s.label)}</div>
            </div>
          ))}
        </div>
      )}
      {highlights.length > 0 && (
        <div className="grid gap-4 mt-8">
          {highlights.map((h, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-lg flex-shrink-0">{resolveIcon(h.icon)}</div>
              <div>
                <div className="font-display text-sm text-primary font-semibold">{str(h.label || h.title)}</div>
                <div className="font-body text-xs text-muted">{str(h.desc)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {pillars.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {pillars.map((p, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-2">{resolveIcon(p.icon)}</div>
              <div className="font-display text-base text-primary font-semibold mb-1">{str(p.title)}</div>
              <div className="font-body text-xs text-muted">{str(p.body)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )

  // Stacked: full-width image on top (5-6)
  if (vn >= 5) {
    return (
      <section className="py-20 md:py-32 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {image && <ImageBlock src={image} className="w-full aspect-video mb-12 rounded-2xl" />}
          <div className="max-w-3xl mx-auto">{textBlock}</div>
        </div>
      </section>
    )
  }

  // Text left, image right (3-4)
  if (vn >= 3 && vn <= 4) {
    return (
      <section className="py-20 md:py-32 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>{textBlock}</div>
          {image && <ImageBlock src={image} className="w-full aspect-[4/3]" />}
        </div>
      </section>
    )
  }

  // Image left, text right (1-2, default)
  return (
    <section className="py-20 md:py-32 bg-bg-alt">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {image && <ImageBlock src={image} className="w-full aspect-[4/3]" />}
        <div>{textBlock}</div>
      </div>
    </section>
  )
}

function GenericItems({ content, vn, bg }: { content: Record<string, unknown>; vn: number; bg?: string }) {
  const items = arr(content.items) || arr(content.categories) || arr(content.tabs)

  const header = (center?: boolean) => (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <Eyebrow text={str(content.eyebrow)} />
      <Headline text={str(content.headline || content.heading)} center={center} />
      <Body text={str(content.body)} center={center} />
    </div>
  )

  // Alternating rows (11-15)
  if (vn >= 11 && vn <= 15) {
    return (
      <section className={`py-20 md:py-28 ${bg ?? 'bg-bg'}`}>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {header(true)}
          <div className="flex flex-col gap-12">
            {items.map((item, i) => {
              const image = resolveImage(item.image || item.src)
              const reversed = i % 2 === 1
              return (
                <div key={i} className={`grid md:grid-cols-2 gap-10 items-center ${reversed ? 'direction-rtl' : ''}`}>
                  <div className={reversed ? 'md:order-2' : ''}>
                    {image && <img src={image} alt={str(item.name || item.title)} className="w-full aspect-[4/3] object-cover rounded-xl" loading="lazy" />}
                  </div>
                  <div className={reversed ? 'md:order-1' : ''}>
                    {str(item.icon) && <div className="text-3xl mb-3">{resolveIcon(item.icon)}</div>}
                    <h3 className="font-display text-xl text-primary font-semibold mb-2">{str(item.name || item.title || item.label)}</h3>
                    <p className="font-body text-sm text-muted leading-relaxed mb-3">{str(item.desc || item.description)}</p>
                    {str(item.price) && <div className="font-display text-lg text-accent font-bold">{str(item.price)}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // 2-col larger cards (6-10)
  if (vn >= 6 && vn <= 10) {
    return (
      <section className={`py-20 md:py-28 ${bg ?? 'bg-bg'}`}>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {header()}
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((item, i) => {
              const image = resolveImage(item.image || item.src)
              return (
                <div key={i} className="group border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  {image && <img src={image} alt={str(item.name || item.title)} className="w-full aspect-video object-cover" loading="lazy" />}
                  <div className="p-6">
                    {str(item.icon) && <div className="text-2xl mb-3">{resolveIcon(item.icon)}</div>}
                    <h3 className="font-display text-lg text-primary font-semibold mb-2">{str(item.name || item.title || item.label)}</h3>
                    {str(item.desc || item.description) && (
                      <p className="font-body text-sm text-muted leading-relaxed mb-3">{str(item.desc || item.description)}</p>
                    )}
                    {str(item.price) && <div className="font-display text-base text-accent font-bold">{str(item.price)}</div>}
                    {str(item.href || item.cta_href) && str(item.cta_label) && (
                      <a href={str(item.href || item.cta_href)} className="inline-block mt-3 text-sm text-accent font-semibold hover:underline">{str(item.cta_label)} &rarr;</a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          {content.cta ? <div className="mt-10 text-center"><CtaButton cta={content.cta as Record<string, unknown>} /></div> : null}
        </div>
      </section>
    )
  }

  // Standard 3-col grid (1-5, default)
  return (
    <section className={`py-20 md:py-28 ${bg ?? 'bg-bg'}`}>
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {header()}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const image = resolveImage(item.image || item.src)
            return (
              <div key={i} className="group border border-border rounded-xl overflow-hidden hover:border-accent/30 hover:shadow-md transition-all duration-300">
                {image && <img src={image} alt={str(item.name || item.title || item.label)} className="w-full aspect-[4/3] object-cover" loading="lazy" />}
                <div className="p-5">
                  {str(item.icon) && <div className="text-xl mb-2">{resolveIcon(item.icon)}</div>}
                  <h3 className="font-display text-base text-primary font-semibold mb-1">{str(item.name || item.title || item.label)}</h3>
                  {str(item.desc || item.description) && (
                    <p className="font-body text-xs text-muted leading-relaxed mb-2">{str(item.desc || item.description)}</p>
                  )}
                  {str(item.price) && <div className="font-display text-sm text-accent font-bold">{str(item.price)}</div>}
                  {str(item.href || item.cta_href) && str(item.cta_label) && (
                    <a href={str(item.href || item.cta_href)} className="inline-block mt-2 text-xs text-accent font-semibold hover:underline">{str(item.cta_label)} &rarr;</a>
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

function GenericAdvantages({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const items = arr(content.items) || arr(content.highlights) || arr(content.features)

  // Timeline / vertical list (7-8)
  if (vn >= 7 && vn <= 8) {
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto">
          <Eyebrow text={str(content.eyebrow)} />
          <Headline text={str(content.headline || content.heading)} />
          <Body text={str(content.body)} />
          <div className="mt-10 relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            {items.map((item, i) => (
              <div key={i} className="relative pl-14 pb-10 last:pb-0">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-lg border-2 border-accent/30">
                  {resolveIcon(item.icon)}
                </div>
                <h3 className="font-display text-base text-primary font-semibold mb-1">{str(item.name || item.title || item.label)}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{str(item.desc || item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Horizontal icon cards (4-6)
  if (vn >= 4 && vn <= 6) {
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow text={str(content.eyebrow)} />
            <Headline text={str(content.headline || content.heading)} center />
            <Body text={str(content.body)} center />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {resolveIcon(item.icon)}
                </div>
                <div>
                  <h3 className="font-display text-base text-primary font-semibold mb-1">{str(item.name || item.title || item.label)}</h3>
                  <p className="font-body text-sm text-muted leading-relaxed">{str(item.desc || item.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Icon grid 3-col (1-3, 9-10, default)
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow text={str(content.eyebrow)} />
          <Headline text={str(content.headline || content.heading)} center />
          <Body text={str(content.body)} center />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-surface border border-border text-center hover:border-accent/20 hover:shadow-sm transition-all">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-2xl mx-auto mb-4">
                {resolveIcon(item.icon)}
              </div>
              <h3 className="font-display text-base text-primary font-semibold mb-2">{str(item.name || item.title || item.label)}</h3>
              <p className="font-body text-sm text-muted leading-relaxed">{str(item.desc || item.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericStats({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const items = arr(content.items)

  // Cards on bg-alt (5-8)
  if (vn >= 5 && vn <= 8) {
    return (
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {str(content.headline || content.eyebrow) && (
            <h2 className="font-display text-2xl md:text-3xl text-primary text-center mb-10">{str(content.headline || content.eyebrow)}</h2>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div key={i} className="bg-surface rounded-xl p-6 text-center border border-border">
                {str(item.icon) && <div className="text-2xl mb-2">{resolveIcon(item.icon)}</div>}
                <div className="font-display text-3xl md:text-4xl text-accent font-bold leading-none">
                  {num(item.value) || str(item.value)}{str(item.suffix)}
                </div>
                <div className="font-body text-sm text-muted mt-2">{str(item.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Large centered (9-12)
  if (vn >= 9) {
    return (
      <section className="py-20 md:py-28 bg-bg">
        <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
          {str(content.headline || content.eyebrow) && (
            <h2 className="font-display text-2xl md:text-3xl text-primary mb-12">{str(content.headline || content.eyebrow)}</h2>
          )}
          <div className="flex flex-wrap justify-center gap-16">
            {items.map((item, i) => (
              <div key={i}>
                <div className="font-display text-5xl md:text-6xl text-accent font-bold leading-none">
                  {num(item.value) || str(item.value)}{str(item.suffix)}
                </div>
                <div className="font-body text-sm text-muted mt-3">{str(item.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Horizontal row on accent bg (1-4, default)
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

function GenericTestimonials({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const items = arr(content.items)

  // Featured + small (5-8): first testimonial large, rest smaller
  if (vn >= 5 && vn <= 8 && items.length > 1) {
    const featured = items[0]
    const rest = items.slice(1)
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
          <div className="grid md:grid-cols-5 gap-8">
            {/* Featured */}
            <div className="md:col-span-2 bg-accent/5 border border-accent/20 rounded-2xl p-8">
              {num(featured.rating) > 0 && <div className="text-accent text-lg mb-4">{'★'.repeat(num(featured.rating))}</div>}
              <p className="font-body text-base text-primary leading-relaxed mb-6 italic">&ldquo;{str(featured.quote)}&rdquo;</p>
              <div className="flex items-center gap-3 mt-auto">
                {resolveImage(featured.photo) && <img src={resolveImage(featured.photo)!} alt="" className="w-12 h-12 rounded-full object-cover" />}
                <div>
                  <div className="font-body text-sm text-primary font-semibold">{str(featured.author)}</div>
                  {str(featured.role) && <div className="font-body text-xs text-muted">{str(featured.role)}</div>}
                </div>
              </div>
            </div>
            {/* Rest */}
            <div className="md:col-span-3 grid gap-4">
              {rest.map((item, i) => (
                <div key={i} className="bg-surface rounded-xl p-5 border border-border flex gap-4">
                  <div className="flex-1">
                    {num(item.rating) > 0 && <div className="text-accent text-sm mb-2">{'★'.repeat(num(item.rating))}</div>}
                    <p className="font-body text-sm text-muted leading-relaxed italic">&ldquo;{str(item.quote)}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {resolveImage(item.photo) && <img src={resolveImage(item.photo)!} alt="" className="w-8 h-8 rounded-full object-cover" />}
                    <div className="font-body text-xs text-primary font-semibold">{str(item.author)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // 2-col larger cards (9-12)
  if (vn >= 9) {
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {items.map((item, i) => (
              <div key={i} className="bg-surface rounded-2xl p-8 border border-border">
                {num(item.rating) > 0 && <div className="text-accent text-lg mb-4">{'★'.repeat(num(item.rating))}</div>}
                <p className="font-body text-base text-muted leading-relaxed mb-6 italic">&ldquo;{str(item.quote)}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  {resolveImage(item.photo) && <img src={resolveImage(item.photo)!} alt="" className="w-10 h-10 rounded-full object-cover" />}
                  <div>
                    <div className="font-body text-sm text-primary font-semibold">{str(item.author)}</div>
                    {str(item.role || item.company) && <div className="font-body text-xs text-muted">{str(item.role)}{str(item.company) ? `, ${str(item.company)}` : ''}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Standard 3-col grid (1-4, default)
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-surface rounded-xl p-6 border border-border">
              {num(item.rating) > 0 && <div className="text-accent text-sm mb-3">{'★'.repeat(num(item.rating))}{'☆'.repeat(5 - num(item.rating))}</div>}
              <p className="font-body text-sm text-muted leading-relaxed mb-4 italic">&ldquo;{str(item.quote)}&rdquo;</p>
              <div className="flex items-center gap-3">
                {resolveImage(item.photo) && <img src={resolveImage(item.photo)!} alt="" className="w-8 h-8 rounded-full object-cover" />}
                <div>
                  <div className="font-body text-xs text-primary font-semibold">{str(item.author)}</div>
                  {str(item.role || item.company) && <div className="font-body text-xs text-muted">{str(item.role)}{str(item.company) ? `, ${str(item.company)}` : ''}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericGallery({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const images = arr(content.images)

  // Masonry CSS columns (6-10)
  if (vn >= 6 && vn <= 10) {
    return (
      <section className="py-20 md:py-28 bg-bg">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {str(content.heading || content.headline) && (
            <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
          )}
          <div style={{ columnCount: 3, columnGap: '12px' }} className="hidden md:block">
            {images.map((img, i) => {
              const src = resolveImage(img.src || img.image)
              const tall = i % 3 === 0
              return src ? (
                <img key={i} src={src} alt={str(img.alt || img.caption)} className={`w-full object-cover rounded-lg mb-3 ${tall ? 'aspect-[3/4]' : 'aspect-square'}`} loading="lazy" />
              ) : (
                <div key={i} className={`w-full bg-surface-deep rounded-lg mb-3 ${tall ? 'aspect-[3/4]' : 'aspect-square'}`} />
              )
            })}
          </div>
          <div className="grid grid-cols-2 gap-3 md:hidden">
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

  // 2-col large (11-15)
  if (vn >= 11 && vn <= 15) {
    return (
      <section className="py-20 md:py-28 bg-bg">
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          {str(content.heading || content.headline) && (
            <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {images.map((img, i) => {
              const src = resolveImage(img.src || img.image)
              return (
                <div key={i} className="group overflow-hidden rounded-xl">
                  {src ? (
                    <img src={src} alt={str(img.alt || img.caption)} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-surface-deep" />
                  )}
                  {str(img.caption) && <p className="font-body text-xs text-muted mt-2 px-1">{str(img.caption)}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Standard 4-col grid (1-5, 16-20, default)
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
              <img key={i} src={src} alt={str(img.alt || img.caption)} className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity" loading="lazy" />
            ) : (
              <div key={i} className="w-full aspect-square bg-surface-deep rounded-lg" />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GenericCta({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const cta = content.cta as Record<string, unknown> | null

  // Split with image (6-10)
  if (vn >= 6 && vn <= 10) {
    const image = resolveImage(content.image || content.hero_image || content.bg_image)
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            {str(content.eyebrow) && <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4 font-accent">{str(content.eyebrow)}</div>}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary mb-4">{str(content.headline || content.heading)}</h2>
            <Body text={str(content.body || content.text)} />
            <div className="mt-6 flex gap-4">
              <CtaButton cta={cta} />
            </div>
          </div>
          {image ? (
            <ImageBlock src={image} className="w-full aspect-[4/3]" />
          ) : (
            <div className="w-full aspect-[4/3] bg-accent/10 rounded-2xl" />
          )}
        </div>
      </section>
    )
  }

  // Card style on bg (11-15)
  if (vn >= 11 && vn <= 15) {
    return (
      <section className="py-20 md:py-28 bg-bg">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-12 md:p-16 text-center">
            {str(content.eyebrow) && <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4 font-accent">{str(content.eyebrow)}</div>}
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">{str(content.headline || content.heading)}</h2>
            <Body text={str(content.body || content.text)} center />
            <div className="mt-8">
              <CtaButton cta={cta} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Gradient decorative (16-20)
  if (vn >= 16) {
    return (
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent to-accent-dark text-on-accent">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
          {str(content.eyebrow) && <div className="text-xs uppercase tracking-[0.3em] opacity-80 mb-4 font-accent">{str(content.eyebrow)}</div>}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">{str(content.headline || content.heading)}</h2>
          <p className="font-body text-base opacity-80 mb-8 max-w-xl mx-auto">{str(content.body || content.text)}</p>
          <CtaButton cta={cta} inverted />
          {str(content.note) && <p className="mt-4 text-xs opacity-60">{str(content.note)}</p>}
        </div>
      </section>
    )
  }

  // Centered on accent bg (1-5, default)
  return (
    <section className="py-20 md:py-28 bg-accent text-on-accent">
      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
        {str(content.eyebrow) && <div className="text-xs uppercase tracking-[0.3em] opacity-80 mb-4 font-accent">{str(content.eyebrow)}</div>}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">{str(content.headline || content.heading)}</h2>
        <p className="font-body text-base opacity-80 mb-8 max-w-xl mx-auto">{str(content.body || content.text)}</p>
        <CtaButton cta={cta} inverted />
        {str(content.note) && <p className="mt-4 text-xs opacity-70">{str(content.note)}</p>}
      </div>
    </section>
  )
}

function GenericContact({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const infoItems = [
    { key: 'address', label: 'Adres', icon: '📍' },
    { key: 'phone', label: 'Telefon', icon: '📞', href: (v: string) => `tel:${v}` },
    { key: 'email', label: 'E-mail', icon: '✉️', href: (v: string) => `mailto:${v}` },
    { key: 'hours', label: 'Godziny', icon: '🕐' },
  ].filter(x => str(content[x.key]))

  // Centered single column (4-6)
  if (vn >= 4 && vn <= 6) {
    return (
      <section className="py-20 md:py-28 bg-bg">
        <div className="px-6 md:px-12 max-w-2xl mx-auto text-center">
          <Eyebrow text={str(content.eyebrow)} />
          <Headline text={str(content.headline)} center />
          <Body text={str(content.body || content.note)} center />
          <div className="grid gap-6 mt-10">
            {infoItems.map((info) => {
              const val = str(content[info.key])
              return (
                <div key={info.key} className="flex items-center gap-4 justify-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-lg">{info.icon}</div>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-[0.2em] text-accent font-accent mb-0.5">{info.label}</div>
                    {info.href ? (
                      <a href={info.href(val)} className="font-body text-sm text-primary hover:text-accent transition-colors">{val}</a>
                    ) : (
                      <p className="font-body text-sm text-primary">{val}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Card on bg-alt (7-10)
  if (vn >= 7) {
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <div className="bg-surface rounded-2xl border border-border p-10 md:p-14">
            <Eyebrow text={str(content.eyebrow)} />
            <Headline text={str(content.headline)} />
            <Body text={str(content.body || content.note)} />
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              {infoItems.map((info) => {
                const val = str(content[info.key])
                return (
                  <div key={info.key} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-lg flex-shrink-0">{info.icon}</div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-accent font-accent mb-1">{info.label}</div>
                      {info.href ? (
                        <a href={info.href(val)} className="font-body text-sm text-primary hover:text-accent transition-colors">{val}</a>
                      ) : (
                        <p className="font-body text-sm text-primary">{val}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Two columns (1-3, default)
  return (
    <section className="py-20 md:py-28 bg-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <Eyebrow text={str(content.eyebrow)} />
            <Headline text={str(content.headline)} />
            <div className="flex flex-col gap-6 mt-8">
              {infoItems.map((info) => {
                const val = str(content[info.key])
                return (
                  <div key={info.key}>
                    <div className="text-xs uppercase tracking-[0.2em] text-accent font-accent mb-1">{info.label}</div>
                    {info.href ? (
                      <a href={info.href(val)} className="font-body text-sm text-primary hover:text-accent transition-colors">{val}</a>
                    ) : (
                      <p className="font-body text-sm text-primary">{val}</p>
                    )}
                  </div>
                )
              })}
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

function GenericFaq({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const items = arr(content.items)

  // Two-column grid cards (6-10)
  if (vn >= 6 && vn <= 10) {
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div key={i} className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-display text-sm text-primary font-semibold mb-2">{str(item.question)}</h3>
                <div className="font-body text-sm text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: str(item.answer) }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Simple numbered list (11-15)
  if (vn >= 11) {
    return (
      <section className="py-20 md:py-28 bg-bg-alt">
        <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center mb-12">{str(content.heading || content.headline)}</h2>
          <div className="flex flex-col gap-8">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-8 h-8 rounded-full bg-accent text-on-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-base text-primary font-semibold mb-1">{str(item.question)}</h3>
                  <div className="font-body text-sm text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: str(item.answer) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Accordion (1-5, default)
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
        <Headline text={str(content.heading || content.headline)} center />
        <Body text={str(content.subtitle || content.body)} center />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {tiers.map((tier, i) => (
            <div key={i} className={`rounded-2xl border p-8 text-left ${tier.highlighted ? 'border-accent bg-accent/5 shadow-lg relative' : 'border-border bg-surface'}`}>
              {tier.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-on-accent text-xs font-bold px-4 py-1 rounded-full">Popularne</div>}
              <h3 className="font-display text-lg text-primary font-semibold mb-1">{str(tier.name)}</h3>
              <div className="font-display text-3xl text-accent font-bold mb-1">{str(tier.price)}</div>
              {str(tier.period) && <div className="font-body text-xs text-muted mb-6">{str(tier.period)}</div>}
              <ul className="mb-6">
                {strArr(tier.features).map((f, j) => (
                  <li key={j} className="font-body text-sm text-muted py-2 border-b border-border/50 flex gap-2">
                    <span className="text-accent">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={str(tier.cta_link || tier.cta_href) || '#'} className={`block text-center py-3 rounded-lg font-body font-semibold text-sm transition-all ${tier.highlighted ? 'bg-accent text-on-accent' : 'border border-border text-primary hover:border-accent hover:text-accent'}`}>
                {str(tier.cta_text || tier.cta_label) || 'Wybierz'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GenericFooter({ content, vn }: { content: Record<string, unknown>; vn: number }) {
  const links = arr(content.links)
  const columns = arr(content.columns)
  const logo = resolveImage(content.logo)
  const tagline = str(content.tagline)
  const copyright = str(content.copyright)
  const socials = arr(content.socials || content.social_links)

  // Centered simple (6-10)
  if (vn >= 6 && vn <= 10) {
    return (
      <footer className="py-12 md:py-16 bg-surface-deep border-t border-border">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
          {logo && <img src={logo} alt="Logo" className="h-10 mx-auto mb-4" />}
          {tagline && <p className="font-body text-sm text-muted mb-6">{tagline}</p>}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {links.map((link, i) => (
              <a key={i} href={str(link.href) || '#'} className="font-body text-sm text-muted hover:text-accent transition-colors">{str(link.label)}</a>
            ))}
            {columns.map((col) => arr(col.links).map((link, j) => (
              <a key={`c-${j}`} href={str(link.href) || '#'} className="font-body text-sm text-muted hover:text-accent transition-colors">{str(link.label)}</a>
            )))}
          </div>
          {socials.length > 0 && (
            <div className="flex justify-center gap-4 mb-6">
              {socials.map((s, i) => (
                <a key={i} href={str(s.href || s.url) || '#'} className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-on-accent transition-all" aria-label={str(s.platform || s.label)}>
                  {resolveIcon(s.icon || s.platform)}
                </a>
              ))}
            </div>
          )}
          {copyright && <p className="font-body text-xs text-dim">{copyright}</p>}
        </div>
      </footer>
    )
  }

  // Multi-column (1-5, 11-15, default)
  return (
    <footer className="py-12 md:py-16 bg-surface-deep border-t border-border">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-12 mb-8">
          <div className="flex-shrink-0 max-w-xs">
            {logo && <img src={logo} alt="Logo" className="h-9 mb-3" />}
            {tagline && <p className="font-body text-xs text-muted">{tagline}</p>}
            {socials.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socials.map((s, i) => (
                  <a key={i} href={str(s.href || s.url) || '#'} className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm text-accent hover:bg-accent hover:text-on-accent transition-all" aria-label={str(s.platform || s.label)}>
                    {resolveIcon(s.icon || s.platform)}
                  </a>
                ))}
              </div>
            )}
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
        {copyright && (
          <div className="pt-6 border-t border-border">
            <p className="font-body text-xs text-dim">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  )
}

function GenericFallback({ content }: { variant: string; content: Record<string, unknown> }) {
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
                {str(item.icon) && <div className="text-xl mb-2">{resolveIcon(item.icon)}</div>}
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

export default function GenericSection({ variant, content }: GenericProps) {
  const category = variant.replace(/_\d+$/, '')
  const vn = variantNum(variant)

  switch (category) {
    case 'navbar':       return <GenericNavbar content={content} vn={vn} />
    case 'hero':         return <GenericHero content={content} vn={vn} />
    case 'about':        return <GenericAbout content={content} vn={vn} />
    case 'products':     return <GenericItems content={content} vn={vn} />
    case 'services':     return <GenericItems content={content} vn={vn} />
    case 'advantages':   return <GenericAdvantages content={content} vn={vn} />
    case 'showcase':     return <GenericGallery content={content} vn={vn} />
    case 'stats':        return <GenericStats content={content} vn={vn} />
    case 'testimonials': return <GenericTestimonials content={content} vn={vn} />
    case 'gallery':      return <GenericGallery content={content} vn={vn} />
    case 'cta':          return <GenericCta content={content} vn={vn} />
    case 'contact':      return <GenericContact content={content} vn={vn} />
    case 'pricing':      return <GenericPricing content={content} />
    case 'faq':          return <GenericFaq content={content} vn={vn} />
    case 'blog':         return <GenericItems content={content} vn={vn} />
    case 'footer':       return <GenericFooter content={content} vn={vn} />
    default:             return <GenericFallback variant={variant} content={content} />
  }
}
