import { Link } from 'react-router-dom'
import { FaPaw, FaLocationDot } from 'react-icons/fa6'
import { findStatus } from '../../constants/pets'
import { cloudinaryImage } from '../../utils/cloudinaryImage'
import { CARD_IMAGE_WIDTH, preloadDetailImage } from '../../utils/preloadImage'

// Same look as the public PetCard, with the owner's actions (Ver, Editar, Eliminar) over the photo.
const ReportCard = ({ r, activeId, setActiveId, isTouchRef, onDelete, onView }) => {
  const status   = findStatus(r.estado)
  const location = [r.city, r.barrio].filter(Boolean).join(' · ')
  const img      = r.photoURLs?.[0]

  return (
    <article
      onMouseEnter={() => preloadDetailImage(img)}
      className="group overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] cursor-pointer"
    >
      <div
        className="relative aspect-4/3 overflow-hidden bg-cream"
        onClick={(e) => {
          if (isTouchRef.current) {
            const tag = e.target.tagName.toLowerCase()
            if (['button', 'a'].includes(tag)) return
            setActiveId(prev => prev === r.id ? null : r.id)
          } else {
            onView(r)
          }
        }}
      >
        {img
          ? <img
              src={cloudinaryImage(img, CARD_IMAGE_WIDTH)}
              alt={r.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          : <div className="flex h-full items-center justify-center text-6xl text-black/10">
              <FaPaw aria-hidden="true" />
            </div>
        }
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status?.dot ?? 'bg-amber-500'}`} />
          {status ? status.label : r.estado}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="truncate font-display text-2xl font-semibold leading-tight">{r.title || 'Sin nombre'}</h3>
          {location && (
            <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-white/85">
              <FaLocationDot aria-hidden="true" className="shrink-0 text-sun" />
              <span className="truncate">{location}</span>
            </p>
          )}
        </div>

        {/* Overlay de acciones */}
        <div className={`
          absolute inset-0 flex items-center justify-center gap-2
          bg-black/45 backdrop-blur-[2px]
          transition-opacity duration-200
          md:opacity-0 md:group-hover:opacity-100
          ${activeId === r.id ? 'opacity-100' : 'opacity-0'}
        `}>
          <button
            onClick={(e) => { e.stopPropagation(); onView(r) }}
            className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-ink transition hover:bg-sun cursor-pointer"
          >
            Ver
          </button>
          <Link
            to={`/editar-reporte/${r.id}`}
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl bg-sun px-4 py-2 text-xs font-bold text-ink transition hover:bg-sun-deep"
          >
            Editar
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(r.id) }}
            className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ReportCard
