import { motion } from "framer-motion";
import { usePetStats, formatStat } from "../../hooks/usePetStats";

const HERO_STATS = [
  { key: "total", label: "Reportes publicados" },
  { key: "lost", label: "Buscando a su familia" },
  { key: "reunited", label: "Reencuentros" },
];

export default function AboutHero() {
  const stats = usePetStats();

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50 px-6 pt-32 pb-16">

      {/* BLOBS */}
      <div className="absolute w-125 h-125 bg-yellow-300/20 blur-3xl rounded-full -top-30 -left-30" /> 
      <div className="absolute w-100 h-100 bg-blue-300/20 blur-3xl rounded-full -bottom-25 right-[10%]" /> 
      <div className="absolute w-75 h-75 bg-green-300/20 blur-3xl rounded-full top-[30%] right-[20%]" />

      {/* PAWS */}
      <motion.span
        className="absolute text-2xl opacity-10 top-[15%] left-[10%]"
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🐾
      </motion.span>

      <motion.span
        className="absolute text-3xl opacity-10 bottom-[20%] right-[10%]"
        animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        🐾
      </motion.span>

      {/* CONTENIDO */}
      <div className="container-hero relative z-10 text-center max-w-3xl">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-nunito text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Devolviendo{" "}
          <span className="text-yellow-500">mascotas</span>
          <br />
          a sus familias 🐾
        </motion.h1>

        {/* SUB */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 font-inter text-gray-600 text-lg md:text-xl leading-relaxed"
        >
          Una plataforma web, nacida como proyecto de grado de Ingeniería de Software,
          que reúne en un solo lugar los reportes de mascotas perdidas y encontradas.
        </motion.p>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.key}
              className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md"
            >
              <p className="font-nunito text-2xl font-extrabold text-gray-900">
                {formatStat(stats, stat.key)}
              </p>
              <p className="font-inter text-sm text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}