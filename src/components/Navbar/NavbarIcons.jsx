import React, { useEffect } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function NavbarIcons({ icons, isSignedIn: isSignedInProp, onIconClick }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleIconClick = (icon) => {
    if (icon.name === "search") {
      navigate("/catalogo");
    } else {
      icon.action?.();
    }
  };

  useEffect(() => {
    if (!isLoaded || !user) return;

    const completed = user.unsafeMetadata?.profileCompleted;

    const checkOrSetProfileMetadata = async () => {
      if (!completed) {
        navigate("/complete-profile");
      }
    };

    checkOrSetProfileMetadata();
  }, [user, isLoaded, navigate]);

  return (
    <>
      {icons.map((icon, index) => {
        const renderIcon = () =>
          typeof icon.icon === "string" ? (
            <img src={icon.icon} alt={icon.name} className="w-6 h-6" />
          ) : (
            icon.icon
          );

        if (icon.isUser) {
          return isSignedInProp ? (
            <UserButton
              key={index}
              afterSignOut={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            />
          ) : (
            <SignInButton key={index} mode="modal">
              <button
                className="icon-link cursor-pointer hover:scale-110 transition-transform duration-150 ease-in-out"
                onClick={onIconClick}
              >
                {renderIcon()}
              </button>
            </SignInButton>
          );
        }

        return (
          <button
            key={index}
            onClick={() => handleIconClick(icon)}
            className="cursor-pointer hover:scale-110 transition-transform duration-150 ease-in-out"
          >
            {renderIcon()}
          </button>
        );
      })}
    </>
  );
}

export default NavbarIcons;
