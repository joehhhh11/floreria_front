// service/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Import nombrado
import useAuthStore from "@/store/authStore";

export default function ProtectedRoute({ role, children }) {
  const token = useAuthStore((state) => state.token);

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token); // ✅ Uso corregido
    if (role && decoded.role !== role) {
      return <Navigate to="/" replace />;
    }
  } catch (e) {
    console.error("Token inválido:", e);
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
}
