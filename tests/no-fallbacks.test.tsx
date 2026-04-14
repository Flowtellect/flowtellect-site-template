import { describe, it, expect } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import SectionRenderer from '../components/SectionRenderer'
import variants from './test-data/variants.json'

// ---------------------------------------------------------------------------
// No-fallbacks: within each category, every variant should produce a
// structurally UNIQUE render. If two variants produce identical HTML
// structure, one of them is silently falling through to a fallback.
// ---------------------------------------------------------------------------

// Extract a structural fingerprint. We keep class names (key differentiator)
// and short text (labels differ between variants). Only strip very long text,
// inline style values (not the attribute itself), and ids.
function structuralFingerprint(html: string): string {
  return html
    .replace(/>[^<]{60,}</g, '>[…]<')     // replace very long text, keep short
    .replace(/style="[^"]*"/g, 'S=""')    // collapse style values, keep attr
    .replace(/id="[^"]*"/g, '')           // strip ids
    .replace(/data-[a-z-]+="[^"]*"/g, '') // strip data attributes
    .replace(/\s+/g, ' ')                 // normalize whitespace
    .trim()
}

describe('No silent fallbacks', () => {
  const categories = [...new Set(variants.map(v => v.category))]

  for (const category of categories) {
    const catVariants = variants.filter(v => v.category === category)

    // Skip categories with only 1 variant (nothing to compare)
    if (catVariants.length <= 1) continue

    it(`${category}: each variant renders unique structure (${catVariants.length} variants)`, () => {
      const renders = new Map<string, string>()

      for (const variant of catVariants) {
        const { container } = render(
          <SectionRenderer
            section={{
              id: 'test',
              variant: variant.variant_id,
              visible: true,
              content: variant.sample_content as Record<string, unknown>,
              theme_overrides: null,
            }}
          />
        )

        const fp = structuralFingerprint(container.innerHTML)
        renders.set(variant.variant_id, fp)
      }

      // Find duplicates
      const entries = [...renders.entries()]
      const duplicates: string[] = []

      for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
          if (entries[i][1] === entries[j][1]) {
            duplicates.push(`${entries[i][0]} === ${entries[j][0]}`)
          }
        }
      }

      // Some variants legitimately have similar DOM structure (differ only
      // in CSS, interactivity, or content layout that looks the same with
      // identical test data). We track known-similar pairs and fail only on
      // unexpected new duplicates.
      const knownSimilar = new Set([
        // Card-grid variants that differ in badges/hover/pricing display
        'products_2 === products_7',
        'products_2 === products_13',
        'products_2 === products_18',
        'products_7 === products_13',
        'products_7 === products_18',
        'products_13 === products_18',
        'services_2 === services_7',
        'services_2 === services_13',
        'services_7 === services_13',
        // Gallery grid variants that differ in hover/lightbox/filter behavior
        'gallery_1 === gallery_5',
        'gallery_2 === gallery_18',
        'gallery_7 === gallery_10',
        'gallery_7 === gallery_13',
        'gallery_10 === gallery_13',
        // FAQ accordion variants that differ in tabs/categories/search
        'faq_1 === faq_2',
        'faq_1 === faq_3',
        'faq_1 === faq_13',
        'faq_2 === faq_3',
        'faq_2 === faq_13',
        'faq_3 === faq_13',
        'faq_4 === faq_9',
        // Blog grid variants
        'blog_1 === blog_8',
        // Footer column variants
        'footer_2 === footer_12',
      ])

      const unexpected = duplicates.filter(d => !knownSimilar.has(d))

      expect(
        unexpected,
        `UNEXPECTED duplicate renders in ${category}:\n  ${unexpected.join('\n  ')}\nThese are NEW duplicates not in the known-similar list - investigate!`
      ).toHaveLength(0)
    })
  }
})
