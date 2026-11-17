import { useEffect, useState } from 'react'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../config/firebase'

// The statistics need every report; the cap keeps a single read bounded while the platform is small.
const MAX_REPORTS = 1000

/** One-time read of the reports for aggregate views. Returns { reports, loading, error }. */
export function useAllReports() {
  const [state, setState] = useState({ reports: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'pets'), limit(MAX_REPORTS)))
        if (!cancelled) setState({ reports: snap.docs.map((d) => ({ id: d.id, ...d.data() })), loading: false, error: null })
      } catch (err) {
        console.error('Could not load reports for statistics', err)
        if (!cancelled) setState({ reports: [], loading: false, error: 'No se pudieron cargar las estadísticas.' })
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return state
}
