import { useParams } from "react-router-dom";
import { ShoppingCartIcon, TruckIcon ,XMarkIcon, HeartIcon, ShareIcon, StarIcon, PlusIcon, MinusIcon , InformationCircleIcon, CheckCircleIcon} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import React, { useState , useRef, useEffect } from "react";

import ProductGallery from "@/components/Catalogo/ProductGallery";
import { useProductById } from "@/hooks/useProductById";

import { useCartStore } from "@/store/cartStore";
import { useRelatedProducts } from "@/hooks/useRelatedProducts";
import RelatedProducts from "@/components/Catalogo/RelatedProducts";
import Reviews from "./Reviews";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useProductById(id);
  const [showSuccess, setShowSuccess] = useState(false);
  const related = useRelatedProducts(id, product?.category);
  const [isOpenModal , setIsOpenModal] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return <p className="p-6 text-red-500">Producto no encontrado</p>;
  }



  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleAddToCart = () => {
    const qty = Number(quantity);
    if (qty > 0) {
      addToCart(product, qty, message);
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    setIsOpenModal(false);
  };
  const handleOpenModel = () => {
    setIsOpenModal(true);
  };
console.log('ProductDetail product:', product);
  return (
    <div>
      <div className="p-6 md:w-[70vw] mx-auto flex md:flex-row flex-col">
        <ProductGallery images={product.imageUrls} />
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
              <Button onClick={handleOpenModel}>Añadir al carrito</Button>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts products={related} />
      <Reviews data={product.reviews} productId={product.id}/>

      {isOpenModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Confirmar compra</h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                {product.imageUrls?.[0] && (
                  <img
                    src={BASE_URL + product.imageUrls[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-500">Cantidad: {quantity}</p>
                  <p className="font-bold text-blue-600">${(product.price * quantity).toLocaleString()}</p>
                </div>
              </div>

              {message && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Mensaje:</span> "{message}"
                  </p>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    Este producto será añadido a tu carrito. Podrás revisar tu pedido antes de finalizar la compra.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-flor to-flor text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
            {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            <span>¡Producto añadido al carrito!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
