import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const profileCompleted = user.publicMetadata?.profileCompleted;

      if (!profileCompleted) {
        navigate("/complete-profile");
      } else {
        navigate("/"); 
      }
    }
  }, [user, navigate]);

  return null;
};

export default AuthRedirect;
