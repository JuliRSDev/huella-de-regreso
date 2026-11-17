import iconForm from "../../assets/icon_form1.png";
import iconEncuentro from "../../assets/icon_reencuentro.png";
import { motion } from "framer-motion";
import { FaMapMarkedAlt } from "react-icons/fa";

const Help = () => {
  return (
    <>
      <section className="py-16 px-6 bg-white">

        {/* TITLE */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold">
            ¿Por qué usar Huella de Regreso?
          </h2>
          <p className="text-gray-500 mt-3">
            Tecnología + comunidad para encontrar mascotas más rápido
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">

          {/* CARD */}
          {[{
            img: iconForm,
            title: "Publica tu reporte",
            desc: "Fácil, rápido y desde cualquier dispositivo"
          },{
            Icon: FaMapMarkedAlt,
            title: "Busca por tu zona",
            desc: "Filtra por departamento, ciudad, barrio y tipo de mascota"
          },{
            img: iconEncuentro,
            title: "Conecta y recupera",
            desc: "Contacta directamente a quien publicó el reporte"
          }].map((item) => (

            <motion.div
              key={item.title}
              whileHover={{ y: -10 }}
              className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden"
            >

              {/* Glow hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-yellow-200/30 to-green-200/30 blur-2xl"></div>

              {/* ICON */}
              {item.Icon ? (
                <item.Icon aria-hidden="true" className="w-16 h-16 mb-6 mx-auto relative z-10 text-[#43A047]" />
              ) : (
                <motion.img
                  src={item.img}
                  alt=""
                  className="w-16 mb-6 mx-auto relative z-10"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                />
              )}

              <h3 className="text-xl font-bold text-center relative z-10">
                {item.title}
              </h3>

              <p className="text-center text-gray-600 mt-2 relative z-10">
                {item.desc}
              </p>

            </motion.div>

          ))}
        </div>
      </section>

    </>
  );
};

export default Help;