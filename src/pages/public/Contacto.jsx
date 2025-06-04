import React from 'react';

function Contacto() {
  return (
    <div className=" text-black px-4 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-flor-2 rounded-2xl shadow-lg overflow-hidden">
        {/* Columna izquierda: Información */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
          <p className="mb-4 text-black">
            Estamos aquí para ayudarte. Si tienes alguna pregunta, no dudes en enviarnos un mensaje.
          </p>

          <div className="space-y-4 text-sm text-black">
            <div>
              <span className="font-semibold text-black">Horario:</span> Lunes a Viernes, 9:00 AM - 6:00 PM
            </div>
            <div>
              <span className="font-semibold text-black">Ubicación:</span> Calle Ficticia 123, Ciudad, País
            </div>
            <div>
              <span className="font-semibold text-black">Teléfono:</span> +123 456 7890
            </div>
            <div>
              <span className="font-semibold text-black">Correo:</span> contacto@ejemplo.com
            </div>
          </div>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="p-8 bg-flor rounded-r-2xl">
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-black" htmlFor="name">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg bg-flor-2 border border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-flor-3"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-black" htmlFor="email">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-flor-2 border border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-flor-3"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-black" htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-flor-2 border border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-flor-3"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
