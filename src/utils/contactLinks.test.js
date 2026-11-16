import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contactLinks } from './contactLinks.js'

const types = (contact) => contactLinks(contact).map((l) => l.type)

test('a Colombian mobile number gives call and WhatsApp actions', () => {
  const links = contactLinks('300 123 4567')
  assert.deepEqual(links.map((l) => l.type), ['call', 'whatsapp'])
  assert.equal(links[0].href, 'tel:3001234567')
  assert.equal(links[1].href, 'https://wa.me/573001234567')
})

test('the +57 prefix is not duplicated in the WhatsApp link', () => {
  const links = contactLinks('+57 310-555-1234')
  assert.equal(links.find((l) => l.type === 'whatsapp').href, 'https://wa.me/573105551234')
})

test('a landline gives a call action but no WhatsApp', () => {
  assert.deepEqual(types('604 444 4144'), ['call'])
})

test('an email gives only an email action', () => {
  const links = contactLinks('demo@example.com')
  assert.deepEqual(links.map((l) => l.type), ['email'])
  assert.equal(links[0].href, 'mailto:demo@example.com')
})

test('mixed text yields every action it contains', () => {
  assert.deepEqual(types('Escribir a ana@correo.co o al 3201112233'), ['email', 'call', 'whatsapp'])
})

test('a social media link is offered as a link', () => {
  assert.deepEqual(types('https://facebook.com/huella'), ['link'])
})

test('text without contact data gives no actions', () => {
  assert.deepEqual(types('Preguntar en la tienda de la esquina'), [])
  assert.deepEqual(types(), [])
})
