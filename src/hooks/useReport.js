import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

/** Loads one public report by id. Returns { report, loading, error } where report is null if it does not exist. */
export function useReport(id) {
  const [state, setState] = useState({ report: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'pets', id))
        if (!cancelled) setState({ report: snap.exists() ? { id: snap.id, ...snap.data() } : null, loading: false, error: null })
      } catch (err) {
        console.error('Could not load report', id, err)
        if (!cancelled) setState({ report: null, loading: false, error: 'No se pudo cargar el reporte.' })
      }
    }

    load()
    return () => { cancelled = true }
  }, [id])

  return state
}
