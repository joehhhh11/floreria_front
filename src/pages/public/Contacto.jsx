import React, { useState, useEffect } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Flower2, 
  CheckCircle,
  ArrowRight
} from 'lucide-react'

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Formulario enviado:", formData)
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    setTimeout(() => {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      })
      setIsSubmitted(false)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: '#F8F3EC' }}>
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #DBCCBA, transparent 50%)`
          }}
        />
        <div className="text-center z-10 relative">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: '#DBCCBA', animationDuration: '2s' }}
            />
            <div 
              className="absolute inset-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#DBCCBA' }}
            >
              <CheckCircle size={48} className="text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-light mb-6 tracking-wide" style={{ color: '#DBCCBA' }}>
            Mensaje Enviado
          </h2>
          <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
            Gracias por contactarnos. Te responderemos muy pronto.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F8F3EC' }}>
      {/* Fondo interactivo con gradiente que sigue el mouse */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #DBCCBA, transparent 50%)`
        }}
      />
      
      {/* Elementos flotantes minimalistas */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: '#DBCCBA', animationDuration: '3s' }} />
      <div className="absolute top-40 right-20 w-1 h-1 rounded-full opacity-40 animate-pulse" style={{ backgroundColor: '#DBCCBA', animationDuration: '4s' }} />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#DBCCBA', animationDuration: '5s' }} />

      <div className="container mx-auto px-8 py-20 relative z-10">
        {/* Header minimalista */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="w-px h-12 mr-6" style={{ backgroundColor: '#DBCCBA' }} />
            <Flower2 size={32} className="text-gray-400 mr-4" />
            <h1 className="text-6xl font-extralight tracking-widest text-gray-800">
              CONTACTO
            </h1>
            <div className="w-px h-12 ml-6" style={{ backgroundColor: '#DBCCBA' }} />
          </div>
          <p className="text-center text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Conectemos para crear momentos únicos
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Información de contacto - Sidebar */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-2xl font-light mb-8 tracking-wide" style={{ color: '#DBCCBA' }}>
                  Información
                </h3>
                
                <div className="space-y-8">
                  {[
                    { icon: Phone, content: "+51 123 456 789" },
                    { icon: Mail, content: "hola@floreria.com" },
                    { icon: MapPin, content: "Av. Las Flores 123\nLima, Perú" },
                    { icon: Clock, content: "Lunes - Domingo\n8:00 AM - 8:00 PM" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group cursor-pointer">
                      <div className="mr-6 mt-1 transition-all duration-300 group-hover:scale-110">
                        <item.icon size={20} className="text-gray-400 group-hover:text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line font-light">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elemento decorativo */}
              <div className="relative">
                <div className="w-24 h-px" style={{ backgroundColor: '#DBCCBA' }} />
                <div className="absolute -top-2 -left-2 w-1 h-1 rounded-full" style={{ backgroundColor: '#DBCCBA' }} />
                <div className="absolute -top-1 left-8 w-0.5 h-0.5 rounded-full" style={{ backgroundColor: '#DBCCBA' }} />
              </div>
            </div>

            {/* Formulario principal */}
            <div className="lg:col-span-3">
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
                <h3 className="text-3xl font-light mb-2 tracking-wide" style={{ color: '#DBCCBA' }}>
                  Envíanos un mensaje
                </h3>
                <p className="text-gray-500 mb-12 font-light">
                  Cuéntanos cómo podemos ayudarte
                </p>

                <div className="space-y-8">
                  {/* Grid de campos principales */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b-2 border-gray-200 py-4 text-lg font-light placeholder-transparent focus:outline-none focus:border-gray-400 transition-all duration-300 group-hover:border-gray-300"
                        placeholder="Nombre"
                      />
                      <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                        formData.nombre 
                          ? '-top-6 text-sm text-gray-500' 
                          : 'top-4 text-lg text-gray-400'
                      }`}>
                        Nombre
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b-2 border-gray-200 py-4 text-lg font-light placeholder-transparent focus:outline-none focus:border-gray-400 transition-all duration-300 group-hover:border-gray-300"
                        placeholder="Email"
                      />
                      <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                        formData.email 
                          ? '-top-6 text-sm text-gray-500' 
                          : 'top-4 text-lg text-gray-400'
                      }`}>
                        Email
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b-2 border-gray-200 py-4 text-lg font-light placeholder-transparent focus:outline-none focus:border-gray-400 transition-all duration-300 group-hover:border-gray-300"
                      placeholder="Teléfono"
                    />
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      formData.telefono 
                        ? '-top-6 text-sm text-gray-500' 
                        : 'top-4 text-lg text-gray-400'
                    }`}>
                      Teléfono
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows="4"
                      required
                      className="w-full bg-transparent border-0 border-b-2 border-gray-200 py-4 text-lg font-light placeholder-transparent focus:outline-none focus:border-gray-400 transition-all duration-300 resize-none group-hover:border-gray-300"
                      placeholder="Mensaje"
                    />
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      formData.mensaje 
                        ? '-top-6 text-sm text-gray-500' 
                        : 'top-4 text-lg text-gray-400'
                    }`}>
                      Mensaje
                    </label>
                  </div>

                  {/* Botón de envío */}
                  <div className="pt-8">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`group relative overflow-hidden px-12 py-4 rounded-full font-light text-lg tracking-wide transition-all duration-500 ${
                        isSubmitting 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:text-white shadow-lg hover:shadow-xl'
                      }`}
                      style={{
                        backgroundColor: isSubmitting ? '#e5e7eb' : 'white',
                      }}
                    >
                      <div 
                        className="absolute inset-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                        style={{ backgroundColor: '#DBCCBA' }}
                      />
                      <div className="relative flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full mr-3" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensaje
                            <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src='https://maps.app.goo.gl/4xWrhYVyvxAazdgP6'></script>
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: '#DBCCBA' }} />
            <Flower2 size={16} className="mx-4 text-gray-400" />
            <div className="w-12 h-px" style={{ backgroundColor: '#DBCCBA' }} />
          </div>
          <p className="text-sm font-light text-gray-500 tracking-wider">
            FLORERÍA · MOMENTOS ÚNICOS · DESDE 2020
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contacto