import React, { useState } from "react";
import products from "@/service/productos.json";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function Catalogo() {
  const categories = [...new Set(products.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const filteredProducts = products.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto mt-36 px-4 gap-10">
      <div className="lg:w-[20vw] w-full">
        {filteredProducts.slice(0, 2).map((product) => (
          <div key={product.id} className="mb-4 group">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-80 object-cover bg-black"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-xl">{product.name}</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm transition-opacity duration-300 group-hover:opacity-0">
                  ${product.price}
                </p>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-flor-1 text-black px-3 py-1 rounded">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-10">
          <Link to="/catalogo">
            <Button className="flex items-center gap-2">
              Ver más <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="lg:w-[45vw] w-full mx-auto">
        <h3 className="text-4xl sm:text-5xl md:text-6xl mb-10">
          Catálogo de Encantos Florales para Cada Ocasión
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProducts.slice(2).map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col gap-5 p-5 rounded-lg"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-80 object-cover bg-black"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-xl">{product.name}</h2>
                <div className="flex gap-2">
                  <p className="">
                    ${product.price}
                  </p>
              
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;
