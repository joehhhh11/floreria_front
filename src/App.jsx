import "./App.css";
import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import AdminLayout from "@/layout/AdminLayout";

import Inicio from "@/pages/public/Inicio";
import Catalogo from "@/pages/public/Catalogo";
import Contacto from "@/pages/public/Contacto";
import ProductDetail from "@/pages/public/ProductDetail";
import Cart from "@/pages/public/Cart";
import Payment from "./pages/public/Payment";
import CompleteProfile from "./pages/public/CompleteProfile";
import RedirectOnSignIn from "./pages/public/RedirectOnSignIn";
import AuthRedirect from "./service/AuthRedirect";
import AuthWrapper from "./pages/public/AuthWrapper";

import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import Users from "@/pages/admin/Users";
import Incomes from "@/pages/admin/Incomes";
import Orders from "@/pages/admin/Orders";
import ProtectedRoute from "@/service/ProtectedRoute"; // 🛡️ Revisa el rol en el token

function App() {
  return (
    <>
      <RedirectOnSignIn />

      <Routes>
        {/* Layout público */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/auth-redirect" element={<AuthRedirect />} />

          {/* Rutas protegidas para usuarios comunes */}
          <Route element={<AuthWrapper />}>
            <Route path="/carrito" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Route>
        </Route>

        {/* Login público */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas para ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="ingresos" element={<Incomes />} />
          <Route path="pedidos" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
