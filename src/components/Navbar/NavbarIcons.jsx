import React, { useEffect } from 'react';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


function NavbarIcons({ icons, isSignedIn, onIconClick }) {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    const alreadyCompleted = user?.publicMetadata?.completedProfile;
    if (alreadyCompleted) {
      navigate("/"); // o donde quieras redirigir si ya completó
    }
  }, [user, isLoaded]);

  return (
    <>
      {icons.map((icon, index) => {
        if (icon.isUser) {
          return isSignedIn ? (
            <UserButton key={index} afterSignOutUrl="/" />
          ) : (
            <SignInButton redirectUrl="/complete-profile" key={index} mode="modal" asChild>
              <button className="icon-link" onClick={onIconClick}>
                <img src={icon.icon} alt={icon.name} className="icon" />
              </button>
            </SignInButton>
          );
        }

        return (
          <button
            key={index}
            onClick={() => handleIconClick(icon)}
            className="icon-link"
          >
            <img src={icon.icon} alt={icon.name} className="icon" />
          </button>
        );
      })}
    </>
  );
}

export default NavbarIcons;
