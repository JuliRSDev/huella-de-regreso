import { usePetStats, formatStat } from '../../hooks/usePetStats'

const COUNTERS = [
  { key: 'lost', label: 'Perdidas', dot: 'bg-red-500' },
  { key: 'found', label: 'Encontradas', dot: 'bg-emerald-500' },
  { key: 'reunited', label: 'Reencontradas', dot: 'bg-sky-500' },
]

/** Live totals per status, shown as white cards on the sunflower banners. */
const StatusCounters = () => {
  const stats = usePetStats()

  return (
    <dl className="grid grid-cols-3 gap-3">
      {COUNTERS.map(({ key, label, dot }) => (
        <div key={key} className="flex flex-col-reverse w-40 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
          <dt className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
            {label}
          </dt>
          <dd className="font-display text-4xl font-semibold text-ink">{formatStat(stats, key)}</dd>
        </div>
      ))}
    </dl>
  )
}

export default StatusCounters
