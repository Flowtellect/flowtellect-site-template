import { describe, it, expect } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import SectionRenderer from '../components/SectionRenderer'
import variants from './test-data/variants.json'

// ---------------------------------------------------------------------------
// Variant rendering: every variant_id renders without crashing and produces
// non-empty, valid output. This catches runtime errors in JSX, missing
// imports, and broken field access.
// ---------------------------------------------------------------------------

describe('Section variant rendering', () => {
  for (const variant of variants) {
    it(`${variant.variant_id} renders without crashing`, () => {
      const { container } = render(
        <SectionRenderer
          section={{
            id: 'test-section',
            variant: variant.variant_id,
            visible: true,
            content: variant.sample_content as Record<string, unknown>,
            theme_overrides: null,
          }}
        />
      )

      // Must produce some output
      expect(container.innerHTML.length).toBeGreaterThan(0)
    })

    it(`${variant.variant_id} has no "undefined" text`, () => {
      const { container } = render(
        <SectionRenderer
          section={{
            id: 'test-section',
            variant: variant.variant_id,
            visible: true,
            content: variant.sample_content as Record<string, unknown>,
            theme_overrides: null,
          }}
        />
      )

      // "undefined" appearing as text means a field wasn't handled
      expect(container.textContent).not.toContain('undefined')
    })
  }

  // Edge case: visible=false should render nothing
  it('visible=false renders null', () => {
    const { container } = render(
      <SectionRenderer
        section={{
          id: 'test-hidden',
          variant: 'hero_1',
          visible: false,
          content: {},
          theme_overrides: null,
        }}
      />
    )
    expect(container.innerHTML).toBe('')
  })

  // Edge case: empty content should not crash
  it('empty content does not crash', () => {
    const { container } = render(
      <SectionRenderer
        section={{
          id: 'test-empty',
          variant: 'hero_1',
          visible: true,
          content: {},
          theme_overrides: null,
        }}
      />
    )
    expect(container.innerHTML.length).toBeGreaterThan(0)
  })
})
