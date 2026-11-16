import { useEffect, useState } from 'react'
import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'

// Older reports were saved with masculine status values, so both spellings are counted.
export const STATUS_GROUPS = {
  lost: ['perdida', 'perdido'],
  found: ['encontrada', 'encontrado'],
  reunited: ['reencontrada'],
}

const countWhere = async (statuses) => {
  const pets = collection(db, 'pets')
  const q = statuses ? query(pets, where('estado', 'in', statuses)) : pets
  const snapshot = await getCountFromServer(q)
  return snapshot.data().count
}

/**
 * Live totals of the reports stored in Firestore, used wherever the site shows numbers,
 * so the figures always match the real data instead of fixed marketing values.
 * Returns null while loading and { error: true } if the counts could not be read.
 */
export function usePetStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const [total, lost, found, reunited] = await Promise.all([
          countWhere(null),
          countWhere(STATUS_GROUPS.lost),
          countWhere(STATUS_GROUPS.found),
          countWhere(STATUS_GROUPS.reunited),
        ])
        if (!cancelled) setStats({ total, lost, found, reunited })
      } catch (err) {
        console.error('Could not load report statistics', err)
        if (!cancelled) setStats({ error: true })
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return stats
}

export const formatStat = (stats, key) => {
  if (!stats) return '…'
  if (stats.error) return '—'
  return stats[key].toLocaleString('es-CO')
}
