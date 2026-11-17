import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaw } from "react-icons/fa";

const FAQS = [
  {
    q: "¿Cómo funciona Huella de Regreso?",
    a: "Publicas un reporte con foto, ubicación y datos. La comunidad lo ve y te ayuda a encontrar a tu mascota más rápido."
  },
  {
    q: "¿Tengo posibilidades reales de encontrarla?",
    a: "Sí. Mientras mejor sea la foto y la información, más personas podrán ayudarte."
  },
  {
    q: "¿Sirve para cualquier mascota?",
    a: "Claro. Perros, gatos y otras mascotas también pueden ser reportadas."
  },
  {
    q: "¿Qué hago si pasa mucho tiempo?",
    a: "Mantén tu reporte al día con nuevas fotos o datos y revisa los reportes de mascotas encontradas en tu zona."
  },
  {
    q: "¿Cómo contacto a quien publicó un reporte?",
    a: "En el detalle de cada reporte aparece el contacto: puedes llamar, escribir por WhatsApp o enviar un correo."
  },
  {
    q: "¿Qué hago cuando la encuentro?",
    a: "Entra a Mis reportes y márcalo como reencontrado. Así todos saben que ya volvió a casa 🙌"
  }
];

const Faq = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 px-6 bg-linear-to-b from-[#f8fafc] to-[#e2e8f0]">

      <div className="max-w-5xl mx-auto">

        {/* TITULO */}
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Preguntas frecuentes
        </h3>

        <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
          Todo lo que necesitas saber para encontrar a tu mascota más rápido 🐾
        </p>

        {/* RESPUESTAS RÁPIDAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 text-center">

          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500">Publicación</p>
            <p className="font-bold text-[#2E7D32]">Inmediata</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500">Búsqueda</p>
            <p className="font-bold text-[#2E7D32]">Por barrio</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500">Costo</p>
            <p className="font-bold text-[#2E7D32]">Gratis</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500">Cobertura</p>
            <p className="font-bold text-[#2E7D32]">Toda Colombia</p>
          </div>

        </div>

        {/* GRID MODERNO */}
        <div className="grid md:grid-cols-2 gap-6">

          {FAQS.map((item, index) => (
            <motion.div
              key={index}
              layout
              whileHover={{ scale: 1.02 }}
              onClick={() => setActive(active === index ? null : index)}
              className={`
                cursor-pointer rounded-2xl p-6
                bg-white/80 backdrop-blur-md
                border border-gray-200
                shadow-md hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
                ${active === index ? "ring-2 ring-[#43A047]" : ""}
              `}
            >

              {/* PREGUNTA */}
              <div className="flex items-start gap-4">

                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2E7D32] text-white shadow-md">
                  <FaPaw />
                </div>

                <h4 className="font-semibold text-gray-800 text-lg">
                  {item.q}
                </h4>

              </div>

              {/* RESPUESTA ANIMADA */}
              <AnimatePresence>
                {active === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 mt-4 text-sm leading-relaxed"
                  >
                    {item.a}
                  </motion.p>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>

        {/* CTA FINAL */}
        <div className="text-center mt-20">

          <p className="text-gray-600 mb-4">
            ¿Aún tienes dudas?
          </p>

          <a
            href="/nuevo-reporte"
            className="inline-block bg-[#2E7D32] text-white px-6 py-3 rounded-xl
                      hover:scale-105 transition shadow-lg"
          >
            Crear reporte ahora
          </a>

        </div>

      </div>
    </section>
  );
};

export default Faq;