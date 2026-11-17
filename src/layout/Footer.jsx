import { Link } from "react-router-dom"
import { FaGithub, FaPaw } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="mt-16 print:hidden">

        {/* CTA FINAL (LO MÁS IMPORTANTE) */}
        <section className="px-6 mb-16">
            <div className="max-w-5xl mx-auto bg-[#FFD54F] rounded-3xl p-10 text-center shadow-xl">
            
            <h2 className="text-3xl font-bold text-black">
                ¿Listo para encontrar a tu mascota? 🐾
            </h2>

            <p className="text-black/70 mt-3">
                Publica un reporte y deja que la comunidad te ayude
            </p>

            <Link
                to="/nuevo-reporte"
                className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
            >
                Crear reporte
            </Link>

            </div>
        </section>

      {/* FOOTER PRINCIPAL */}
        <div className="bg-[#0f172a] text-white py-16 px-6">

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

            {/* BRAND */}
            <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                <FaPaw /> Huella de Regreso
                </h3>

                <p className="text-gray-400 mt-4 text-sm">
                Conectamos personas para ayudar a que más mascotas vuelvan a casa 🐾
                </p>
            </div>

            {/* LINKS */}
            <div>
                <h4 className="font-semibold mb-4">Información</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/terminos" className="hover:text-white">Términos de servicio</Link></li>
                <li><Link to="/privacidad" className="hover:text-white">Política de privacidad</Link></li>
                <li><Link to="/seguridad" className="hover:text-white">Seguridad y estafas</Link></li>
                </ul>
            </div>

            {/* CONTACTO + REDES */}
            <div>
                <h4 className="font-semibold mb-4">Contacto</h4>

                <a
                  href="https://github.com/JuliRSDev/huella-de-regreso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white"
                >
                  <FaGithub aria-hidden="true" className="w-5 h-5" />
                  Repositorio del proyecto
                </a>
            </div>

            </div>

            {/* LINEA FINAL */}
            <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Julián Rodríguez y Fernando Pérez — Todos los derechos reservados
            </div>

        </div>
    </footer>
  )
}

export default Footer