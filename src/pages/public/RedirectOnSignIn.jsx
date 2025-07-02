import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectOnSignIn = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const completed = user.unsafeMetadata?.profileCompleted;

    const onCompleteProfile = location.pathname === "/complete-profile";

    if (!completed && !onCompleteProfile) {
      navigate("/complete-profile");
    }
  }, [isLoaded, isSignedIn, user, location, navigate]);

  return null;
};

export default RedirectOnSignIn;
