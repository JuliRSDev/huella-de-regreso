import { useEffect, useState, useRef } from 'react'
import {
  collection, onSnapshot, query,
  orderBy, where, limit, startAfter, getDocs
} from 'firebase/firestore'
import { db } from '../../config/firebase'

const PAGE_SIZE = 9

// Equality filters followed by the createdAt sort; each combination has a composite index in firestore.indexes.json.
const filterConstraints = ({ departmentFilter, cityFilter, barrioFilter, estadoFilter, especieFilter }) => {
  const constraints = []
  if (departmentFilter) constraints.push(where('department', '==', departmentFilter))
  if (cityFilter)       constraints.push(where('city',       '==', cityFilter))
  if (estadoFilter)     constraints.push(where('estado',     '==', estadoFilter))
  if (barrioFilter)     constraints.push(where('barrioSlug', '==', barrioFilter))
  if (especieFilter)    constraints.push(where('especie',    '==', especieFilter))
  constraints.push(orderBy('createdAt', 'desc'))
  return constraints
}

/**
 * Custom hook que gestiona:
 * - Suscripción en tiempo real a Firestore
 * - Filtros por departamento, ciudad, barrio, estado y especie
 * - Búsqueda client-side con debounce
 * - Paginación (load more)
 */
export function usePublicaciones({ departmentFilter, cityFilter, barrioFilter, estadoFilter, especieFilter }) {
  const [reports, setReports]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [lastDoc, setLastDoc]     = useState(null)
  const [hasMore, setHasMore]     = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const unsubscribeRef            = useRef(null)

  /* ─── Real-time listener ─── */
  useEffect(() => {
    if (unsubscribeRef.current) {
      try { unsubscribeRef.current() } catch (_) {}
      unsubscribeRef.current = null
    }

    setLoading(true)
    setError(null)

    try {
      const constraints = [
        ...filterConstraints({ departmentFilter, cityFilter, barrioFilter, estadoFilter, especieFilter }),
        limit(PAGE_SIZE),
      ]

      const q   = query(collection(db, 'pets'), ...constraints)
      const unsub = onSnapshot(
        q,
        (snap) => {
          setReports(snap.docs.map(d => ({ id: d.id, ...d.data() })))
          setLastDoc(snap.docs[snap.docs.length - 1] ?? null)
          setHasMore(snap.docs.length === PAGE_SIZE)
          setLoading(false)
        },
        (err) => {
          console.error('Could not load reports', err)
          // Clear stale results so a failed filter never looks like a successful one.
          setReports([])
          setHasMore(false)
          setError('No se pudieron cargar las publicaciones con estos filtros. Inténtalo de nuevo en unos minutos.')
          setLoading(false)
        }
      )

      unsubscribeRef.current = unsub
      return () => { try { unsub() } catch (_) {} }
    } catch (err) {
      console.error(err)
      setError('Error inicializando feed')
      setLoading(false)
    }
  }, [departmentFilter, cityFilter, barrioFilter, estadoFilter, especieFilter])

  /* ─── Load more (paginación) ─── */
  const loadMore = async () => {
    if (!lastDoc || loadingMore) return
    setLoadingMore(true)
    try {
      const constraints = [
        ...filterConstraints({ departmentFilter, cityFilter, barrioFilter, estadoFilter, especieFilter }),
        startAfter(lastDoc),
        limit(PAGE_SIZE),
      ]

      const snap  = await getDocs(query(collection(db, 'pets'), ...constraints))
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setReports(prev => [...prev, ...items])
      setLastDoc(snap.docs[snap.docs.length - 1] ?? null)
      setHasMore(snap.docs.length === PAGE_SIZE)
    } catch (err) {
      console.error('Error loading more:', err)
      setError('Error cargando más publicaciones')
    } finally {
      setLoadingMore(false)
    }
  }

  return { reports, loading, error, hasMore, loadingMore, loadMore }
}