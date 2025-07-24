import React, { useState } from "react";
import FormPayment from "@/components/Payment/FormPayment";
import FormCard from "@/components/Payment/FormCard";
import { useCartStore } from "@/store/cartStore";
import orderService from "../../service/orderService";
import paymentService from "../../service/paymentService";
import axios from "axios";
import productService from "@/service/cuponService";
function Payment() {
  const cart = useCartStore((state) => state.cart);
  const [formData, setFormData] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [cuponInput, setCuponInput] = useState("");
  const [cupon, setCupon] = useState(null);

  const [cuponStatus, setCuponStatus] = useState(null);
  const aplicarCupon = async () => {
    if (!cuponInput) {
      setCupon(null);
      setCuponStatus(null);
      return;
    }

    try {
      const cupon = await productService.getCuponByCodigo(cuponInput);
      setCupon(cupon);
      console.log("Cupón obtenido:", cupon);
      setCuponStatus("ok");
    } catch (error) {
      setCupon(null);
      setCuponStatus("error");
    }
  };
  const handlePayment = async () => {
    if (!formData) return alert("Faltan datos de envío");

    try {
      const orderRes = await orderService.createOrder({
        direccionEnvio: `${formData.address}, ${formData.apartment}, ${formData.city}, ${formData.distrito}`,
        tipoEntrega: formData.tipoEntrega,
        cuponId: cupon?.id || null,
        estado: "PENDIENTE",
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
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const descuento = cupon?.descuentoPorcentaje ? (subtotal * cupon.descuentoPorcentaje) / 100 : 0;

  const total = subtotal - descuento;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[70vw] mx-auto pt-20 pb-20">
      <div className="space-y-4">
        <FormPayment onChange={setFormData} />
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Código de cupón
          </label>
          <div className="flex gap-2">
            <input
              value={cuponInput}
              onChange={(e) => setCuponInput(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Ingrese su código"
            />
            <button
              onClick={aplicarCupon}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
              Aplicar
            </button>
          </div>

          {cuponStatus === "ok" && (
            <p className="text-green-600 text-sm mt-1">
              Cupón aplicado correctamente ✅
            </p>
          )}
          {cuponStatus === "error" && (
            <p className="text-red-500 text-sm mt-1">
              Cupón no válido o expirado ❌
            </p>
          )}
        </div>
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
            <span className="">Subtotal</span>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          {cupon && (
            <div className="flex justify-between text-green-700">
              <span>Descuento ({cupon.descuento}%)</span>
              <span>- ${descuento.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-bold">TOTAL DEL PEDIDO</span>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
