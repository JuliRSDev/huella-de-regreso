import { FaMobileScreen, FaMapLocationDot, FaHandshake, FaChartColumn } from "react-icons/fa6";

const FEATURES = [
  { icon: FaMobileScreen, title: "Publica tu reporte", desc: "Fácil, rápido y desde cualquier dispositivo, sin instalar nada." },
  { icon: FaMapLocationDot, title: "Busca por tu zona", desc: "Filtra por departamento, ciudad, barrio, estado y tipo de mascota." },
  { icon: FaHandshake, title: "Conecta y recupera", desc: "Contacta directamente a quien publicó el reporte con un toque." },
  { icon: FaChartColumn, title: "Datos para decidir", desc: "Estadísticas en tiempo real y descarga de los reportes en CSV." },
];

// Dark band between the light sections, for contrast.
const Help = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 lg:px-8 bg-ink text-white">
      <div aria-hidden="true" className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sun/10" />

      <div className="relative max-w-page mx-auto grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sun">Por qué usarla</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
            Tecnología y comunidad, <em className="font-normal text-sun">en un solo lugar</em>
          </h2>
          <p className="mt-5 text-gray-300 max-w-md">
            Hoy los avisos se pierden entre grupos de WhatsApp, redes y carteles. Huella de Regreso los reúne para
            que una mascota perdida y un animal encontrado puedan coincidir.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 hover:bg-white/10 transition">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-ink text-xl">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Help;
