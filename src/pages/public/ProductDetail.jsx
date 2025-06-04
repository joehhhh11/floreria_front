import { useParams } from "react-router-dom";
import { ShoppingCartIcon, TruckIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import React, { useState , useRef } from "react";

import ProductGallery from "@/components/Catalogo/ProductGallery";
import { useProductById } from "@/hooks/useProductById";

import { useCartStore } from "@/store/cartStore";
import { useRelatedProducts } from "@/hooks/useRelatedProducts";
import RelatedProducts from "@/components/Catalogo/RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useProductById(id);
  const related = useRelatedProducts(id, product.category);

  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return <p className="p-6 text-red-500">Producto no encontrado</p>;
  }

  const handleAddToCart = () => {
    const qty = Number(quantity);
    if (qty > 0) {
      addToCart(product, qty, message);
      alert("Producto añadido al carrito");
    }
  };
  return (
    <div>
      <div className="p-6 md:w-[70vw] mx-auto flex md:flex-row flex-col">
        <ProductGallery images={product.images} />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-700 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600">{product.description}</p>
          <div className="mt-5">
            <label htmlFor="">Dedicatoria / Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Max 255 caracteres"
              className="px-4 py-2 w-full border"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="">Recomendacion</label>
            <p className="text-gray-600">{product.information}</p>
          </div>
          <div className="mt-5">
            <label htmlFor="">Metodos de entrega disponibles</label>
            <div className="flex  gap-8 text-gray-800 mt-3">
              <div className="flex items-center gap-2 p-5 border rounded-3xl">
                <TruckIcon className="w-6 h-6" />
                <span>Envío a domicilio</span>
              </div>
              <div className="flex items-center gap-2 p-5 border rounded-3xl">
                <ShoppingCartIcon className="w-6 h-6" />
                <span>Recoge en tienda</span>
              </div>
            </div>
            <div className="flex gap-2 mt-10 w-full">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                placeholder="Cantidad"
                className="px-2 py-2 border"
              />
              <Button onClick={handleAddToCart}>Añadir al carrito</Button>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts products={related} />
    </div>
  );
};

export default ProductDetail;
