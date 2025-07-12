// src/service/syncClerkToBackend.js
import httpClient from "@/api/httpClient";
import useAuthStore from "../store/authStore";

export async function syncClerkToBackend(user) {
  const body = {
    correo: user?.primaryEmailAddress?.emailAddress,
    nombre: user?.firstName || "",
    apellidos: user?.lastName || "",
    username: user?.username || user?.id,
  };

  try {
    const res = await httpClient.post("/api/auth/clerk-login", body);

    if (!res.data?.token) {
      throw new Error("El backend no devolvió un JWT");
    }

    // 🧠 Guardar en Zustand
    const { setToken, setUser } = useAuthStore.getState();
    setToken(res.data.token);
    setUser(body); // o cualquier dato extra si tu backend lo devuelve

    console.log("✅ Token guardado en Zustand:", res.data.token);
  } catch (err) {
    console.error("❌ Error al sincronizar con backend:", err);
    throw err;
  }
}
