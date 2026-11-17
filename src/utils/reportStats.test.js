import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeReportStats } from './reportStats.js'

const now = new Date('2026-11-16T12:00:00')

const reports = [
  { estado: 'perdida', especie: 'perro', city: 'Medellín', createdAt: '2026-11-10T10:00:00' },
  { estado: 'perdido', especie: 'gato', city: 'Medellín', createdAt: '2026-11-12T10:00:00' },
  { estado: 'encontrada', especie: 'perro', city: 'Bello', createdAt: '2026-10-05T10:00:00' },
  { estado: 'reencontrada', especie: 'perro', city: 'Envigado', createdAt: '2026-11-01T00:00:00', reunitedAt: '2026-11-03T12:00:00' },
  { estado: 'reencontrada', city: 'Envigado', createdAt: '2026-11-02T00:00:00', reunitedAt: '2026-11-03T00:00:00' },
]

test('statuses are counted, including the old masculine spelling', () => {
  const stats = computeReportStats(reports, { now })
  assert.equal(stats.total, 5)
  assert.deepEqual(stats.byStatus, { perdida: 2, encontrada: 1, reencontrada: 2 })
})

test('reunion rate and average days come from the reunited reports', () => {
  const stats = computeReportStats(reports, { now })
  assert.equal(stats.reunionRate, 40)
  assert.equal(stats.avgDaysToReunion, 1.8)
})

test('species and cities are sorted by frequency and missing species are labelled', () => {
  const stats = computeReportStats(reports, { now })
  assert.deepEqual(stats.bySpecies[0], { label: 'Perro', count: 3 })
  assert.ok(stats.bySpecies.some((s) => s.label === 'Sin especificar' && s.count === 1))
  assert.deepEqual(stats.byCity.map((c) => c.label), ['Envigado', 'Medellín', 'Bello'])
})

test('the monthly series always covers the requested months, oldest first', () => {
  const stats = computeReportStats(reports, { now, months: 3 })
  assert.deepEqual(stats.byMonth.map((m) => [m.key, m.count]), [['2026-09', 0], ['2026-10', 1], ['2026-11', 4]])
})

test('no reports gives zeros and no average', () => {
  const stats = computeReportStats([], { now })
  assert.equal(stats.total, 0)
  assert.equal(stats.reunionRate, 0)
  assert.equal(stats.avgDaysToReunion, null)
})
