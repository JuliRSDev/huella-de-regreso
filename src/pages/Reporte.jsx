import { Link, useParams } from 'react-router-dom'
import { useReport } from '../hooks/useReport'
import { findSpecies, findStatus } from '../constants/pets'
import { contactLinks } from '../utils/contactLinks'
import { cloudinaryImage } from '../utils/cloudinaryImage'
import ShareActions from '../components/report/ShareActions'

// The heading doubles as the poster headline when the page is printed.
const POSTER_HEADLINE = {
  perdida: 'SE BUSCA',
  encontrada: 'MASCOTA ENCONTRADA',
  reencontrada: '¡YA VOLVIÓ A CASA!',
}

const Row = ({ label, value }) =>
  value ? (
    <div>
      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</dt>
      <dd className="text-gray-800 mt-0.5">{value}</dd>
    </div>
  ) : null

const Reporte = () => {
  const { id } = useParams()
  const { report, loading, error } = useReport(id)

  if (loading) return <p role="status" className="mt-32 text-center text-gray-500">Cargando reporte…</p>

  if (error || !report) {
    return (
      <div className="mt-32 text-center px-4">
        <p className="text-lg font-semibold text-gray-700">{error || 'Este reporte no existe o fue eliminado.'}</p>
        <Link to="/publicaciones" className="inline-block mt-4 text-amber-700 underline">Ver todas las publicaciones</Link>
      </div>
    )
  }

  const status = findStatus(report.estado)
  const species = findSpecies(report.especie)
  const location = [report.barrio, report.city, report.department].filter(Boolean).join(', ')
  const url = `${window.location.origin}/reporte/${report.id}`
  const photo = report.photoURLs?.[0]

  return (
    <main className="min-h-screen bg-gray-50 mt-20 print:mt-0 print:bg-white">
      <article className="max-w-4xl mx-auto px-4 py-10 print:py-0">
        <p className="text-center text-4xl md:text-5xl font-extrabold tracking-wide text-gray-900 mb-2">
          {POSTER_HEADLINE[status?.value] ?? 'REPORTE'}
        </p>
        <h1 className="text-center text-2xl font-bold text-amber-600 mb-6">{report.title || 'Sin nombre'}</h1>

        <div className="grid md:grid-cols-2 gap-8 print:grid-cols-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 print:shadow-none print:border-0">
          {photo ? (
            <img src={cloudinaryImage(photo, 900)} alt={`Foto de ${report.title || 'la mascota'}`} className="w-full rounded-xl object-cover max-h-[28rem]" />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl text-6xl" aria-hidden="true">🐾</div>
          )}

          <div className="space-y-4">
            {status && (
              <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${status.badge}`}>
                {status.emoji} {status.label}
              </span>
            )}
            <dl className="space-y-3">
              <Row label="Tipo de mascota" value={species?.label} />
              <Row label="Ubicación" value={location} />
              <Row label="Descripción" value={report.description} />
              <Row label="Fecha de hallazgo" value={report.foundDate} />
              <Row label="Lugar de hallazgo" value={report.foundPlaceDetails} />
              <Row label="Microchip" value={report.microchipped ? report.chipId || 'Sí' : null} />
              <Row label="Contacto" value={report.contact} />
            </dl>

            <div className="flex flex-wrap gap-2 print:hidden">
              {contactLinks(report.contact).map((action) => (
                <a
                  key={action.type}
                  href={action.href}
                  target={action.type === 'call' || action.type === 'email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 ring-1 ring-amber-200 text-sm font-semibold hover:bg-amber-100"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="hidden print:block text-center text-sm mt-6">
          Más información y fotos en {url.replace(/^https?:\/\//, '')} · Huella de Regreso
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ShareActions title={report.title || 'Mascota reportada'} url={url} />
          <Link to="/publicaciones" className="text-sm text-gray-500 underline print:hidden">← Volver a publicaciones</Link>
        </div>
      </article>
    </main>
  )
}

export default Reporte
