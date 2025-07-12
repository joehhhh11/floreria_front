
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from "jwt-decode";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      role: null,
      setToken: (token) => {
        const decoded = jwtDecode(token);
        set({ token, role: decoded.role, user: decoded });
      },
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null, role: null }),
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;
