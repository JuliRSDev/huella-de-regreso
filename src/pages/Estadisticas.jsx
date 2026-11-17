import { useMemo } from 'react'
import { useAllReports } from '../hooks/useAllReports'
import { computeReportStats } from '../utils/reportStats'
import { reportsToCsv } from '../utils/reportsCsv'
import { StatCard, Panel, BarList, MonthChart } from '../components/stats/StatsWidgets'

const STATUS_BARS = [
  { key: 'perdida', label: 'Perdidas', color: 'bg-red-400' },
  { key: 'encontrada', label: 'Encontradas', color: 'bg-emerald-400' },
  { key: 'reencontrada', label: 'Reencontradas', color: 'bg-sky-400' },
]

const downloadCsv = (reports) => {
  const blob = new Blob([reportsToCsv(reports)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `huella-de-regreso-reportes-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

const Estadisticas = () => {
  const { reports, loading, error } = useAllReports()
  const stats = useMemo(() => computeReportStats(reports), [reports])

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-amber-500 text-3xl font-semibold uppercase tracking-widest">Estadísticas</h1>
            <p className="text-gray-500 mt-1 max-w-2xl">
              Cifras calculadas en tiempo real a partir de los reportes publicados, para saber dónde se pierden más
              mascotas y cuántas vuelven a casa.
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              type="button"
              onClick={() => downloadCsv(reports)}
              disabled={loading || !reports.length}
              className="px-4 py-2.5 rounded-xl bg-[#FFD54F] font-semibold text-sm hover:bg-yellow-400 disabled:opacity-50"
            >
              ⬇️ Descargar datos (CSV)
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm hover:bg-white"
            >
              🖨️ Imprimir informe
            </button>
          </div>
        </header>

        {error && <p role="alert" className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</p>}

        {loading ? (
          <p className="text-gray-500" role="status">Cargando estadísticas…</p>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard value={stats.total} label="Reportes publicados" />
              <StatCard value={stats.byStatus.perdida} label="Buscando a su familia" hint="Reportes de mascotas perdidas" />
              <StatCard value={`${stats.reunionRate} %`} label="Tasa de reencuentro" hint="Reportes cerrados como reencontrados" />
              <StatCard
                value={stats.avgDaysToReunion === null ? '—' : `${stats.avgDaysToReunion.toLocaleString('es-CO')} días`}
                label="Tiempo promedio al reencuentro"
                hint="Desde la publicación hasta el cierre"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Panel title="Reportes por estado">
                <BarList items={STATUS_BARS.map((s) => ({ label: s.label, count: stats.byStatus[s.key], color: s.color }))} />
              </Panel>
              <Panel title="Reportes por tipo de mascota">
                <BarList items={stats.bySpecies} color="bg-violet-400" />
              </Panel>
              <Panel title="Ciudades con más reportes">
                <BarList items={stats.byCity} color="bg-amber-400" />
              </Panel>
              <Panel title="Reportes publicados por mes">
                <MonthChart months={stats.byMonth} />
              </Panel>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Estadisticas
