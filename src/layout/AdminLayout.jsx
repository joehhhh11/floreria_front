import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/pages/admin/Sidebar"; // Asegúrate de crear este componente

const AdminLayout = () => {
    console.log("✅ AdminLayout cargado");

  return (
    <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-flor-2">
          <Outlet />
        </main>
    </div>
  );
};

export default AdminLayout;
