import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "@/store/useStore";
import CartSidebar from "@/components/Catalogo/CartSidebar";
import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import NavbarLinks from "@/components/Navbar/NavbarLinks";
import NavbarIcons from "@/components/Navbar/NavbarIcons";
import {ShoppingBagIcon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const toggleCart = useStore((state) => state.toggleCart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const icons = [
    { name: "cart", icon: "/car.png", action: toggleCart },
    { name: "favorites", icon: "/favore.png" },
    { name: "user", icon: "/user.png", isUser: true },
        {
      name: "history",
      icon: <ShoppingBagIcon className="w-6 h-6" />,
      action: () => navigate("/historial"), 
    },

  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="bg-flor-2 px-6 py-10 md:px-40 flex items-center justify-between relative ">
        <div className="flex items-center">
          {isSignedIn && <p className="hidden md:block mr-6">Hola, <span className="font-bold">{user?.firstName}</span></p>}

          <div className="hidden md:block">
            <NavbarLinks />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          <Link to="/">
            <img src="/logoFloreria.png" alt="logo" className="h-10" />
          </Link>
        </div>

        <div className="hidden md:flex gap-5">
          <NavbarIcons icons={icons} isSignedIn={isSignedIn} />
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-flor-2 shadow-md md:hidden z-10">
            <NavbarLinks onClick={closeMenu} />
            <div className="flex gap-5 px-4 pb-4">
              <NavbarIcons icons={icons} isSignedIn={isSignedIn} onIconClick={closeMenu} />
            </div>
          </div>
        )}
      </nav>

      <CartSidebar />
    </>
  );
}


export default Navbar;
