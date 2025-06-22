import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, message = "") => {
        const cart = get().cart;
        const existing = cart.find(item => item.product.id === product.id);

        if (existing) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { product, quantity: 1, message }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.product.id !== productId),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', 
    }
  )
)
