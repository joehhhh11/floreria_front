import { useCartStore } from "@/store/cartStore";
import Button from "@/components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const resolveImageUrl = (url) => {
    if (!url) return "/placeholder.jpg";
    return url.startsWith("http") || url.startsWith("/")
      ? url
      : BASE_URL + url;
  };
  return (
    <>
      <div className="flex mx-auto md:flex-row flex-col w-[70vw] mt-10 ">
        <div className="md:w-2/3 mr-5 ">
          <h4>Carrito</h4>
          <div clas>
            {cart.length === 0 ? (
              <p className="text-gray-600">El carrito está vacío</p>
            ) : (
              cart.map((item) => (
                <div key={item.product.id}   className="mb-4 border-b pb-4 border-flor flex md:flex-row flex-col">
                  <div>
                    <img
                      src={resolveImageUrl(item.product.imageUrls?.[0])}
                      alt={item.product.name}
                      className="w-56 h-56 object-cover bg-black"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-lg">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {item.product.description}
                    </p>
                    <div className="flex justify-between">
                    <p className="mt-1">Cantidad: {item.quantity}</p>
                    <XMarkIcon className="w-6 h-6" onClick={() => removeFromCart(item.product.id)} />

                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="border-2 border-flor p-10 md:w-1/3 ">
          <h4 className="text-4xl mb-10">Total</h4>
          <div>
            {cart.map((item) => (
              <div key={item.product.id} className="mb-4 flex justify-between">
                <span>
                  {item.quantity} {item.product.name}
                </span>
                <span>S/.{item.product.price}</span>
              </div>
            ))}
            <div className="flex justify-between mb-4 border-t pt-2">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span>
                $
                {cart.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                )}
              </span>
            </div>
            <div className="flex justify-center mt-20">
              <Link to="/payment">
            <Button>Pagar</Button>
              
               </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
