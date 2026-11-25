import { cloudinaryImage } from './cloudinaryImage'

// Widths shared by the cards and the detail gallery: the card size is already cached when the
// detail opens, so it can be shown at once while the sharper version arrives.
export const CARD_IMAGE_WIDTH = 480
export const DETAIL_IMAGE_WIDTH = 900

const requested = new Set()

/** Starts downloading the detail-size photo (e.g. on hover) so the detail view opens with it ready. */
export function preloadDetailImage(url) {
  if (!url || typeof Image === 'undefined') return
  const src = cloudinaryImage(url, DETAIL_IMAGE_WIDTH)
  if (requested.has(src)) return
  requested.add(src)
  const img = new Image()
  img.decoding = 'async'
  img.src = src
}
