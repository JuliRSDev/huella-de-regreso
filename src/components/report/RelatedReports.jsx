import { findStatus } from '../../constants/pets'
import { cloudinaryImage } from '../../utils/cloudinaryImage'

/** Small strip of other reports from the same city, so a search does not end at one pet. */
const RelatedReports = ({ city, reports, onSelect }) => {
  if (!reports?.length) return null

  return (
    <section className="mt-auto border-t border-black/5 bg-cream/70 px-6 py-6 md:px-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Otros reportes en {city}</h3>
      <ul className="mt-3 grid gap-2">
        {reports.map((r) => {
          const status = findStatus(r.estado)
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => onSelect(r)}
                className="w-full flex items-center gap-3 rounded-2xl bg-white p-2 pr-4 text-left ring-1 ring-black/5 hover:ring-sun-deep hover:shadow-sm transition cursor-pointer"
              >
                {r.photoURLs?.[0] ? (
                  <img src={cloudinaryImage(r.photoURLs[0], 120)} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl">🐾</span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-gray-900">{r.title || 'Sin nombre'}</span>
                  <span className="block truncate text-xs text-gray-600">
                    {[status?.label, r.barrio].filter(Boolean).join(' · ')}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RelatedReports
