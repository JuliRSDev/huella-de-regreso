// The contact field is free text ("Teléfono, email o Facebook"), so the actions are inferred from it.

const EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/
const URL_PATTERN = /https?:\/\/\S+/i
const PHONE = /(?:\+?57[\s-]?)?(?:\d[\s-]?){7,10}/

const COLOMBIA_MOBILE = /^3\d{9}$/

/**
 * Returns the actions a visitor can take with a report's contact text.
 * @param {string} contact
 * @returns {{ type: 'call' | 'whatsapp' | 'email' | 'link', href: string, label: string }[]}
 */
export function contactLinks(contact = '') {
  const links = []

  const email = contact.match(EMAIL)?.[0]
  if (email) links.push({ type: 'email', href: `mailto:${email}`, label: 'Enviar correo' })

  const url = contact.match(URL_PATTERN)?.[0]
  if (url) links.push({ type: 'link', href: url, label: 'Abrir enlace' })

  const phoneText = contact.replace(EMAIL, '').replace(URL_PATTERN, '').match(PHONE)?.[0]
  if (phoneText) {
    const digits = phoneText.replace(/\D/g, '').replace(/^57(?=3\d{9}$)/, '')
    links.push({ type: 'call', href: `tel:${digits}`, label: 'Llamar' })
    if (COLOMBIA_MOBILE.test(digits)) {
      links.push({ type: 'whatsapp', href: `https://wa.me/57${digits}`, label: 'WhatsApp' })
    }
  }

  return links
}
