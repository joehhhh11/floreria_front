import React, { useState } from "react";
import distritos from "@/service/distritos.json";


function FormPayment() {
    const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div className="border-2 border-flor rounded-2xl p-10">
        <h2 className="text-xl font-semibold mb-4">Dirección de envío</h2>
        <form className="space-y-6">
          {/* Fila 1: Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-1 font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-1 font-medium">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
          </div>

          {/* Fila 2: Dirección */}
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 font-medium">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
            />
          </div>

          {/* Fila 3: Apartamento, Ciudad, Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="apartment" className="mb-1 font-medium">
                Apartamento
              </label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="mb-1 font-medium">
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1 font-medium">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
            <select name="distrito" className="...">
              {distritos.distritos.map((nombre) => (
                <option
                  key={nombre}
                  value={nombre}
                  defaultValue="Seleccione su distrito"
                >
                  {nombre}
                </option>
              ))}
            </select>
            <input type="date" />



          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPayment;
