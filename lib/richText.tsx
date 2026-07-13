import { type ReactNode } from 'react'

/**
 * Minimal inline formatter for CMS-authored copy.
 *
 * `**bold**` renders as <strong>, `*italic*` renders as <em>. Everything else
 * is plain text. No raw HTML is interpreted, so copy stays safe to author in
 * the Keystatic admin. Keeps the design's bold/italic accents editable without
 * a code change and without pulling in a markdown dependency.
 */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>)
    } else {
      nodes.push(<em key={key++}>{match[2]}</em>)
    }
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}
