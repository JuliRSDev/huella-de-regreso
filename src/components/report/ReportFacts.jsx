import { FaPaw, FaLocationDot, FaCalendarDays, FaCalendarCheck, FaMapPin, FaMicrochip } from 'react-icons/fa6'
import { findSpecies } from '../../constants/pets'
import { formatReportDate } from '../../utils/formatDate'

const Fact = ({ icon, label, value, wide }) => {
  const Icon = icon
  return (
    <div className={`flex gap-3 rounded-2xl bg-cream p-3.5 ${wide ? 'col-span-2' : ''}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm">
        <Icon aria-hidden="true" className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-bold uppercase tracking-wide text-gray-600">{label}</dt>
        <dd className="mt-0.5 text-sm font-semibold text-gray-900 wrap-break-word">{value}</dd>
      </div>
    </div>
  )
}

/** The key data of a report as small tiles; fields the report does not have are left out. */
const ReportFacts = ({ report }) => {
  const species = findSpecies(report.especie)
  const facts = [
    { icon: FaPaw, label: 'Tipo de mascota', value: species && `${species.emoji} ${species.label}` },
    { icon: FaCalendarDays, label: 'Publicado', value: formatReportDate(report.createdAt) },
    { icon: FaLocationDot, label: 'Ubicación', value: [report.barrio, report.city, report.department].filter(Boolean).join(', '), wide: true },
    { icon: FaCalendarCheck, label: 'Fecha del hallazgo', value: report.foundDate },
    { icon: FaMicrochip, label: 'Microchip', value: report.microchipped ? report.chipId || 'Sí tiene' : null, wide: true },
    { icon: FaMapPin, label: 'Lugar del hallazgo', value: report.foundPlaceDetails, wide: true },
  ].filter((f) => f.value)

  return (
    <dl className="grid grid-cols-2 gap-3">
      {facts.map((f) => <Fact key={f.label} {...f} />)}
    </dl>
  )
}

export default ReportFacts
