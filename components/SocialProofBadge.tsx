// Inline trust badge rendered in hero when business has Google reviews
// (rating >= 4.0). content.social_proof shape is set by orchestrator from
// businessProfile.reviews. Returns null when missing — zero markup for sites
// without research data.

interface SocialProofData {
  rating?: number | null;
  count?: number | null;
  platform?: string | null;
}

export default function SocialProofBadge({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') return null;
  const sp = data as SocialProofData;
  if (typeof sp.rating !== 'number' || sp.rating < 4.0) return null;

  const ratingDisplay = Number.isInteger(sp.rating) ? sp.rating.toFixed(1) : sp.rating.toFixed(1);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '100px',
        background: 'rgba(var(--color-accent, 99 102 241), 0.08)',
        border: '1px solid rgba(var(--color-accent, 99 102 241), 0.18)',
        fontSize: '13px',
        fontFamily: 'var(--font-body, system-ui)',
        color: 'rgb(var(--color-text-primary, 15 15 20))',
      }}
      aria-label={`Ocena ${ratingDisplay} na 5${sp.count ? `, ${sp.count} opinii` : ''}${sp.platform ? `, ${sp.platform}` : ''}`}
    >
      <span style={{ color: '#f59e0b', fontSize: '15px', lineHeight: 1 }} aria-hidden="true">★</span>
      <span style={{ fontWeight: 600 }}>{ratingDisplay}/5</span>
      {sp.count != null && (
        <span style={{ opacity: 0.65 }}>({sp.count} opinii)</span>
      )}
      {sp.platform && (
        <span style={{ opacity: 0.45, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {sp.platform}
        </span>
      )}
    </div>
  );
}
