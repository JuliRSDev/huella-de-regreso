import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatReportDate } from './formatDate.js'

test('missing or invalid dates give null so the field can be hidden', () => {
  assert.equal(formatReportDate(null), null)
  assert.equal(formatReportDate(undefined), null)
  assert.equal(formatReportDate('not a date'), null)
})

test('a Firestore timestamp and a plain date format the same way', () => {
  const date = new Date(2026, 10, 8, 12)
  const timestamp = { toDate: () => date }
  assert.equal(formatReportDate(timestamp), formatReportDate(date))
  assert.match(formatReportDate(date), /2026/)
})
