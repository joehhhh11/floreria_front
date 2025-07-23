import React, { useEffect } from 'react';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function NavbarIcons({ icons, isSignedIn: isSignedInProp, onIconClick }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleIconClick = (icon) => {
    if (icon.name === 'search') {
      navigate('/catalogo');
    } else {
      icon.action?.();
    }
  };

  useEffect(() => {
    if (!isLoaded || !user) return;

    const completed = user.unsafeMetadata?.profileCompleted;

    const checkOrSetProfileMetadata = async () => {
      // Si nunca se definió, inicialízalo como falso
      // Si el perfil no está completo, redirige
      if (!completed) {
        navigate('/complete-profile');
      }
    };

    checkOrSetProfileMetadata();
  }, [user, isLoaded, navigate]);

  return (
    <>
      {icons.map((icon, index) => {
        if (icon.isUser) {
          return isSignedInProp ? (
            <UserButton key={index} afterSignOutUrl="/" />
          ) : (
            <SignInButton key={index} mode="modal">
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
            className="cursor-pointer hover:scale-110 transition-transform duration-150 ease-in-out"
          >
            <img src={icon.icon} alt={icon.name} className="icon" />
          </button>
        );
      })}
    </>
  );
}

export default NavbarIcons;
