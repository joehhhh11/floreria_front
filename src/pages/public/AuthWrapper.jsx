import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { syncClerkToBackend } from "../../service/syncClerkToBackend";

const AuthWrapper = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🧠 isLoaded:", isLoaded);
    console.log("🔐 isSignedIn:", isSignedIn);
    console.log("👤 user:", user);

    if (!isLoaded || !isSignedIn || !user) return;

    console.log("🚀 Ejecutando syncClerkToBackend...");
    syncClerkToBackend(user)
      .then(() => console.log("✅ syncClerkToBackend completado"))
      .catch((err) => console.error("❌ Error al sincronizar:", err));

    console.log("📦 user.unsafeMetadata:", user.unsafeMetadata);
    if (user.unsafeMetadata?.profileCompleted !== true) {
      console.log("⛔ Perfil incompleto, redirigiendo a /complete-profile");
      navigate("/complete-profile");
    }
  }, [user, isLoaded, isSignedIn, navigate]);

  return <Outlet />;
};

export default AuthWrapper;
