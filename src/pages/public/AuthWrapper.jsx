import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthWrapper = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && user?.publicMetadata?.profileCompleted !== true) {
      navigate("/complete-profile");
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  return <Outlet />;
};

export default AuthWrapper;
