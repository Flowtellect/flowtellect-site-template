// ─── Shared section utilities ────────────────────────────────────────────────
// Icon map, image handling, common UI pieces.
// Client components (ScrollReveal, CountUp) are in ClientComponents.tsx
// to avoid "use client" boundary issues with server component imports.

// Re-export client components so existing imports from "./shared" still work
export { ScrollReveal, CountUp } from "./ClientComponents";

// Also import ScrollReveal for use in Section component below
import { ScrollReveal } from "./ClientComponents";

// ── Icon mapping ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, string> = {
  leaf: '🍃', tree: '🌳', flower: '🌸', sun: '☀️', moon: '🌙', star: '⭐',
  sparkles: '✨', sparkle: '✨', fire: '🔥', flame: '🔥', water: '💧',
  droplets: '💧', droplet: '💧', drop: '💧',
  palette: '🎨', pencil: '✏️', brush: '🖌️', scissors: '✂️', pen: '🖊️',
  heart: '❤️', hearts: '💕', diamond: '💎', gem: '💎', crown: '👑',
  trophy: '🏆', medal: '🥇', award: '🏅', ribbon: '🎀',
  clock: '🕐', time: '⏰', calendar: '📅', hourglass: '⏳',
  mail: '✉️', email: '📧', envelope: '✉️',
  phone: '📱', call: '📞', mobile: '📱',
  camera: '📷', photo: '📸', film: '🎬', video: '🎥',
  music: '🎵', headphones: '🎧',
  book: '📖', books: '📚', library: '📚',
  check: '✅', checkmark: '✅', verified: '✓', tick: '✓',
  shield: '🛡️', security: '🔒', lock: '🔒', key: '🔑',
  rocket: '🚀', launch: '🚀', speed: '⚡',
  target: '🎯', bullseye: '🎯',
  lightning: '⚡', bolt: '⚡', zap: '⚡', energy: '⚡', power: '⚡',
  gift: '🎁', present: '🎁',
  chart: '📊', graph: '📊', analytics: '📊', stats: '📊',
  trending: '📈', growth: '📈',
  globe: '🌍', world: '🌎', earth: '🌍', international: '🌐',
  link: '🔗', chain: '🔗', connect: '🔗',
  code: '💻', laptop: '💻', computer: '💻', tech: '💻',
  settings: '⚙️', gear: '⚙️', cog: '⚙️', tool: '🔧', tools: '🛠️', wrench: '🔧',
  building: '🏢', office: '🏢',
  store: '🏪', shop: '🛍️', retail: '🛍️',
  cart: '🛒', shopping: '🛒', bag: '👜',
  money: '💰', dollar: '💵', coins: '🪙', cash: '💵', payment: '💳', card: '💳', wallet: '👛',
  handshake: '🤝', deal: '🤝', partner: '🤝', partnership: '🤝',
  team: '👥', users: '👥', people: '👥', group: '👥', community: '👥',
  user: '👤', person: '👤', profile: '👤',
  repeat: '🔄', refresh: '🔄', cycle: '🔄', sync: '🔄', subscription: '🔄',
  recycle: '♻️', eco: '🌱', green: '🌿', nature: '🌿', organic: '🌿', natural: '🌿',
  pin: '📍', location: '📍', map: '🗺️', navigate: '🧭', compass: '🧭',
  home: '🏠', house: '🏡',
  car: '🚗', transport: '🚚',
  plane: '✈️', travel: '✈️',
  package: '📦', box: '📦', delivery: '🚚', shipping: '📦',
  coffee: '☕', tea: '🍵',
  food: '🍽️', restaurant: '🍴', dining: '🍽️', cooking: '🍳',
  wine: '🍷', cocktail: '🍸',
  cake: '🎂', dessert: '🍰', sweet: '🍬',
  magic: '🪄', wand: '🪄',
  puzzle: '🧩', solution: '🧩',
  bulb: '💡', idea: '💡', light: '💡', lamp: '💡', innovation: '💡',
  mountain: '⛰️', peak: '🏔️',
  wave: '🌊', ocean: '🌊', sea: '🌊', beach: '🏖️',
  wind: '💨', air: '💨',
  snowflake: '❄️', snow: '❄️',
  eye: '👁️', vision: '👁️', view: '👀', watch: '👀',
  search: '🔍', find: '🔎', discover: '🔍',
  thumb: '👍', thumbsup: '👍', like: '👍',
  chat: '💬', message: '💬', comment: '💬', talk: '💬',
  alert: '🔔', bell: '🔔', notification: '🔔',
  download: '⬇️', upload: '⬆️', share: '📤', send: '📤',
  play: '▶️', start: '▶️',
  edit: '✍️', write: '✍️',
  info: 'ℹ️', help: '❓', question: '❓', support: '🆘',
  candle: '🕯️', aroma: '🌺', scent: '🌺', fragrance: '🌺', perfume: '🌺', wax: '🕯️',
  soap: '🧼', clean: '✨', spa: '💆', relax: '🧘', yoga: '🧘',
  fitness: '💪', gym: '🏋️', health: '💚', medical: '🏥',
  paint: '🎨', art: '🖼️', design: '🎨', creative: '🎨',
  fashion: '👗', style: '✨',
  hair: '💇', haircut: '✂️', salon: '💇', barber: '💈', beauty: '💄', makeup: '💄',
  pet: '🐾', paw: '🐾',
  smile: '😊', happy: '😊',
  love: '💕',
  family: '👨‍👩‍👧',
  graduate: '🎓', education: '📚', school: '🏫', learn: '📖', training: '🎓',
  certificate: '📜', diploma: '📜',
  quality: '⭐', premium: '💎', luxury: '✨', exclusive: '🌟',
  fast: '⚡', quick: '🏃', express: '🚀',
  safe: '🛡️', trust: '🤝', reliable: '✅', guarantee: '🛡️',
  custom: '🎨', unique: '🌟', handmade: '🤲', handcraft: '🤲', craft: '🤲',
  percent: '💯', discount: '🏷️', sale: '🏷️', offer: '🎫', promo: '🎉',
  wifi: '📶', cloud: '☁️', data: '💾',
  construction: '🏗️', hammer: '🔨', build: '🏗️', repair: '🔧',
  garden: '🌻', plant: '🪴', seed: '🌱', grow: '🌱',
  insurance: '🛡️', protect: '🛡️', umbrella: '☂️',
  legal: '⚖️', law: '⚖️',
  flag: '🚩', milestone: '🏁',
  infinity: '♾️', eternal: '♾️',
  // Social media
  facebook: '📘', instagram: '📸', twitter: '🐦', x: '✖️',
  linkedin: '💼', youtube: '▶️', tiktok: '🎵', pinterest: '📌',
  whatsapp: '💬', telegram: '✈️', snapchat: '👻',
};

export function resolveIcon(icon: unknown): string {
  const raw = str(icon).toLowerCase().trim();
  if (!raw) return '✦';
  if (raw.charCodeAt(0) > 127) return raw;
  if (ICON_MAP[raw]) return ICON_MAP[raw];
  for (const key of Object.keys(ICON_MAP)) {
    if (raw.includes(key)) return ICON_MAP[key];
  }
  return '✦';
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}
export function num(v: unknown): number {
  return typeof v === "number" ? v : 0;
}
export function arr(v: unknown): Record<string, unknown>[] {
  return Array.isArray(v) ? (v.filter((x) => x && typeof x === "object") as Record<string, unknown>[]) : [];
}
export function strArr(v: unknown): string[] {
  return Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : [];
}
export function variantNum(variant: string): number {
  const m = variant.match(/_(\d+)$/);
  return m ? parseInt(m[1], 10) : 1;
}

export function resolveImage(path: unknown): string | null {
  const s = str(path);
  if (!s || s === "AUTO") return null;
  return s;
}

// ── Common UI pieces ─────────────────────────────────────────────────────────

export function Eyebrow({ text, center }: { text: string; center?: boolean }) {
  if (!text) return null;
  return (
    <div className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
      <div className="w-8 h-px bg-accent" />
      <span className="text-xs uppercase tracking-[0.3em] text-accent font-accent">{text}</span>
      {center && <div className="w-8 h-px bg-accent" />}
    </div>
  );
}

export function Headline({ text, center, size = "lg" }: { text: string; center?: boolean; size?: "sm" | "md" | "lg" | "xl" }) {
  if (!text) return null;
  const sizes = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-3xl md:text-4xl lg:text-5xl",
    xl: "text-4xl md:text-5xl lg:text-6xl",
  };
  return (
    <h2 className={`font-display ${sizes[size]} leading-tight text-primary mb-4 ${center ? "text-center" : ""}`}>
      {text}
    </h2>
  );
}

export function Body({ text, center }: { text: string; center?: boolean }) {
  if (!text) return null;
  if (text.includes("<")) {
    return <div className={`font-body text-sm md:text-base text-muted leading-relaxed mb-6 prose prose-sm ${center ? "text-center mx-auto" : ""}`} dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return <p className={`font-body text-sm md:text-base text-muted leading-relaxed mb-6 max-w-2xl ${center ? "text-center mx-auto" : ""}`}>{text}</p>;
}

export function CtaButton({ cta, inverted, outline }: { cta: Record<string, unknown> | null; inverted?: boolean; outline?: boolean }) {
  if (!cta) return null;
  const label = str(cta.label);
  const href = str(cta.href) || "#";
  if (!label) return null;
  const cls = outline
    ? "inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-accent text-accent font-body font-semibold text-sm hover:bg-accent hover:text-on-accent transition-all duration-300"
    : inverted
    ? "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg text-primary font-body font-semibold text-sm hover:shadow-lg transition-all duration-300"
    : "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-on-accent font-body font-semibold text-sm hover:shadow-lg hover:brightness-110 transition-all duration-300";
  return <a href={href} className={cls}>{label}</a>;
}

export function ImageBlock({ src, alt, className, gradient }: { src: string | null; alt?: string; className?: string; gradient?: boolean }) {
  if (!src) {
    // Decorative gradient placeholder instead of grey box
    return (
      <div className={`rounded-2xl overflow-hidden ${className ?? ""}`}>
        <div className="w-full h-full bg-gradient-to-br from-accent/10 via-surface to-accent/5 min-h-[200px]" />
      </div>
    );
  }
  return (
    <div className={`rounded-2xl overflow-hidden ${className ?? ""}`}>
      {gradient && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 rounded-2xl" />}
      <img src={src} alt={alt ?? ""} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}

// ── Brand Logo (SVG fallback when no logo image provided) ────────────────────

export function BrandLogo({
  content,
  className = "",
  size = "md",
}: {
  content: Record<string, unknown>;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const logo = resolveImage(content.logo);
  const brandName = str(content.brand_name) || str(content.company_name) || str(content.name) || "Brand";

  // If real logo image exists, use it
  if (logo && !logo.includes("unsplash.com")) {
    const heights = { sm: "h-7", md: "h-9", lg: "h-12" };
    return <img src={logo} alt={brandName} className={`${heights[size]} w-auto ${className}`} />;
  }

  // Generate SVG logo from brand name
  const initials = brandName
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

  const sizes = {
    sm: { icon: 28, text: "text-sm", gap: "gap-2" },
    md: { icon: 36, text: "text-lg", gap: "gap-2.5" },
    lg: { icon: 44, text: "text-xl", gap: "gap-3" },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="44" height="44" rx="12" className="fill-accent" />
        <text
          x="22"
          y="23"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-on-accent"
          style={{
            fontSize: initials.length > 1 ? "16px" : "20px",
            fontWeight: 700,
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {initials}
        </text>
      </svg>
      <span className={`font-display ${s.text} font-semibold text-primary tracking-tight`}>
        {brandName}
      </span>
    </div>
  );
}

// ── Section wrapper with scroll reveal ───────────────────────────────────────

export function Section({
  children,
  bg = "bg-bg",
  className = "",
  id,
  noPadding,
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
  id?: string;
  noPadding?: boolean;
}) {
  return (
    <section id={id} className={`${noPadding ? "" : "py-20 md:py-28"} ${bg} ${className}`}>
      <ScrollReveal>
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">{children}</div>
      </ScrollReveal>
    </section>
  );
}
