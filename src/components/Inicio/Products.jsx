import React, { useState } from "react";
import products from "@/service/productos.json";
import Button from "@/components/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { fetchProducts } from "@/api/productsApi";

function Products() {
  const categories = [...new Set(products.map((p) => p.category))];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <>
      <div className="flex flex-col w-[80vw] mx-auto mt-20">
        <div className="flex md:flex-row flex-col gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded cursor-pointer ${
                selectedCategory === category
                  ? "bg-flor-1 text-[#C96B6B]"
                  : " text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col gap-5 p-5  rounded-lg justify-center items-center  w-[320px]"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className=" h-60 w-full object-cover bg-red-500"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-xl">{product.name}</h2>
                <div className="flex items-center gap-2  ">
                  <p className="text-sm transition-opacity duration-300 group-hover:opacity-0 ">
                    ${product.price}
                  </p>

                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-flor-1 text-black px-3 py-1 rounded">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button className="flex items-center gap-2"> Ver catalogo <ArrowRightIcon className="w-5 h-5" /> </Button>  
      </div>
      
    </>
  );
}

export default Products;
