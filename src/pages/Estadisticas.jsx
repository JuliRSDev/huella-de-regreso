import { useMemo } from 'react'
import { useAllReports } from '../hooks/useAllReports'
import { computeReportStats } from '../utils/reportStats'
import { reportsToCsv } from '../utils/reportsCsv'
import { StatCard, Panel, BarList, MonthChart } from '../components/stats/StatsWidgets'
import PageBanner from '../components/common/PageBanner'
import dogFace from '../assets/perrito-motion-fourSteps.webp'

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
    <div className="min-h-screen bg-cream mt-20 print:bg-white">
      <PageBanner
        eyebrow="Datos para decidir"
        title={<>Estadísticas <em className="font-normal">en vivo</em></>}
        aside={
          <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]">
            <img src={dogFace} alt="" className="w-32" />
          </div>
        }
        description="Cifras calculadas en tiempo real a partir de los reportes publicados, para saber dónde se pierden más mascotas y cuántas vuelven a casa."
      >
        <div className="flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={() => downloadCsv(reports)}
            disabled={loading || !reports.length}
            className="px-5 py-3 rounded-xl bg-ink text-white font-bold text-sm shadow-sm hover:bg-black disabled:opacity-50"
          >
            ⬇️ Descargar datos (CSV)
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-3 rounded-xl bg-white font-bold text-sm shadow-sm hover:-translate-y-0.5 transition"
          >
            🖨️ Imprimir informe
          </button>
        </div>
      </PageBanner>

      <div className="max-w-page mx-auto px-4 lg:px-8 py-10">
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
                value={stats.avgDaysToReunion === null ? '—' : `${String(stats.avgDaysToReunion).replace('.', ',')} días`}
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
