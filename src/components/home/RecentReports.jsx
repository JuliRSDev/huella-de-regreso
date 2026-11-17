import { Link, useNavigate } from "react-router-dom"
import { useRecentReports } from "../../hooks/useRecentReports"
import PetCard from "../publicationCard/PetCard"
import PetCardSkeleton from "../publicationCard/PetCardSkeleton"

const RECENT_COUNT = 4

const RecentReports = () => {
  const navigate = useNavigate()
  const { reports, loading, error } = useRecentReports(RECENT_COUNT)

  if (!loading && (error || reports.length === 0)) return null

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Reportes recientes</h2>
            <p className="text-gray-600 mt-2">Las últimas mascotas perdidas y encontradas publicadas por la comunidad</p>
          </div>
          <Link
            to="/publicaciones"
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl border border-gray-300 font-semibold hover:bg-gray-900 hover:text-white transition"
          >
            Ver todos los reportes →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: RECENT_COUNT }, (_, i) => <PetCardSkeleton key={`skeleton-${i}`} />)
            : reports.map((report, i) => (
              // On phones two cards are enough; the full list is one tap away
              <div key={report.id} className={i >= 2 ? 'hidden sm:block' : undefined}>
                <PetCard report={report} onClick={() => navigate(`/reporte/${report.id}`)} />
              </div>
            ))}
        </div>

      </div>
    </section>
  )
}

export default RecentReports
