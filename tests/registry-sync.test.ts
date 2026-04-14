import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import variants from './test-data/variants.json'

// ---------------------------------------------------------------------------
// Registry-sync: every variant_id in the CMS registry MUST have a matching
// implementation (vn === N check) in the template section component.
// This prevents adding new variants to the CMS without a template component.
// ---------------------------------------------------------------------------

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function findSectionFile(category: string): string | null {
  const candidates = [
    `components/sections/${capitalize(category)}Section.tsx`,
    `components/sections/${capitalize(category)}.tsx`,
  ]
  for (const c of candidates) {
    const full = path.join(process.cwd(), c)
    if (fs.existsSync(full)) return full
  }
  return null
}

describe('Registry-Template sync', () => {
  const categories = [...new Set(variants.map(v => v.category))]

  // ------ Category-level: section file exists ------
  describe('Section files exist', () => {
    for (const category of categories) {
      it(`${category}: component file exists`, () => {
        const file = findSectionFile(category)
        expect(file, `Missing component for category "${category}"`).not.toBeNull()
      })
    }
  })

  // ------ Variant-level: vn check exists in code ------
  describe('Variant implementations', () => {
    // Cache file contents to avoid reading the same file 200+ times
    const fileCache = new Map<string, string>()

    function getFileContent(category: string): string | null {
      if (fileCache.has(category)) return fileCache.get(category)!
      const filePath = findSectionFile(category)
      if (!filePath) return null
      const content = fs.readFileSync(filePath, 'utf-8')
      fileCache.set(category, content)
      return content
    }

    for (const variant of variants) {
      const vn = parseInt(variant.variant_id.split('_').pop() || '0')

      it(`${variant.variant_id} has vn===${vn} check`, () => {
        const content = getFileContent(variant.category)
        expect(content, `Cannot read file for ${variant.category}`).not.toBeNull()

        // Check for any form of vn equality check:
        //   vn === N, vn===N, vn == N, vn==N
        const patterns = [
          `vn === ${vn}`,
          `vn===${vn}`,
          `vn == ${vn}`,
          `vn==${vn}`,
        ]

        const hasCheck = patterns.some(p => content!.includes(p))
        expect(hasCheck, `${variant.variant_id}: no "vn === ${vn}" found in component`).toBe(true)
      })
    }
  })
})
