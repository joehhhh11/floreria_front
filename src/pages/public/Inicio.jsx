import React from "react";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Products from "@/components/Inicio/Products";
import Categories from "@/components/Inicio/Catalogo";
function Inicio() {
  return (
    <>
      {/* bienvenida */}
      <div className="flex w-[80vw] justify-center mx-auto md:flex-row flex-col">
        <section className="md:w-1/2 flex flex-col justify-center items-start  space-y-5">
          <h1 className="text-6xl">
            {" "}
            Descubra la encantadora colección de nuestra floristería
          </h1>
          <p className="md:w-1/2">
            Bienvenido a nuestro encantador emporio floral, donde la belleza
            florece y los sueños cobran forma. Adéntrese en un mundo de colores
            vibrantes, fragancias cautivadoras y arte que le cautivará.
          </p>
          <Link to="/catalogo">
            <Button className="flex items-center gap-2">
              Ir catálogo <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </Link>
        </section>
        <div className="w-1/2">
          <img src="img1.png" alt="" className="w-[600px] object-contain" />
        </div>
      </div>
      {/* productos */}
      <Products />
      {/* información */}
      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-screen-xl mx-auto mt-20 px-4 gap-10">
        <div className="lg:w-1/2 w-full">
          <h2 className="text-2xl lg:text-6xl mb-6">
            Aromas del Alma: Tejiendo Recuerdos con Flores
          </h2>
          <img src="img1.png" alt="" className="w-full lg:w-[600px] object-contain mx-auto" />
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="hidden md:flex justify-end mb-10">
            <img src="/img1.png" alt="" className="w-[500px] object-cover" />
          </div>

          <div className="space-y-4">
            <p>
              Floreria Lulu nació de una profunda pasión por la belleza de las
              flores, creando un refugio donde la naturaleza florece e inspira...
            </p>
            <p>
              Con una dedicación minuciosa, nuestros floristas expertos eligen a
              mano cada flor, dando vida a composiciones encantadoras...
            </p>
          </div>

          <div className="flex justify-end mt-10">
            <Button className="flex items-center gap-2">
              Leer más <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <Categories />

      {/* promoción */}
      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-screen-xl mx-auto mt-20 px-4 gap-10">
        <div className="lg:w-1/2 w-full">
          <h2 className="text-2xl lg:text-6xl mb-6">
            ¡20% de descuento en tu primera compra!
          </h2>
          <img src="img1.png" alt="" className="w-full lg:w-[600px] object-contain mx-auto" />
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="flex justify-end mb-10">
            <img src="/img1.png" alt="" className="w-full max-w-[500px] object-cover" />
          </div>

          <p className="mb-6">
            En nuestra tienda, creemos en celebrar los nuevos comienzos. Por eso, nos complace ofrecer una oferta exclusiva para nuevos clientes. Disfrute de un increíble 20% de descuento en su primera compra con nosotros. Deléitese seleccionando entre nuestra amplia gama de productos de alta calidad, cuidadosamente seleccionados y elaborados.
          </p>

          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              Ordenar <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* contacto */}
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto mt-36 mb-20 px-4 gap-10">
        <div className="lg:w-1/3 w-full">
          <img src="img1.png" alt="" className="w-full max-w-[500px] object-contain mx-auto" />
          <p className="mt-10">
            Entérate antes que nadie de nuestros emocionantes eventos, ofertas exclusivas y novedades. Únete a nuestra comunidad floral y déjanos llenar tu feed de belleza y maravillas botánicas. Síguenos hoy y emprende un viaje floreciente que despertará tu pasión por todo lo floral.

          </p>
        </div>

        <div className="w-full">
          <h3 className="text-3xl lg:text-6xl mb-5">
            Manténgase conectado: <br /> siga nuestro viaje floral
          </h3>
          <h3 className="text-2xl">@floristalulu</h3>

          <div className="flex flex-col sm:flex-row gap-6 mt-10 justify-center">
            <img
              src="/img1.png"
              alt=""
              className="w-full max-w-[350px] object-cover mx-auto"
            />
            <img
              src="/img1.png"
              alt=""
              className="w-full max-w-[350px] object-cover mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicio;
