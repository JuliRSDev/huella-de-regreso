import { lazy, Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePublicaciones } from '../components/publicationCard/Usepublicaciones'
import SearchBar  from '../components/publicationCard/SearchBar'
import FilterBar  from '../components/publicationCard/Filterbar'
import StatsBar   from '../components/publicationCard/StatsBar'
import PetGrid    from '../components/publicationCard/PetGrid'
import { barrioSlug } from '../utils/barrio'
import PageBanner from '../components/common/PageBanner'
import StatusCounters from '../components/common/StatusCounters'

// Modal con lazy load (componente pesado); se descarga apenas carga la página para que abrir un reporte no espere
const loadReportModal = () => import('../components/myReports/ReportModal')
const ReportModal = lazy(loadReportModal)

const RELATED_COUNT = 3

const LiveDot = () => (
  <span className='relative flex h-2.5 w-2.5'>
    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'/>
    <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500'/>
  </span>
)

/* ─────────────────────────────────────────────
   Publicaciones — página principal
   ────────────────────────────────────────────*/
const Publicaciones = () => {
  /* Filtros Firestore */
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [cityFilter,       setCityFilter]       = useState('')
  const [barrioFilter,     setBarrioFilter]      = useState('')
  const [estadoFilter,     setEstadoFilter]      = useState('')
  const [especieFilter,    setEspecieFilter]     = useState('')

  /* Búsqueda client-side; el buscador del inicio llega como ?q= */
  const [searchParams] = useSearchParams()
  const [searchQuery,    setSearchQuery]    = useState(() => searchParams.get('q') ?? '')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  /* Modal */
  const [selected,      setSelected]      = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => { loadReportModal() }, [])

  /* Debounce búsqueda */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery.trim().toLowerCase()), 300)
    return () => clearTimeout(t)
  }, [searchQuery])

  /* Datos */
  const { reports, loading, error, hasMore, loadingMore, loadMore } = usePublicaciones({
    departmentFilter,
    cityFilter,
    barrioFilter,
    estadoFilter,
    especieFilter,
  })

  /* Opciones de barrio derivadas de los reportes cargados: una por slug, con el nombre que se ve */
  const barrios = useMemo(() => {
    const bySlug = new Map()
    for (const r of reports) {
      const slug = r.barrioSlug || barrioSlug(r.barrio)
      if (slug && !bySlug.has(slug)) bySlug.set(slug, r.barrio)
    }
    return Array.from(bySlug, ([value, label]) => ({ value, label }))
  }, [reports])

  /* Filtrado client-side (búsqueda) */
  const filtered = useMemo(() => {
    if (!debouncedSearch) return reports
    return reports.filter(r => {
      const s = debouncedSearch
      return (
        r.title?.toLowerCase().includes(s)       ||
        r.city?.toLowerCase().includes(s)         ||
        r.barrio?.toLowerCase().includes(s)       ||
        r.description?.toLowerCase().includes(s)
      )
    })
  }, [reports, debouncedSearch])

  /* Otros reportes de la misma ciudad para la ventana de detalle */
  const related = useMemo(() => {
    if (!selected?.city) return []
    return reports.filter(r => r.id !== selected.id && r.city === selected.city).slice(0, RELATED_COUNT)
  }, [reports, selected])

  const selectReport = (r) => { setSelected(r); setSelectedIndex(0) }

  const hasFilters = !!(departmentFilter || cityFilter || barrioFilter || estadoFilter || especieFilter || debouncedSearch)

  return (
    <div className='min-h-screen bg-cream mt-20'>
      <PageBanner
        eyebrow={<><LiveDot /> En vivo</>}
        title={<>Mascotas perdidas<br />y <em className='font-normal'>encontradas</em></>}
        description='Reportes publicados por la comunidad en Colombia, actualizados en tiempo real. Busca por nombre, barrio o descripción, o combina los filtros.'
        aside={<StatusCounters />}
      >
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </PageBanner>

      {/* ── Contenido ── */}
      <div className='max-w-page mx-auto px-4 lg:px-8 py-8'>

        {/* Filtros */}
        <div className='mb-6'>
          <FilterBar
            departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
            cityFilter={cityFilter}             setCityFilter={setCityFilter}
            barrioFilter={barrioFilter}         setBarrioFilter={setBarrioFilter}
            estadoFilter={estadoFilter}         setEstadoFilter={setEstadoFilter}
            especieFilter={especieFilter}       setEspecieFilter={setEspecieFilter}
            barrios={barrios}
          />
        </div>

        {/* Error */}
        {error && (
          <div className='mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm'>
            <svg className='w-4 h-4 shrink-0' viewBox='0 0 24 24' fill='none'
              stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <circle cx='12' cy='12' r='10'/>
              <line x1='12' y1='8' x2='12' y2='12'/>
              <line x1='12' y1='16' x2='12.01' y2='16'/>
            </svg>
            {error}
          </div>
        )}

        {/* Stats */}
        <StatsBar reports={filtered} loading={loading} />

        {/* Grid */}
        <PetGrid
          reports={filtered}
          loading={loading}
          hasMore={hasMore}
          loadingMore={loadingMore}
          loadMore={loadMore}
          hasFilters={hasFilters}
          onSelect={selectReport}
        />
      </div>

      {/* Modal */}
      <Suspense fallback={null}>
        <ReportModal
          selected={selected}
          setSelected={setSelected}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          mode='public'
          related={related}
          onSelectRelated={selectReport}
        />
      </Suspense>
    </div>
  )
}

export default Publicaciones