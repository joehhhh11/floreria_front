import { useCartStore } from "@/store/cartStore"
import { useStore } from "@/store/useStore"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const cart = useCartStore((state) => state.cart)
  const isCartOpen = useStore((state) => state.isCartOpen)
  const closeCart = useStore((state) => state.closeCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transition-transform z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tu Carrito</h2>
        <button onClick={closeCart}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
        {cart.length === 0 ? (
          <p className="text-gray-600">El carrito está vacío</p>
        ) : (
          cart.map((item) => (
            <div key={item.product.id} className="mb-4">
              <p className="font-semibold">{item.product.name}</p>
              <p className="font-semibold">{item.product.description}</p>

              <p>Cantidad: {item.quantity}</p>
              <XMarkIcon className="w-6 h-6" onClick={() => removeFromCart(item.product.id)} />
            </div>
          ))
        )}
              <Link to="/carrito">
        <button className="w-full text-black">Ver carrito</button>
      </Link>
      </div>

    </div>
  )
}

export default CartSidebar
