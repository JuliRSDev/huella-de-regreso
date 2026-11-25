import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw, FaMagnifyingGlass } from "react-icons/fa6";
import { usePetStats, formatStat } from "../../hooks/usePetStats";
import RotatingWord from "./RotatingWord";
import HeroShowcase from "./HeroShowcase";

const BANNER_STATS = [
  { key: "total", label: "Reportes publicados" },
  { key: "lost", label: "Buscando a su familia" },
  { key: "reunited", label: "Reencuentros" },
];

// Same split as the login page: a sunflower panel with the message and a cream side with the mascot.
const Banner = () => {
  const stats = usePetStats();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const search = (e) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/publicaciones?q=${encodeURIComponent(q)}` : "/publicaciones");
  };

  return (
    <section className="relative overflow-hidden bg-cream">
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-sun" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-paws" />
      <div aria-hidden="true" className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-white/25" />
      <div aria-hidden="true" className="absolute -bottom-32 left-[40%] hidden h-96 w-96 rounded-full bg-white/20 lg:block" />

      <div className="relative max-w-page mx-auto px-6 lg:px-8 pt-32 pb-16 lg:pt-36 lg:pb-24 grid lg:grid-cols-[58fr_42fr] gap-12 items-center">

        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            <FaPaw aria-hidden="true" /> Huella de Regreso · Valle de Aburrá
          </p>

          <h1 className="mt-5 font-display text-5xl sm:text-6xl xl:text-7xl font-semibold leading-[1.05] text-ink">
            <span className="sr-only">¿Perdiste a tu mascota?</span>
            <span aria-hidden="true">
              ¿Perdiste a<br />tu <RotatingWord />?
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ink/80">
            Publica el reporte en minutos y deja que la comunidad te ayude a encontrarla.
            ¿Encontraste un animal en la calle? También puedes avisar aquí.
          </p>

          <form
            role="search"
            onSubmit={search}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)]"
          >
            <FaMagnifyingGlass aria-hidden="true" className="ml-3 shrink-0 text-gray-400" />
            <label htmlFor="hero-search" className="sr-only">Buscar reportes</label>
            <input
              id="hero-search"
              type="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Busca por nombre, barrio o ciudad"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-base text-ink placeholder:text-gray-400 focus:outline-none"
            />
            <button type="submit" className="rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-black transition cursor-pointer">
              Buscar
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/nuevo-reporte"
              className="px-5 sm:px-6 py-3 rounded-xl bg-white text-sm sm:text-base font-bold text-ink shadow-md hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              Reportar mascota
            </Link>
            <Link
              to="/publicaciones"
              className="px-5 sm:px-6 py-3 rounded-xl border-2 border-ink/80 text-sm sm:text-base font-bold text-ink hover:bg-ink hover:text-white transition"
            >
              Ver reportes
            </Link>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {BANNER_STATS.map(({ key, label }, i) => (
              <div key={key} className={`flex flex-col-reverse ${i > 0 ? "border-l border-ink/15 pl-4 sm:pl-6" : ""}`}>
                <dt className="text-xs sm:text-sm text-ink/70">{label}</dt>
                <dd className="font-display text-3xl sm:text-4xl font-semibold text-ink">{formatStat(stats, key)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
};

export default Banner;
