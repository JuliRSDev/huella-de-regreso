import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../config/firebase'

/** Latest reports for the home page. Returns { reports, loading, error }. */
export function useRecentReports(count) {
  const [state, setState] = useState({ reports: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'pets'), orderBy('createdAt', 'desc'), limit(count)))
        if (!cancelled) setState({ reports: snap.docs.map((d) => ({ id: d.id, ...d.data() })), loading: false, error: null })
      } catch (err) {
        console.error('Could not load recent reports', err)
        if (!cancelled) setState({ reports: [], loading: false, error: 'No se pudieron cargar los reportes recientes.' })
      }
    }

    load()
    return () => { cancelled = true }
  }, [count])

  return state
}
