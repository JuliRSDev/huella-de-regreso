import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeBarrio, barrioSlug } from './barrio.js'

test('the display name keeps accents and capitalises each word', () => {
  assert.equal(normalizeBarrio('  santa   maría '), 'Santa María')
  assert.equal(normalizeBarrio('ZÚÑIGA'), 'Zúñiga')
  assert.equal(normalizeBarrio('el poblado'), 'El Poblado')
})

test('symbols are removed but numbers are kept', () => {
  assert.equal(normalizeBarrio('Barrio #12 - Belén!'), 'Barrio 12 Belén')
})

test('accent and case variants share the same slug', () => {
  assert.equal(barrioSlug('Niquía'), 'niquia')
  assert.equal(barrioSlug('niquia'), 'niquia')
  assert.equal(barrioSlug(' NIQUÍA '), 'niquia')
  assert.equal(barrioSlug('Aves María'), 'avesmaria')
})

test('empty input gives empty values', () => {
  assert.equal(normalizeBarrio(), '')
  assert.equal(barrioSlug(''), '')
})
