import React from 'react';
import { UserButton, SignInButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function NavbarIcons({ icons, isSignedIn, onIconClick }) {
  const navigate = useNavigate();

  const handleIconClick = (icon) => {
    if (icon.name === 'search') {
      navigate('/catalogo');
    } else {
      icon.action?.();
    }
    onIconClick?.();
  };

  return (
    <>
      {icons.map((icon, index) => {
        if (icon.isUser) {
          return isSignedIn ? (
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
