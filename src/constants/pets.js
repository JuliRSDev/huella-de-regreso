// Single source for the values a report can take, so forms, filters and badges always agree.

export const SPECIES = [
  { value: 'perro', label: 'Perro', emoji: '🐶' },
  { value: 'gato', label: 'Gato', emoji: '🐱' },
  { value: 'otra', label: 'Otra', emoji: '🐾' },
]

export const STATUSES = [
  { value: 'perdida', label: 'Perdida', emoji: '🔴', badge: 'bg-red-100 text-red-700 ring-1 ring-red-200' },
  { value: 'encontrada', label: 'Encontrada', emoji: '🟢', badge: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' },
  { value: 'reencontrada', label: 'Reencontrada', emoji: '🏡', badge: 'bg-sky-100 text-sky-700 ring-1 ring-sky-200' },
]

// Reports created before the statuses were unified used masculine forms.
const LEGACY_STATUS = { perdido: 'perdida', encontrado: 'encontrada' }

export const findSpecies = (value) => SPECIES.find((s) => s.value === value) ?? null

export const findStatus = (value = '') => {
  const normalized = value.trim().toLowerCase()
  const key = LEGACY_STATUS[normalized] ?? normalized
  return STATUSES.find((s) => s.value === key) ?? null
}
