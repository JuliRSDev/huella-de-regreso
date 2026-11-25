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

const QUICK_FACTS = [
  { label: "Publicación", value: "Inmediata" },
  { label: "Búsqueda", value: "Por barrio" },
  { label: "Costo", value: "Gratis" },
  { label: "Cobertura", value: "Toda Colombia" },
];

const Faq = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 px-6 lg:px-8 bg-white">

      {/* Intro on the left and the questions on the right, so the section uses the full width */}
      <div className="max-w-page mx-auto grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 items-start">

        <div className="lg:sticky lg:top-28 text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Resolvemos tus dudas</p>
          <h2 className="mt-2 mb-4 font-display text-4xl md:text-5xl font-semibold text-ink">
            Preguntas <em className="font-normal">frecuentes</em>
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto lg:mx-0">
            Todo lo que necesitas saber para encontrar a tu mascota más rápido 🐾
          </p>

          {/* RESPUESTAS RÁPIDAS */}
          <div className="grid grid-cols-2 gap-4 mt-8 text-center">
            {QUICK_FACTS.map((fact) => (
              <div key={fact.label} className="bg-cream rounded-2xl p-4 ring-1 ring-black/5">
                <p className="text-xs text-gray-600">{fact.label}</p>
                <p className="font-display text-xl font-semibold text-ink">{fact.value}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-center gap-4 justify-center lg:justify-start">
            <p className="text-gray-600">¿Aún tienes dudas?</p>
            <a
              href="/nuevo-reporte"
              className="inline-block bg-ink text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg"
            >
              Crear reporte ahora
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          {FAQS.map((item, index) => {
            const open = active === index;
            return (
              <motion.div
                key={item.q}
                layout
                className={`
                  rounded-2xl hover:shadow-lg transition-shadow duration-300
                  ${open ? "bg-white ring-2 ring-sun-deep shadow-lg" : "bg-cream ring-1 ring-black/5"}
                `}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActive(open ? null : index)}
                  className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-sun text-ink">
                    <FaPaw aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-gray-800 text-lg">{item.q}</span>
                </button>

                {/* RESPUESTA ANIMADA */}
                <AnimatePresence>
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-600 px-5 pb-5 pl-19 text-sm leading-relaxed"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;
