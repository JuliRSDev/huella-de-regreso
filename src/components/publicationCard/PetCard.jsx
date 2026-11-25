/**
 * PetCard.jsx
 * Tarjeta de un reporte: la foto ocupa la parte superior con el nombre y la ubicación encima,
 * el estado en una etiqueta y, abajo, la descripción, el tipo de mascota y la fecha.
 */
import { FaPaw, FaLocationDot, FaCamera, FaArrowRight } from 'react-icons/fa6'
import { findSpecies, findStatus } from '../../constants/pets'
import { cloudinaryImage } from '../../utils/cloudinaryImage'
import { formatReportDate } from '../../utils/formatDate'
import { CARD_IMAGE_WIDTH, preloadDetailImage } from '../../utils/preloadImage'

const PetCard = ({ report, onClick }) => {
  const status  = findStatus(report.estado)
  const species = findSpecies(report.especie)
  const dateStr = formatReportDate(report.createdAt)
  const img     = report.photoURLs?.[0]
  const photos  = report.photoURLs?.length ?? 0
  const place   = [report.city, report.barrio].filter(Boolean).join(' · ') || 'Ubicación no especificada'

  // Hovering or focusing the card starts the download of the detail photo
  const warmUp = () => preloadDetailImage(img)

  return (
    <article
      onClick={onClick}
      onMouseEnter={warmUp}
      onFocus={warmUp}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        onClick?.()
      }}
      className='
        group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white cursor-pointer
        ring-1 ring-black/5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)]
        transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-deep focus-visible:ring-offset-2
      '
    >
      {/* ── Foto con nombre y ubicación encima ── */}
      <div className='relative aspect-4/3 overflow-hidden bg-cream'>
        {img ? (
          <img
            src={cloudinaryImage(img, CARD_IMAGE_WIDTH)}
            alt={report.title || 'Mascota reportada'}
            loading='lazy'
            className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-6xl text-black/10'>
            <FaPaw aria-hidden='true' />
          </div>
        )}
        <div aria-hidden='true' className='absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent' />

        <span className='absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur'>
          <span aria-hidden='true' className={`h-2 w-2 rounded-full ${status?.dot ?? 'bg-amber-500'}`} />
          {status?.label ?? (report.estado || 'Sin estado')}
        </span>

        {photos > 1 && (
          <span className='absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur'>
            <FaCamera aria-hidden='true' /> {photos}
          </span>
        )}

        <div className='absolute inset-x-0 bottom-0 p-4 text-white'>
          <h2 className='truncate font-display text-2xl font-semibold leading-tight'>
            {report.title || 'Sin nombre'}
          </h2>
          <p className='mt-1 flex items-center gap-1.5 truncate text-sm text-white/85'>
            <FaLocationDot aria-hidden='true' className='shrink-0 text-sun' />
            <span className='truncate'>{place}</span>
          </p>
        </div>
      </div>

      {/* ── Descripción y datos ── */}
      <div className='flex flex-1 flex-col p-5'>
        <p className='line-clamp-2 text-sm leading-relaxed text-gray-600'>
          {report.description || 'Sin descripción.'}
        </p>

        <div className='mt-auto flex items-center justify-between gap-3 border-t border-black/5 pt-4'>
          <div className='flex min-w-0 items-center gap-2 text-xs text-gray-600'>
            {species && (
              <span className='shrink-0 rounded-full bg-cream px-2.5 py-1 font-semibold text-ink'>
                <span aria-hidden='true'>{species.emoji}</span> {species.label}
              </span>
            )}
            {dateStr && <span className='truncate'>{dateStr}</span>}
          </div>
          <span
            aria-hidden='true'
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sun text-ink transition-transform duration-300 group-hover:translate-x-1'
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </article>
  )
}

export default PetCard
