// Neighbourhoods are typed by hand, so the same place arrives as "niquía", "Niquia " or "NIQUÍA".
// The display name keeps the accents; the slug drops them so all those variants filter together.

const stripAccents = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Tidy display name: single spaces, letters and digits only, each word capitalised. */
export function normalizeBarrio(text = '') {
  return text
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(^|\s)\p{L}/gu, (match) => match.toUpperCase())
}

/** Accent-insensitive key used for filtering and grouping. */
export function barrioSlug(text = '') {
  return stripAccents(normalizeBarrio(text)).toLowerCase().replace(/\s/g, '')
}
