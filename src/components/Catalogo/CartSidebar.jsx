import { useCartStore } from "@/store/cartStore";
import { useStore } from "@/store/useStore";
import {
  XMarkIcon,
  ShoppingBagIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
const CartSidebar = () => {
  const cart = useCartStore((state) => state.cart);
  const isCartOpen = useStore((state) => state.isCartOpen);
  const closeCart = useStore((state) => state.closeCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity); // Asumiendo que existe esta función

  // Calcular total
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      <div
        className={`fixed top-0 right-0 w-96 h-full bg-gradient-to-br from-white to-[#DBCCBA] shadow-2xl transition-all duration-300 ease-in-out z-50 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative p-6 border-b border-gray-200  backdrop-blur">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r bg-[#DBCCBA] rounded-lg">
                <ShoppingBagIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
                <p className="text-sm text-gray-500">{itemCount} artículos</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600 group-hover:text-gray-800 group-hover:rotate-90 transition-all duration-200" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-250px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-6 bg-gray-100 rounded-full mb-4">
                <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-6">
                Agrega algunos productos para comenzar
              </p>
              <Button onClick={closeCart} className="">
                Seguir comprando
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-flor-2 border-flor rounded-xl p-4 shadow-sm border  hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex gap-4">
                  {item.product.image && (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate group-hover:text-[#DBCCBA] transition-colors">
                      {item.product.name}
                    </h4>
                    {item.product.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-gray-100 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity &&
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-200 rounded-l-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity &&
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-200 rounded-r-lg transition-colors"
                          >
                            <PlusIcon className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            $
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">
                              ${item.product.price.toLocaleString()} c/u
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 group/delete"
                      >
                        <TrashIcon className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className=" bg-flor border-t rounded-lg border-flor">
            <div className=" flex flex-row justify-between items-center ">
              <Link to="/carrito" onClick={closeCart}>
                <Button className="">
                  Ver Carrito Completo
                </Button>
              </Link>

              <Button onClick={closeCart}>Seguir Comprando</Button>
            </div>
            <div className="mb-4 p-3 bg-flor-2 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-black">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
