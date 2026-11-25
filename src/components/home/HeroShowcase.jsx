import { FaLocationDot, FaWhatsapp, FaHouseChimney } from "react-icons/fa6";
import beagleImg from "../../assets/login-pet-motion-float.webp";

const Chip = ({ icon, title, text, className }) => {
  const Icon = icon;
  return (
    <div className={`absolute flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] ring-1 ring-black/5 ${className}`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun text-ink">
        <Icon aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-bold text-ink">{title}</span>
        <span className="block text-xs text-gray-600">{text}</span>
      </span>
    </div>
  );
};

/** Right side of the home banner: the login mascot with three facts about the app around it. */
const HeroShowcase = () => (
  <div className="relative hidden lg:flex justify-center">
    <div className="relative h-[27rem] w-[27rem]">
      <div aria-hidden="true" className="absolute inset-0 rounded-full bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]" />
      <div aria-hidden="true" className="absolute inset-7 rounded-full border-2 border-dashed border-sun-deep/50" />
      <img src={beagleImg} alt="" className="absolute inset-x-0 bottom-10 mx-auto w-64 drop-shadow-2xl" />

      <Chip icon={FaLocationDot} title="Búsqueda por barrio" text="Donde se perdió o se encontró" className="-left-20 top-12" />
      <Chip icon={FaWhatsapp} title="Contacto con un toque" text="Llamada, WhatsApp o correo" className="-right-16 top-[42%]" />
      <Chip icon={FaHouseChimney} title="Ya volvió a casa" text="Cierra el caso y suma al reencuentro" className="-left-12 bottom-6" />
    </div>
  </div>
);

export default HeroShowcase;
