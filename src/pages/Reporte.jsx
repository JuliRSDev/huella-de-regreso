import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useReport } from '../hooks/useReport'
import { findStatus } from '../constants/pets'
import { cloudinaryImage } from '../utils/cloudinaryImage'
import ShareActions from '../components/report/ShareActions'
import ReportFacts from '../components/report/ReportFacts'
import ContactPanel from '../components/report/ContactPanel'

// The heading doubles as the poster headline when the page is printed.
const POSTER_HEADLINE = {
  perdida: 'SE BUSCA',
  encontrada: 'MASCOTA ENCONTRADA',
  reencontrada: '¡YA VOLVIÓ A CASA!',
}

const Gallery = ({ photos, title }) => {
  const [active, setActive] = useState(0)

  if (!photos?.length) {
    return <div className="flex items-center justify-center h-72 bg-cream rounded-2xl text-6xl" aria-hidden="true">🐾</div>
  }

  return (
    <div>
      <img
        src={cloudinaryImage(photos[active], 1000)}
        alt={`Foto ${active + 1} de ${title}`}
        className="w-full rounded-2xl object-cover h-80 md:h-[28rem]"
      />
      {photos.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2 print:hidden">
          {photos.map((url, i) => (
            <button
              key={url}
              type="button"
              aria-label={`Ver foto ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition cursor-pointer ${i === active ? 'border-amber-400 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={cloudinaryImage(url, 140)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

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
  const url = `${window.location.origin}/reporte/${report.id}`
  const title = report.title || 'Sin nombre'

  return (
    <div className="min-h-screen bg-cream bg-paws mt-20 print:mt-0 print:bg-white print:bg-none">
      <article className="max-w-6xl mx-auto px-4 lg:px-8 py-10 print:py-0">
        <p className="text-center font-display text-5xl md:text-7xl font-bold tracking-wide text-ink">
          {POSTER_HEADLINE[status?.value] ?? 'REPORTE'}
        </p>
        <h1 className="text-center font-display italic text-3xl md:text-4xl font-normal text-amber-700 mt-1 mb-8">{title}</h1>

        <div className="grid md:grid-cols-[1.15fr_1fr] gap-8 print:grid-cols-2 bg-white rounded-3xl shadow-lg ring-1 ring-black/5 p-6 md:p-8 print:shadow-none print:ring-0">
          <Gallery photos={report.photoURLs} title={title} />

          <div className="flex flex-col gap-5">
            {status && (
              <span className={`self-start text-sm font-semibold px-3 py-1 rounded-full ${status.badge}`}>
                {status.emoji} {status.label}
              </span>
            )}
            {report.description && <p className="text-gray-700 leading-relaxed">{report.description}</p>}
            <ReportFacts report={report} />
            <ContactPanel report={report} />
          </div>
        </div>

        <p className="hidden print:block text-center text-sm mt-6">
          Más información y fotos en {url.replace(/^https?:\/\//, '')} · Huella de Regreso
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ShareActions title={title} url={url} />
          <Link to="/publicaciones" className="text-sm text-gray-600 underline print:hidden">← Volver a publicaciones</Link>
        </div>
      </article>
    </div>
  )
}

export default Reporte
