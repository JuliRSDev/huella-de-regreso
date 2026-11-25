import { useEffect, useState, useContext, useRef, lazy, Suspense } from 'react'
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

// Lazy components
const ReportCard  = lazy(() => import('../components/myReports/ReportCard'))
// The modal chunk is fetched when the page loads, so opening a report does not wait for it
const loadReportModal = () => import('../components/myReports/ReportModal')
const ReportModal = lazy(loadReportModal)

// ── Empty state ────────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-3 flex flex-col items-center justify-center py-24 gap-4 text-center">
    <span className="text-6xl">🐾</span>
    <div>
      <p className="text-lg font-bold text-gray-700">Aún no tienes reportes</p>
      <p className="text-sm text-gray-400 mt-1">
        Crea tu primer reporte para ayudar a encontrar una mascota
      </p>
    </div>
    <Link
      to="/nuevo-reporte"
      className="mt-2 bg-[#FFD54F] hover:bg-yellow-400 text-gray-900 font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
    >
      + Nuevo reporte
    </Link>
  </div>
)

// ── Loading skeleton ───────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="h-52 bg-gray-100" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-5 bg-gray-100 rounded w-1/4 mt-1" />
    </div>
  </div>
)

// ── Main ───────────────────────────────────────────────────────────────────────
const MisReportes = () => {
  const { user } = useContext(AuthContext)

  const [reports,       setReports]       = useState([])
  const [loading,       setLoading]       = useState(true)
  const [selected,      setSelected]      = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeId,      setActiveId]      = useState(null)

  const isTouchRef = useRef(false)

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(hover: none)').matches
    loadReportModal()
  }, [])

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'pets'),
      where('authorUid', '==', user.uid)
    )

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
                  .map(d => ({ id: d.id, ...d.data() }))
                  .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      setReports(data)
      setLoading(false)
    })

    return () => unsub()
  }, [user])

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este reporte?')) return
    try {
      await deleteDoc(doc(db, 'pets', id))
      setReports(prev => prev.filter(r => r.id !== id))
      setSelected(null)
    } catch (err) {
      console.error('Could not delete report', err)
      window.alert('No se pudo eliminar el reporte. Inténtalo de nuevo.')
    }
  }

  // The previous status is kept so the statistics can tell lost pets from found ones after the reunion.
  const handleReunite = async (report) => {
    if (!window.confirm('¿Confirmas que la mascota ya volvió a casa? El reporte quedará como reencontrado.')) return
    const changes = {
      estado: 'reencontrada',
      previousEstado: report.estado,
      reunitedAt: new Date().toISOString(),
    }
    try {
      await updateDoc(doc(db, 'pets', report.id), changes)
      setSelected(prev => (prev?.id === report.id ? { ...prev, ...changes } : prev))
    } catch (err) {
      console.error('Could not mark report as reunited', err)
      window.alert('No se pudo actualizar el reporte. Inténtalo de nuevo.')
    }
  }

  const handleView = (r) => {
    setSelected(r)
    setSelectedIndex(0)
  }

  return (
    <div className="min-h-screen bg-cream mt-20">
      <div className="max-w-page mx-auto px-4 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Reportes</h1>
            {!loading && reports.length > 0 && (
              <p className="text-sm text-gray-400 mt-1">
                {reports.length} reporte{reports.length !== 1 ? 's' : ''} publicado{reports.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {/* <Link
            to="/nuevo-reporte"
            className="bg-[#FFD54F] hover:bg-yellow-400 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors hidden sm:flex items-center gap-1.5"
          >
            + Nuevo reporte
          </Link> */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : reports.length === 0
              ? <EmptyState />
              : (
                <Suspense fallback={Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}>
                  {reports.map(r => (
                    <ReportCard
                      key={r.id}
                      r={r}
                      activeId={activeId}
                      setActiveId={setActiveId}
                      isTouchRef={isTouchRef}
                      onDelete={handleDelete}
                      onView={handleView}
                    />
                  ))}
                </Suspense>
              )
          }
        </div>

      </div>

      {/* Modal */}
      {selected && (
        <Suspense fallback={null}>
          <ReportModal
            selected={selected}
            setSelected={setSelected}
            handleDelete={handleDelete}
            onReunite={handleReunite}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            mode="owner" // clave para mostrar acciones de edición/eliminación
          />
        </Suspense>
      )}
    </div>
  )
}

export default MisReportes