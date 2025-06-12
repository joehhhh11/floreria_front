import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-flor text-white p-6 space-y-6 rounded-r-2xl">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <nav className="space-y-3">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-white text-gray-800 font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/productos"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-white text-gray-800 font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <CubeIcon className="h-5 w-5" />
          Productos
        </NavLink>

        <NavLink
          to="/admin/usuarios"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-white text-gray-800 font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <UsersIcon className="h-5 w-5" />
          Usuarios
        </NavLink>

        <NavLink
          to="/admin/ingresos"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-white text-gray-800 font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <DollarSignIcon className="h-5 w-5" />
          Ingresos
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
