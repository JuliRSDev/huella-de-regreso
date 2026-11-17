const steps = [
  {
    title: "Crea un reporte",
    desc: "Sube una foto clara y describe a tu mascota. Esto aumenta las probabilidades de encontrarla.",
    emoji: "📝"
  },
  {
    title: "Difunde el reporte",
    desc: "Comparte Huella de Regreso en tus grupos para que más personas vean tu reporte.",
    emoji: "📢"
  },
  {
    title: "Revisa los encontrados",
    desc: "Busca en los reportes de mascotas encontradas en tu barrio: quizás alguien ya la tiene.",
    emoji: "🔎"
  },
  {
    title: "Reencuéntrate ❤️",
    desc: "Contacta a quien publicó el reporte y, cuando vuelva a casa, márcalo como reencontrado.",
    emoji: "🐾"
  }
]

const FourSteps = () => {
  return (
    <section className="py-16 px-6 bg-linear-to-b from-[#f8fafc] to-[#eef2f6]">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Cómo encontrar a tu mascota
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Cuatro pasos simples. Cada uno aumenta las probabilidades de encontrarla 🐾
          </p>
        </div>

        {/* All the steps stay visible so the section reads at a glance */}
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <span className="absolute -top-4 left-6 w-9 h-9 flex items-center justify-center rounded-full bg-[#FFD54F] font-bold shadow">
                {i + 1}
              </span>
              <div className="text-4xl mt-3 mb-3" aria-hidden="true">{step.emoji}</div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  )
}

export default FourSteps
