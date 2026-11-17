import dogImg from "../../assets/pet-flot.webp"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePetStats, formatStat } from "../../hooks/usePetStats";
import HeroPaws from "./HeroPaws";

const BANNER_STATS = [
  { key: "total", label: "Reportes publicados" },
  { key: "lost", label: "Buscando a su familia" },
  { key: "reunited", label: "Reencuentros" },
];

const Banner = () => {
  const stats = usePetStats();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#A8C7DC] via-[#cfe6f5] to-white pt-28 pb-24 md:pt-32 md:pb-20">

      {/* BLOBS decorativos */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">

        {/* TEXTO */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            <span className="text-[#F7D047]">¿Perdiste a </span>{" "}
            <span className="text-[#1B1B1B]">tu </span>
            <br />
            <span className="text-[#1B1B1B]">mascota?</span>
          </motion.h1>

          <p className="mt-6 text-lg text-gray-700 max-w-md font-semibold">
            Publica reportes y conecta con personas que pueden ayudarte
            a reencontrarte con tu mascota.
          </p>

          {/* CTA */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/nuevo-reporte"
              className="px-6 py-3 rounded-xl bg-[#F7D047] font-bold shadow-lg hover:scale-105 transition"
            >
              Reportar mascota
            </Link>

            <Link
              to="/publicaciones"
              className="px-6 py-3 rounded-xl border border-black/20 backdrop-blur-md hover:bg-[#282723] hover:text-amber-50 hover:scale-105 transition">
              Ver reportes
            </Link>
          </div>

          {/* STATS */}
          <dl className="grid grid-cols-3 gap-3 mt-10 max-w-md text-xs sm:text-sm text-gray-600">
            {BANNER_STATS.map(({ key, label }) => (
              <div key={key} className="flex flex-col-reverse justify-end bg-white/70 backdrop-blur rounded-2xl px-4 py-3 shadow-sm">
                <dt>{label}</dt>
                <dd className="text-2xl font-bold text-black">{formatStat(stats, key)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* IMAGEN ANIMADA */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="hidden md:block"
        >
          {/* The prints live in the same box as the picture so they keep their place at any width */}
          <div className="relative w-full max-w-md mx-auto">
            <img
              src={dogImg}
              alt="Mascota"
              className="w-full drop-shadow-2xl"
            />
            <HeroPaws />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Banner;
