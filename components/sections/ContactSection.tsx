// ─── ContactSection ──────────────────────────────────────────────────────────
// 10 variants: two columns, centered, card

import {
  ScrollReveal,
  str,
  Eyebrow,
  Headline,
  Body,
  Section,
} from "./shared";

interface ContactProps {
  content: Record<string, unknown>;
  vn: number;
}

interface ContactItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

function buildContactItems(content: Record<string, unknown>): ContactItem[] {
  const items: ContactItem[] = [];
  const address = str(content.address);
  const phone = str(content.phone);
  const email = str(content.email);
  const hours = str(content.hours);

  if (address) items.push({ icon: "\uD83D\uDCCD", label: "Adres", value: address });
  if (phone) items.push({ icon: "\uD83D\uDCDE", label: "Telefon", value: phone, href: `tel:${phone.replace(/\s/g, "")}` });
  if (email) items.push({ icon: "\u2709\uFE0F", label: "Email", value: email, href: `mailto:${email}` });
  if (hours) items.push({ icon: "\uD83D\uDD50", label: "Godziny", value: hours });

  return items;
}

function ContactItemRow({ item }: { item: ContactItem }) {
  const content = item.href ? (
    <a href={item.href} className="text-primary hover:text-accent transition-colors">
      {item.value}
    </a>
  ) : (
    <span className="text-primary">{item.value}</span>
  );

  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
        <span className="text-lg">{item.icon}</span>
      </div>
      <div>
        <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">{item.label}</p>
        <p className="font-body text-sm md:text-base">{content}</p>
      </div>
    </div>
  );
}

export default function ContactSection({ content, vn }: ContactProps) {
  const eyebrow = str(content.eyebrow);
  const headline = str(content.headline);
  const body = str(content.body) || str(content.note);
  const items = buildContactItems(content);

  // ── vn 1-3: Two columns ──────────────────────────────────────────────────

  if (vn <= 3) {
    return (
      <Section bg="bg-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <ScrollReveal delay={0}>
              <Eyebrow text={eyebrow} />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Headline text={headline} />
            </ScrollReveal>

            {items.length > 0 && (
              <ScrollReveal delay={200}>
                <div className="space-y-6 mt-8">
                  {items.map((item, i) => (
                    <ContactItemRow key={i} item={item} />
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          <div className="flex items-center">
            {body ? (
              <ScrollReveal delay={200}>
                <Body text={body} />
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={200}>
                <div className="w-full h-full min-h-[200px] rounded-2xl bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
              </ScrollReveal>
            )}
          </div>
        </div>
      </Section>
    );
  }

  // ── vn 4-6: Centered ─────────────────────────────────────────────────────

  if (vn <= 6) {
    return (
      <Section bg="bg-bg">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <Eyebrow text={eyebrow} center />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Headline text={headline} center />
          </ScrollReveal>

          {body && (
            <ScrollReveal delay={200}>
              <Body text={body} center />
            </ScrollReveal>
          )}

          {items.length > 0 && (
            <ScrollReveal delay={300}>
              <div className="space-y-6 mt-8 inline-flex flex-col items-start text-left">
                {items.map((item, i) => (
                  <ContactItemRow key={i} item={item} />
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </Section>
    );
  }

  // ── vn 7-10: Card ────────────────────────────────────────────────────────

  return (
    <Section bg="bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal delay={0}>
          <div className="bg-surface rounded-2xl border border-border p-10 md:p-14">
            <Headline text={headline} center />

            {body && <Body text={body} center />}

            {items.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {items.map((item, i) => (
                  <ContactItemRow key={i} item={item} />
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
