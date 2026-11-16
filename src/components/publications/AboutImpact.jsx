import { useScrollAnimation, useCounter } from './useScrollAnimation';
import { usePetStats } from '../../hooks/usePetStats';

function AnimatedCounter({ target, label, desc, delay, visible }) {
  const count = useCounter(target, 2000, visible);

  return (
    <div
      style={{ transitionDelay: delay }}
      className={`bg-white border border-gray-200 rounded-xl p-6 text-center transition-all duration-500 hover:shadow-lg hover:border-yellow-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-none mb-1">
        {count.toLocaleString('es-CO')}
      </div>

      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-1">{desc}</p>
    </div>
  );
}

const COUNTERS = [
  { key: 'total', label: 'Reportes publicados', desc: 'Perdidas, encontradas y reencontradas' },
  { key: 'lost', label: 'Buscando a su familia', desc: 'Mascotas reportadas como perdidas' },
  { key: 'found', label: 'Encontradas en la calle', desc: 'Esperando que aparezca su familia' },
  { key: 'reunited', label: 'Reencuentros', desc: 'Reportes cerrados con final feliz' },
];

export default function AboutImpact() {
  const stats = usePetStats();
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [countersRef, countersVisible] = useScrollAnimation(0.15);

  return (
    <section className="bg-gray-50 py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div ref={headerRef} className="mb-16">

          <p className={`inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium mb-6 transition-all duration-500 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            📊 Nuestro impacto
          </p>

          <h2 className={`font-nunito text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Así va<br />
            <span className="text-yellow-500">la plataforma</span>
          </h2>

          <p className={`text-gray-500 text-lg max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Estas cifras se calculan en tiempo real a partir de los reportes publicados.
          </p>
        </div>

        {/* COUNTERS */}
        <div
          ref={countersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {COUNTERS.map((c, i) => (
            <AnimatedCounter
              key={c.key}
              label={c.label}
              desc={c.desc}
              target={stats && !stats.error ? stats[c.key] : 0}
              delay={`${0.1 * i}s`}
              visible={countersVisible && Boolean(stats)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}