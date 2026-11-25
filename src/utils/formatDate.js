/**
 * Short Colombian date ("8 nov 2026") for a Firestore Timestamp, a Date or anything Date can parse.
 * Returns null when there is no usable date, so callers can hide the field.
 */
export const formatReportDate = (value) => {
  if (!value) return null
  const date = typeof value.toDate === 'function' ? value.toDate() : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
}
