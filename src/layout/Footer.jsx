import { Link } from "react-router-dom"
import { FaGithub, FaPaw } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="mt-16 print:hidden">

        {/* CTA FINAL (LO MÁS IMPORTANTE) */}
        <section className="px-6 mb-16">
            <div className="relative overflow-hidden max-w-page mx-auto bg-sun rounded-3xl p-10 md:p-14 text-center shadow-xl">
            
            <div aria-hidden="true" className="absolute inset-0 bg-paws"></div>
            <h2 className="relative font-display text-3xl md:text-5xl font-semibold text-ink">
                ¿Listo para encontrar a <em className="font-normal">tu mascota</em>?
            </h2>

            <p className="relative text-ink/75 mt-3">
                Publica un reporte y deja que la comunidad te ayude
            </p>

            <Link
                to="/nuevo-reporte"
                className="relative inline-block mt-6 px-6 py-3 bg-ink text-white font-bold rounded-xl hover:bg-black transition"
            >
                Crear reporte
            </Link>

            </div>
        </section>

      {/* FOOTER PRINCIPAL */}
        <div className="bg-ink text-white py-16 px-6">

            <div className="max-w-page mx-auto grid md:grid-cols-3 gap-12">

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