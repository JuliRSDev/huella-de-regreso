import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPaw, FaXmark, FaShareNodes } from 'react-icons/fa6'
import Carousel from './Carousel'
import { findSpecies, findStatus } from '../../constants/pets'
import ReportFacts from '../report/ReportFacts'
import ContactPanel from '../report/ContactPanel'
import RelatedReports from '../report/RelatedReports'

const ReportModal = (
  {
    selected,
    setSelected,
    handleDelete,
    onReunite,
    selectedIndex,
    setSelectedIndex,
    mode = "public", // reutilizable
    related = [],
    onSelectRelated,
  }) => {
  const [closing, setClosing] = useState(false)
  const closeButtonRef = useRef(null)
  const scrollRef = useRef(null)

  const close = () => {
    setClosing(true)
    setTimeout(() => {
      setSelected(null)
      setClosing(false)
    }, 180)
  }

  // Cerrar con Escape
  useEffect(() => {
    if (!selected) return
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected])

  // Move keyboard focus into the dialog and start each report at the top of the panel
  useEffect(() => {
    if (!selected) return
    closeButtonRef.current?.focus()
    scrollRef.current?.scrollTo({ top: 0 })
  }, [selected])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  if (!selected) return null

  const status  = findStatus(selected.estado)
  const species = findSpecies(selected.especie)
  const title   = selected.title || 'Sin nombre'

  const overlayAnim = closing ? 'opacity-0' : 'opacity-100'
  const panelAnim   = closing ? 'opacity-0 scale-[0.97] translate-y-3' : 'opacity-100 scale-100 translate-y-0'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${overlayAnim}`}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
        className={`relative flex h-full w-full max-w-6xl flex-col overflow-hidden bg-white shadow-2xl transition-all duration-200 ${panelAnim}
                    sm:h-auto sm:max-h-[90vh] sm:rounded-4xl md:h-[min(90vh,46rem)] md:flex-row`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Cerrar"
          onClick={close}
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:bg-white hover:rotate-90 cursor-pointer"
        >
          <FaXmark aria-hidden="true" className="text-lg" />
        </button>

        {/* Fotos: ocupan todo el alto en computador */}
        <div className="relative h-72 shrink-0 sm:h-96 md:h-auto md:w-[56%]">
          {selected.photoURLs?.length
            ? <Carousel images={selected.photoURLs} index={selectedIndex} setIndex={setSelectedIndex} title={title} />
            : <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-cream text-black/20">
                <FaPaw aria-hidden="true" className="text-7xl" />
                <span className="text-sm text-gray-500">Sin imágenes</span>
              </div>
          }
        </div>

        {/* Información */}
        <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col gap-6 p-6 md:p-8">
            <header className="pr-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink">
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status?.dot ?? 'bg-amber-500'}`} />
                  {status?.label ?? selected.estado}
                </span>
                {species && (
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink">
                    <span aria-hidden="true">{species.emoji}</span> {species.label}
                  </span>
                )}
              </div>
              <h2 id="report-modal-title" className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight text-ink">
                {title}
              </h2>
            </header>

            {selected.description && (
              <p className="text-gray-700 leading-relaxed">{selected.description}</p>
            )}

            <ReportFacts report={selected} />

            {mode === 'public' && <ContactPanel report={selected} />}

            {mode === 'owner' && selected.contact && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Contacto publicado: </span>{selected.contact}
              </p>
            )}

            {/* Acciones */}
            {mode === 'public' && (
              <Link
                to={`/reporte/${selected.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sun px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-sun-deep"
              >
                <FaShareNodes aria-hidden="true" /> Compartir o imprimir cartel
              </Link>
            )}

            {mode === "owner" && status?.value !== 'reencontrada' && (
              <button
                type="button"
                onClick={() => onReunite(selected)}
                className="w-full rounded-2xl bg-sky-50 px-4 py-3 text-sm font-bold text-sky-700 ring-1 ring-sky-200 transition hover:bg-sky-500 hover:text-white cursor-pointer"
              >
                🏡 Ya volvió a casa
              </button>
            )}

            {mode === "owner" && (
              <div className="flex gap-2 border-t border-black/5 pt-4">
                <Link
                  to={`/editar-reporte/${selected.id}`}
                  className="flex-1 rounded-2xl bg-sun px-4 py-3 text-center text-sm font-bold text-ink transition hover:bg-sun-deep"
                >
                  ✏️ Editar
                </Link>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="flex-1 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 ring-1 ring-red-200 transition hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </div>

          {mode === 'public' && onSelectRelated && (
            <RelatedReports city={selected.city} reports={related} onSelect={onSelectRelated} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportModal
