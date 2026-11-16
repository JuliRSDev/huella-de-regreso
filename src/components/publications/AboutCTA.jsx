import { useScrollAnimation } from './useScrollAnimation';
import { Link } from "react-router-dom";
import '../../styles/quienes-somos.css'

export default function AboutCTA() {
  const [ref, visible] = useScrollAnimation(0.2);

  return (
    <section className="bg-yellow-50 py-20 px-6 relative overflow-hidden text-center">

      {/* 🐾 Background */}
      <div className="absolute text-[220px] md:text-[280px] opacity-[0.04] pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        🐾
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto">

        {/* BADGE */}
        <p className={`inline-flex items-center gap-2 bg-white border border-yellow-300 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium mb-6 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          🐾 Únete a la comunidad
        </p>

        {/* TITLE */}
        <h2 className={`font-nunito text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          ¿Listo para dejar<br />tu <span className="text-yellow-500">huella</span>?
        </h2>

        {/* SUB */}
        <p className={`font-inter text-gray-600 text-lg leading-relaxed max-w-md mx-auto mb-10 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Reporta una mascota perdida o una que encontraste en la calle. Publicar es gratis y toma pocos minutos.
        </p>

        {/* BUTTONS */}
        <div className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Link 
            to='/nuevo-reporte'
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition hover:-translate-y-1">
            + Hacer un reporte
          </Link>

          <Link 
            to='/publicaciones'
            className="bg-white border border-gray-200 hover:border-yellow-400 text-gray-700 hover:text-yellow-700 font-semibold px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition hover:-translate-y-1">
            Ver mascotas perdidas
          </Link>
        </div>

      </div>
    </section>
  );
}