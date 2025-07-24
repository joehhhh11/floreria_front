import React from "react";
import { Link } from "react-router-dom";
function NavbarLinks({ onClick }) {
  return (
    <ul className="flex flex-col md:flex-row gap-5">
      {[
        { to: "/", label: "Sobre nosotros" },
        { to: "/catalogo", label: "Catálogo" },
        { to: "/contacto", label: "Contacto" },


      ].map(({ to, label }) => (
        <li key={to}>
          <Link to={to} onClick={onClick} className="block">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default NavbarLinks;