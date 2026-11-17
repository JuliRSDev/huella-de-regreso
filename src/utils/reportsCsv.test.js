import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reportsToCsv } from './reportsCsv.js'

test('the CSV has a header, readable labels and no contact data', () => {
  const csv = reportsToCsv([
    { createdAt: '2026-11-10T10:00:00.000Z', estado: 'perdido', especie: 'gato', department: 'Antioquia', city: 'Medellín', barrio: 'Belén', contact: '3001234567' },
  ])
  const [header, row] = csv.replace('﻿', '').split('\r\n')
  assert.ok(header.startsWith('Fecha de publicación;Estado;Tipo de mascota'))
  assert.equal(row, '2026-11-10T10:00:00.000Z;Perdida;Gato;Antioquia;Medellín;Belén;No;')
  assert.ok(!csv.includes('3001234567'))
})

test('values with separators or quotes are escaped', () => {
  const csv = reportsToCsv([{ barrio: 'San Javier; "La Loma"' }])
  assert.ok(csv.includes('"San Javier; ""La Loma"""'))
})
