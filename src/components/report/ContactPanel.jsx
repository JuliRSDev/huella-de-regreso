import { FaPhone, FaWhatsapp, FaEnvelope, FaLink } from 'react-icons/fa6'
import { findStatus } from '../../constants/pets'
import { contactLinks } from '../../utils/contactLinks'

const ACTION_ICON = { call: FaPhone, whatsapp: FaWhatsapp, email: FaEnvelope, link: FaLink }

const HEADING = {
  perdida: { title: '¿La viste?', text: 'Avísale a su familia: un mensaje puede ser la pista que falta.' },
  encontrada: { title: '¿Es tu mascota?', text: 'Comunícate con quien la encontró para confirmar que es ella.' },
  reencontrada: { title: 'Ya volvió a casa', text: 'Gracias a quienes ayudaron a difundir este reporte.' },
}

/** Contact block of a report: the data as text (it also prints on the poster) and one-tap actions. */
const ContactPanel = ({ report }) => {
  const status = findStatus(report.estado)
  const heading = HEADING[status?.value] ?? HEADING.perdida
  const reunited = status?.value === 'reencontrada'
  const actions = reunited ? [] : contactLinks(report.contact)

  return (
    <div className="rounded-2xl bg-sun/20 ring-1 ring-sun-deep/40 p-4">
      <p className="font-display text-xl font-semibold text-ink">{heading.title}</p>
      <p className="text-sm text-gray-700 mt-0.5">{heading.text}</p>
      {!reunited && report.contact && (
        <p className="mt-3 text-sm">
          <span className="font-semibold text-gray-600">Contacto: </span>
          <span className="font-semibold text-gray-900 break-all">{report.contact}</span>
        </p>
      )}
      {actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 print:hidden">
          {actions.map((action, i) => {
            const Icon = ACTION_ICON[action.type] ?? FaLink
            return (
              <a
                key={action.type}
                href={action.href}
                target={action.type === 'call' || action.type === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  i === 0 ? 'bg-ink text-white hover:bg-black' : 'bg-white text-gray-900 ring-1 ring-amber-300 hover:bg-amber-50'
                }`}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {action.label}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ContactPanel
