// Minimal markdown -> HTML converter for utility pages (privacy policy,
// terms, etc.). Supports: ## h2, ### h3, **bold**, *italic*, paragraphs.
// Zero dependencies. Output is sanitized (only the patterns we recognize
// produce HTML; the rest is escaped text-safe via paragraph wrapping).

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function markdownToHtml(md: string): string {
  if (!md) return '';

  // Split into blocks separated by blank lines.
  const blocks = md.replace(/\r\n/g, '\n').split(/\n{2,}/);

  return blocks.map((rawBlock) => {
    const block = rawBlock.trim();
    if (!block) return '';

    // Headings
    if (block.startsWith('### ')) {
      const text = applyInline(escapeHtml(block.slice(4)));
      return `<h3 style="font-size:1.1rem;font-weight:600;margin:24px 0 10px">${text}</h3>`;
    }
    if (block.startsWith('## ')) {
      const text = applyInline(escapeHtml(block.slice(3)));
      return `<h2 style="font-size:1.25rem;font-weight:600;margin:32px 0 12px">${text}</h2>`;
    }
    if (block.startsWith('# ')) {
      const text = applyInline(escapeHtml(block.slice(2)));
      return `<h1 style="font-size:1.5rem;font-weight:700;margin:32px 0 16px">${text}</h1>`;
    }

    // Plain paragraph: escape, then apply inline formatting, then turn
    // single newlines into <br> for soft line breaks within a paragraph.
    const escaped = escapeHtml(block).replace(/\n/g, '<br>');
    return `<p style="margin-bottom:16px">${applyInline(escaped)}</p>`;
  }).join('\n');
}

// Inline formatting after escapeHtml. Order matters: bold (**) before italic (*)
// so we don't eat the inner asterisks.
function applyInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
