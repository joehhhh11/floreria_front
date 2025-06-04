import React, { useState } from "react";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen bg-[#FAF7F4]">
      <h1 className="text-4xl mb-16">Contacto</h1>
      
      <div className="flex gap-12 max-w-6xl mx-auto">
        <div className="flex-1">
          <div className="relative mb-8">
            <img
              src="/img1.png"
              alt="Flores"
              className="rounded-full w-48 h-48 object-cover"
            />
          </div>
          
          <h2 className="text-3xl mb-4">
            We take <span className="text-[#FF4F4F]">flowers</span> personally,
            <br />with your thoughts in hand...
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean 
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque 
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>

          <img
            src="/img1.png"
            alt="Firma"
            className="w-32"
          />
        </div>

        <div className="flex-1 bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl mb-6">Get in Touch!</h3>
          <p className="text-gray-600 mb-8">
            Class aptent taciti sociosqu ad litora torquent per conubia nostr. Mauris in erat 
            patullam ac urna eu felis dignin
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Your Full Name"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              required
            />
            
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              required
            />

            <input
              type="tel"
              placeholder="Phone"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
            />

            <textarea
              placeholder="Write something..."
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#FF4F4F] text-white py-3 rounded hover:bg-[#ff3535] transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
