import React from "react";
import FormPayment from "@/components/Payment/FormPayment";
import FormCard from "@/components/Payment/FormCard";
import { useCartStore } from "@/store/cartStore";
function Payment() {
  const cart = useCartStore((state) => state.cart);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[70vw] mx-auto pt-20 pb-20">
        <div>
          <FormPayment />
          <FormCard />
        </div>

        <div className="bg-[#F0F0F0] p-10 h-[50vh]">
          <button className="w-full bg-flor text-white py-3 rounded hover:bg-gray-800 transition mb-4">
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
                    <p>{item.product.price}</p>
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
    </>
  );
}

export default Payment;
