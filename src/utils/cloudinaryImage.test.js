import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cloudinaryImage } from './cloudinaryImage.js'

const original = 'https://res.cloudinary.com/o46qfn8v/image/upload/v1794191454/abc123.jpg'

test('adds format, quality and width to a Cloudinary URL', () => {
  assert.equal(
    cloudinaryImage(original, 400),
    'https://res.cloudinary.com/o46qfn8v/image/upload/f_auto,q_auto,c_limit,w_400/v1794191454/abc123.jpg',
  )
})

test('leaves an already transformed URL untouched', () => {
  const transformed = cloudinaryImage(original, 400)
  assert.equal(cloudinaryImage(transformed, 800), transformed)
})

test('leaves other hosts and empty values untouched', () => {
  assert.equal(cloudinaryImage('https://example.com/a.jpg', 400), 'https://example.com/a.jpg')
  assert.equal(cloudinaryImage('', 400), '')
  assert.equal(cloudinaryImage(undefined, 400), undefined)
})
