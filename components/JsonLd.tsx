// Schema.org LocalBusiness JSON-LD for SEO rich results (Google Knowledge Panel,
// local business cards). Rendered inline in the page tree so it ends up in the
// prerendered HTML next to the content it describes.
// See: https://schema.org/LocalBusiness

interface Props {
  businessName: string;
  description: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  openingHours?: string | null;
  url?: string;
  rating?: number | null;
  reviewCount?: number | null;
}

export default function JsonLd({
  businessName,
  description,
  phone,
  email,
  address,
  openingHours,
  url,
  rating,
  reviewCount,
}: Props) {
  if (!businessName) return null;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
  };

  if (description) schema.description = description;
  if (url) schema.url = url;
  if (phone) schema.telephone = phone;
  if (email) schema.email = email;

  if (address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: address,
    };
  }

  if (openingHours) {
    // Keep as free-form string; Google will parse best-effort. Structured parsing
    // (e.g. "Mo-Fr 09:00-17:00") can be added later if opening hours in content
    // become normalized.
    schema.openingHours = openingHours;
  }

  if (rating && reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
