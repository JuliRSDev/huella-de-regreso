// Small presentational pieces for the statistics page; bars are plain CSS so no chart library is needed.

export const StatCard = ({ value, label, hint }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    <p className="text-sm font-semibold text-gray-700 mt-1">{label}</p>
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

export const Panel = ({ title, children }) => (
  <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">{title}</h2>
    {children}
  </section>
)

/** Horizontal bars; widths are relative to the largest value. */
export const BarList = ({ items, color = 'bg-amber-400', emptyText = 'Sin datos todavía' }) => {
  if (!items.length || items.every((i) => i.count === 0)) {
    return <p className="text-sm text-gray-400">{emptyText}</p>
  }
  const max = Math.max(...items.map((i) => i.count))
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{item.label}</span>
            <span className="font-semibold text-gray-900">{item.count}</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden" aria-hidden="true">
            <div className={`h-full rounded-full ${item.color || color}`} style={{ width: `${(item.count / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Vertical bars for the monthly series, with the values also given as text for screen readers. */
export const MonthChart = ({ months }) => {
  const max = Math.max(1, ...months.map((m) => m.count))
  return (
    <figure>
      <div className="flex items-end gap-3 h-40" aria-hidden="true">
        {months.map((m) => (
          <div key={m.key} className="flex-1 flex flex-col items-center justify-end h-full">
            <span className="text-xs font-semibold text-gray-700 mb-1">{m.count}</span>
            <div className="w-full bg-amber-400 rounded-t-md" style={{ height: `${(m.count / max) * 100}%`, minHeight: m.count ? 4 : 0 }} />
            <span className="text-xs text-gray-500 mt-2 first-letter:uppercase">{m.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="sr-only">
        {months.map((m) => `${m.label}: ${m.count} reportes`).join('; ')}
      </figcaption>
    </figure>
  )
}
