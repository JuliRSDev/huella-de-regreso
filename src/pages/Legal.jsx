import { Link } from 'react-router-dom'

const REPO_URL = 'https://github.com/JuliRSDev/huella-de-regreso'

const PAGES = {
  terminos: {
    title: 'Términos de servicio',
    sections: [
      ['Qué es Huella de Regreso', 'Una plataforma web gratuita, desarrollada como proyecto de grado de Ingeniería de Software, para publicar y consultar reportes de mascotas perdidas y encontradas.'],
      ['Uso de la plataforma', 'Al publicar un reporte declaras que la información y las fotos son reales y que tienes derecho a compartirlas. No se permiten reportes falsos, ventas de animales, publicidad ni contenido ofensivo.'],
      ['Responsabilidad', 'La plataforma pone en contacto a las personas, pero no verifica la identidad de quien publica ni participa en los acuerdos para entregar una mascota. Cada usuario es responsable de la información que publica y del contacto que hace con otros.'],
      ['Moderación', 'Los reportes que incumplan estos términos pueden ser eliminados. Cada autor puede editar o eliminar sus reportes en cualquier momento desde "Mis reportes".'],
    ],
  },
  privacidad: {
    title: 'Política de privacidad',
    sections: [
      ['Qué datos se recogen', 'Para crear una cuenta se guarda tu nombre, tu correo y, si la agregas, tu foto de perfil. En cada reporte se guardan las fotos, la ubicación (departamento, ciudad y barrio), la descripción y el dato de contacto que tú escribas.'],
      ['Para qué se usan', 'Solo para mostrar los reportes y permitir que otras personas te contacten si ven a la mascota. El dato de contacto de un reporte es público, por eso te recomendamos usar un número o correo que estés dispuesto a compartir. Las estadísticas y la descarga de datos no incluyen datos de contacto.'],
      ['Tus derechos', 'De acuerdo con la Ley 1581 de 2012, puedes conocer, actualizar, rectificar y eliminar tus datos. Puedes editar o borrar tus reportes desde "Mis reportes" y tu información desde tu perfil. Para cualquier otra solicitud, escribe en el repositorio del proyecto.'],
      ['Dónde se guardan', 'La información se almacena en los servicios de Google Firebase y las fotos en Cloudinary, con reglas que solo permiten al autor modificar o borrar sus propios reportes.'],
    ],
  },
  seguridad: {
    title: 'Seguridad y estafas',
    sections: [
      ['Desconfía de quien pide dinero', 'Nunca pagues por adelantado para "recuperar" a tu mascota. Una persona que realmente la encontró no necesita cobrar antes de mostrártela.'],
      ['Pide una prueba', 'Antes de reunirte, pide una foto o un video reciente de la mascota y pregunta por una seña particular que no aparezca en el reporte.'],
      ['Encuéntrate en un lugar seguro', 'Acuerda la entrega en un lugar público y concurrido, de día, y ve acompañado.'],
      ['Reporta lo sospechoso', 'Si un reporte o un contacto te parece una estafa, avísanos desde el repositorio del proyecto para revisarlo.'],
    ],
  },
}

const Legal = ({ page }) => {
  const { title, sections } = PAGES[page]
  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
        <div className="space-y-6">
          {sections.map(([heading, text]) => (
            <section key={heading}>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{heading}</h2>
              <p className="text-gray-600 leading-relaxed">{text}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm text-gray-500">
          Contacto: <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer" className="underline">repositorio del proyecto en GitHub</a>
          {' · '}
          <Link to="/" className="underline">Volver al inicio</Link>
        </p>
      </article>
    </div>
  )
}

export default Legal
