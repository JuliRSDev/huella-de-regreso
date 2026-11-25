import { useScrollAnimation } from './useScrollAnimation';

const events = [
  {
    year: 'Inicio de 2026',
    emoji: '💡',
    title: 'Una necesidad cercana',
    text: 'Cuando una mascota se pierde, los avisos se reparten entre grupos de WhatsApp, redes sociales y carteles, y es difícil saber dónde buscar. De ahí nació la idea de reunir todo en un solo lugar.',
  },
  {
    year: 'Primer semestre de 2026',
    emoji: '🔎',
    title: 'Investigación',
    text: 'Como proyecto de grado se estudiaron soluciones parecidas, el marco legal y la forma de recoger información con los usuarios, y se definió la propuesta.',
  },
  {
    year: '2026',
    emoji: '🛠️',
    title: 'Primer prototipo',
    text: 'Se construyó la primera versión de la aplicación con React y Firebase: registro, publicación de reportes con fotos y búsqueda con filtros.',
  },
  {
    year: 'Segundo semestre de 2026',
    emoji: '🚀',
    title: 'Nueva versión',
    text: 'La plataforma se publicó en una nueva infraestructura y sumó cifras en tiempo real, tipo de mascota y el cierre de reportes con reencuentro.',
  },
  {
    year: 'Lo que sigue',
    emoji: '🧪',
    title: 'Validación con usuarios',
    text: 'El siguiente paso es probar la aplicación con personas del Valle de Aburrá y medir qué tan fácil les resulta usarla.',
  },
];

function TlItem({ event }) {
  const [ref, vis] = useScrollAnimation(0.3);

  return (
    <div
      ref={ref}
      className={`relative pl-10 mb-12 transition-all duration-700 ${
        vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* DOT */}
      <div className="absolute left-0 top-3 w-4 h-4 bg-yellow-400 rounded-full border-4 border-white shadow-[0_0_0_2px_#F5C500]" />

      {/* CARD */}
      <div className="bg-blue-50 border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-yellow-400 transition group">
        
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-yellow-500 uppercase tracking-wider">
              {event.year}
            </p>

            <h3 className="font-nunito text-lg font-extrabold text-gray-900 mt-1">
              {event.title}
            </h3>
          </div>

          <span className="text-3xl opacity-70 group-hover:scale-110 transition">
            {event.emoji}
          </span>
        </div>

        <p className="font-inter text-sm text-gray-600 mt-3 leading-relaxed max-w-md">
          {event.text}
        </p>
      </div>
    </div>
  );
}

export default function AboutStory() {
  const [headerRef, headerVis] = useScrollAnimation(0.2);

  return (
    <section className="bg-white py-16 px-6 relative overflow-hidden">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-20">

          <span
            className={`inline-flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-1 rounded-full text-xs font-bold transition ${
              headerVis ? 'opacity-100' : 'opacity-0'
            }`}
          >
            📖 Nuestra historia
          </span>

          <h2
            className={`font-nunito text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 transition ${
              headerVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Empezó con una{" "}
            <span className="text-yellow-500">mascota perdida</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            No es solo una plataforma. Es una respuesta a un problema real.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative border-l-2 border-yellow-200 pl-6">
          {events.map((e, i) => (
            <TlItem key={i} event={e} />
          ))}
        </div>

        {/* CIERRE EMOCIONAL */}
        <div className="text-center mt-20">
          <p className="text-gray-600 text-lg">
            Y esta historia apenas comienza…
          </p>
        </div>

      </div>
    </section>
  );
}