import React, { useState } from "react";
import FormPayment from "@/components/Payment/FormPayment";
import FormCard from "@/components/Payment/FormCard";
import { useCartStore } from "@/store/cartStore";
import orderService from "../../service/orderService";
import paymentService from "../../service/paymentService";
import axios from "axios";
function Payment() {
  const cart = useCartStore((state) => state.cart);
  const [formData, setFormData] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handlePayment = async () => {
    if (!formData) return alert("Faltan datos de envío");

    try {
      const orderRes = await orderService.createOrder({
        direccionEnvio: `${formData.address}, ${formData.apartment}, ${formData.city}, ${formData.distrito}`,
        tipoEntrega: formData.tipoEntrega,
        cuponId: null,
        productos: cart.map((item) => ({
          productoId: item.product.id,
          cantidad: item.quantity,
        })),
      });
      const order = orderRes.pedidoId;
      console.log("Orden creada:", order);

      const stripeUrl = await paymentService.createPaymentSession(order);
      window.location.href = stripeUrl;

      console.log("Stripe URL:", stripeUrl);

      window.location.href = stripeUrl;

    } catch (error) {
      console.error("Error durante el pago:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[70vw] mx-auto pt-20 pb-20">
      <div>
        <FormPayment onChange={setFormData} />
        <FormCard />
      </div>

      <div className="bg-[#F0F0F0] p-10 h-[50vh]">
        <button
          onClick={handlePayment}
          className="w-full bg-flor text-white py-3 rounded hover:bg-gray-800 transition mb-4"
        >
          Realizar pago
        </button>
        <p className="text-xs text-gray-500 mb-6">
          Al realizar su pedido, usted acepta nuestra{" "}
          <a href="#" className="underline">
            Política de privacidad
          </a>{" "}
          y{" "}
          <a href="#" className="underline">
            Condiciones de uso
          </a>
          .
        </p>
        <div>
          <h2 className="text-lg font-semibold mb-2">Resumen del pedido</h2>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="mb-4 border-b pb-4 border-flor flex"
            >
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-5">
                  <p>{item.quantity}</p>
                  <p>{item.product.name}</p>
                </div>
                <div className="flex">
                  <p>${item.product.price}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <span className="font-bold">TOTAL DEL PEDIDO</span>
            <p>
              $
              {cart.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
