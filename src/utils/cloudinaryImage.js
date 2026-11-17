// Photos were served at their original size (6.8 MB on one page in the Act. 6 audit).
// Cloudinary resizes and picks the best format on the fly when the transformation is part of the URL.

const UPLOAD_SEGMENT = '/image/upload/'

/**
 * @param {string} url  Original Cloudinary delivery URL
 * @param {number} width Display width in CSS pixels
 * @returns {string} URL with automatic format, automatic quality and a width limit
 */
export function cloudinaryImage(url, width) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes(UPLOAD_SEGMENT)) return url
  const [before, after] = url.split(UPLOAD_SEGMENT)
  if (/^(?:[a-z]_[^/]+,?)+\//.test(after)) return url
  return `${before}${UPLOAD_SEGMENT}f_auto,q_auto,c_limit,w_${Math.round(width)}/${after}`
}
