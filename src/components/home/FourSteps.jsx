import { FaCamera, FaBullhorn, FaMagnifyingGlass, FaHouseChimney } from "react-icons/fa6"

const steps = [
  {
    title: "Crea un reporte",
    desc: "Sube una foto clara y describe a tu mascota. Esto aumenta las probabilidades de encontrarla.",
    icon: FaCamera,
  },
  {
    title: "Difunde el reporte",
    desc: "Comparte Huella de Regreso en tus grupos para que más personas vean tu reporte.",
    icon: FaBullhorn,
  },
  {
    title: "Revisa los encontrados",
    desc: "Busca en los reportes de mascotas encontradas en tu barrio: quizás alguien ya la tiene.",
    icon: FaMagnifyingGlass,
  },
  {
    title: "Reencuéntrate",
    desc: "Contacta a quien publicó el reporte y, cuando vuelva a casa, márcalo como reencontrado.",
    icon: FaHouseChimney,
  },
]

const FourSteps = () => {
  return (
    <section className="relative py-20 px-6 lg:px-8 bg-cream">
      <div className="relative max-w-page mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Paso a paso</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-ink">
            Cómo encontrar a <em className="font-normal">tu mascota</em>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Cuatro pasos simples. Cada uno aumenta las probabilidades de encontrarla.
          </p>
        </div>

        {/* The steps are a real sequence, so they are numbered and joined by a dashed line */}
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-9 hidden border-t-2 border-dashed border-sun-deep/50 lg:block" />
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="relative rounded-3xl bg-white p-7 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] ring-1 ring-black/5 hover:-translate-y-1 transition">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-ink text-xl">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="font-display text-4xl font-semibold text-amber-600">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </li>
            )
          })}
        </ol>

      </div>
    </section>
  )
}

export default FourSteps
