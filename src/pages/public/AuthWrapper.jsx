import { useUser, useSignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { syncClerkToBackend } from "../../service/syncClerkToBackend";

const AuthWrapper = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      console.log("🔐 Usuario no autenticado, abriendo modal de login...");
      navigate("/sign-in");
      return;
    }

    if (!isLoaded || !user) return;

    syncClerkToBackend(user)
      .then(() => console.log("✅ syncClerkToBackend completado"))
      .catch((err) => console.error("❌ Error al sincronizar:", err));

    if (user.unsafeMetadata?.profileCompleted !== true) {
      navigate("/complete-profile");
    }
  }, [user, isLoaded, isSignedIn, navigate, openSignIn]);

  return <Outlet />;
};

export default AuthWrapper;
