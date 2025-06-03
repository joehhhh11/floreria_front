import React from "react";
import Button from "@/components/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Products from "@/components/Inicio/Products";
import Categories from "@/components/Inicio/Catalogo";
function Inicio() {
  return (
    <>
      {/* Sección de bienvenida */}
      <div className="flex w-[80vw] justify-center mx-auto">
        <section className="w-1/2 flex flex-col justify-center items-start  space-y-5">
          <h1 className="text-6xl">
            {" "}
            Descubra la encantadora colección de nuestra floristería
          </h1>
          <p className="w-1/2">
            Bienvenido a nuestro encantador emporio floral, donde la belleza
            florece y los sueños cobran forma. Adéntrese en un mundo de colores
            vibrantes, fragancias cautivadoras y arte que le cautivará.
          </p>
          <Button className="flex items-center gap-2">
            Ir catalogo <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </section>
        <div className="w-1/2">
          <img src="img1.png" alt="" className="w-[600px] object-contain" />
        </div>
      </div>
      {/* Sección de productos */}
      <Products />
      {/* Sección de informacion */}
      <div className="flex w-[70vw] justify-center mx-auto mt-20">
        <div>
          <h2 className="text-6xl -mr-42">
            Aromas del Alma: Tejiendo Recuerdos con Flores
          </h2>
          <img src="img1.png" alt="" className="w-[600px] object-contain" />
        </div>
        <div>
          <div className="flex justify-end mr-20">
            <img
              src="/img1.png"
              alt=""
              className="w-[500px] object-cover mb-10"
            />
          </div>
          <div className="w-2/3 ml-20 space-y-4">
            <p>
              Floreria Lulu nació de una profunda pasión por la belleza de las
              flores, creando un refugio donde la naturaleza florece e inspira.
              Cada flor que llega a nuestra tienda es cuidadosamente
              seleccionada, asegurando que solo los pétalos más frescos y
              vibrantes formen parte de nuestros arreglos.
            </p>
            <p>
              Con una dedicación minuciosa, nuestros floristas expertos eligen a
              mano cada flor, dando vida a composiciones encantadoras que se
              convierten en símbolos de amor, alegría y belleza en los momentos
              más valiosos de la vida. Ya sea para sorprender a alguien especial
              o embellecer un evento, Blossomia Flower Store es la elección
              perfecta.
            </p>
          </div>

          <div className="flex justify-end mr-20 -mt-20">
            <Button className="flex items-center gap-2">
              {" "}
              Leer mas <ArrowRightIcon className="w-5 h-5" />{" "}
            </Button>
          </div>
        </div>
      </div>
      <Categories />
      {/* Sección de descuento */}
      <div className="flex w-[80vw] justify-center mx-auto mt-20">
        <div>
          <h2 className="text-6xl -mr-42">
            ¡20% de descuento en tu primera compra en nuestra tienda!
          </h2>
          <img src="img1.png" alt="" className="w-[600px] object-contain" />
        </div>
        <div>
          <div className="flex justify-end mr-20">
            <img
              src="/img1.png"
              alt=""
              className="w-[500px] object-cover mb-10"
            />
          </div>
          <p className="w-1/2 ml-20">
            En nuestra tienda, creemos en celebrar los nuevos comienzos. Por
            eso, nos complace ofrecer una oferta exclusiva para nuevos clientes.
            Disfrute de un increíble 20% de descuento en su primera compra con
            nosotros. Deléitese seleccionando entre nuestra amplia gama de
            productos de alta calidad, cuidadosamente seleccionados y
            elaborados.
          </p>
          <div className="flex justify-end mr-20 -mt-20">
            <Button className="flex items-center gap-2">
              {" "}
              Ordenar <ArrowRightIcon className="w-5 h-5" />{" "}
            </Button>
          </div>
        </div>
      </div>
      {/* Sección de contacto */}
      <div className="flex mt-36 w-[70vw] mx-auto gap-10 mb-20">
        <div className="w-1/3">
          <img src="img1.png" alt="" className="w-[500px] object-contain" />
          <p className=" mt-10">
            Entérate antes que nadie de nuestros emocionantes eventos, ofertas
            exclusivas y novedades. Únete a nuestra comunidad floral y déjanos
            llenar tu feed de belleza y maravillas botánicas. Síguenos hoy y
            emprende un viaje floreciente que despertará tu pasión por todo lo
            floral.
          </p>
        </div>
        <div className="w-auto">
          <h3 className="text-6xl mb-5">Manténgase conectado: <br /> siga nuestro viaje floral</h3>
          <h3 className="text-2xl">@floristalulu</h3>
          <div className="flex gap-20 mt-10 justify-center">
            <img
              src="/img1.png"
              alt=""
              className="w-[350px] object-cover mb-10"
            />
            <img
              src="/img1.png"
              alt=""
              className="w-[350px] object-cover mb-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicio;
