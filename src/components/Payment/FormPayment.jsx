import React, { useState, useEffect } from "react";
import distritos from "@/service/distritos.json";

function FormPayment({ onChange }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    distrito: "",
    tipoEntrega: "delivery", 
  });

  useEffect(() => {
    if (onChange) onChange(form);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border-2 border-flor rounded-2xl p-10">
      <h2 className="text-xl font-semibold mb-4">Dirección de envío</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 font-medium">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-1 font-medium">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 font-medium">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="apartment" className="mb-1 font-medium">
              Apartamento
            </label>
            <input
              type="text"
              name="apartment"
              value={form.apartment}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1 font-medium">
              Ciudad
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="distrito" className="mb-1 font-medium">
            Distrito
          </label>
          <select
            name="distrito"
            value={form.distrito}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Seleccione su distrito</option>
            {distritos.distritos.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="tipoEntrega" className="mb-1 font-medium">
            Tipo de entrega
          </label>
          <select
            name="tipoEntrega"
            value={form.tipoEntrega}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="delivery">Delivery</option>
            <option value="pickup">Recoger en tienda</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default FormPayment;
