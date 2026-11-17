import { findSpecies, findStatus } from '../constants/pets.js'

// Contact data is left out on purpose: the export is for analysing trends, not for collecting personal data.
const COLUMNS = [
  ['Fecha de publicación', (r) => r.createdAt?.toDate ? r.createdAt.toDate().toISOString() : r.createdAt ?? ''],
  ['Estado', (r) => findStatus(r.estado)?.label ?? r.estado ?? ''],
  ['Tipo de mascota', (r) => findSpecies(r.especie)?.label ?? ''],
  ['Departamento', (r) => r.department ?? ''],
  ['Ciudad', (r) => r.city ?? ''],
  ['Barrio', (r) => r.barrio ?? ''],
  ['Con microchip', (r) => (r.microchipped ? 'Sí' : 'No')],
  ['Fecha de reencuentro', (r) => r.reunitedAt ?? ''],
]

const escape = (value) => {
  const text = String(value)
  return /[",;\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/** CSV with a BOM so Excel opens accents correctly; semicolons match the Colombian Excel locale. */
export function reportsToCsv(reports) {
  const lines = [COLUMNS.map(([title]) => title), ...reports.map((r) => COLUMNS.map(([, get]) => get(r)))]
  return '﻿' + lines.map((row) => row.map(escape).join(';')).join('\r\n')
}
