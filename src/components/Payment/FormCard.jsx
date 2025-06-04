import React from "react";
import distritos from "@/service/distritos.json";

function FormCard() {
  return (
    <div className="pt-8">
      <div className="border-2 border-flor rounded-2xl p-10">
        <h2 className="text-xl font-semibold mb-4">Información de Pago</h2>
        <form className="space-y-6">
          {/* Fila 1: Número de tarjeta Visa (todo el ancho) */}
          <div className="flex flex-col">
            <label htmlFor="cardNumber" className="mb-1 font-medium">
              Número de tarjeta Visa
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
            />
          </div>

          {/* Fila 2: Fecha de emisión, CVV, Últimos 4 dígitos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="expiryDate" className="mb-1 font-medium">
                Fecha de emisión
              </label>
              <input
                type="month"
                id="expiryDate"
                name="expiryDate"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cvv" className="mb-1 font-medium">
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                maxLength={3}
                placeholder="123"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastFour" className="mb-1 font-medium">
                Últimos 4 dígitos
              </label>
              <input
                type="text"
                id="lastFour"
                name="lastFour"
                maxLength={4}
                placeholder="1234"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
              />
            </div>
          </div>

          {/* Fila 3: Nombre del titular */}
          <div className="flex flex-col">
            <label htmlFor="cardHolder" className="mb-1 font-medium">
              Nombre del titular
            </label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              placeholder="Como aparece en la tarjeta"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flor"
            />
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormCard;
