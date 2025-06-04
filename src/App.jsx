
import "./App.css";
import MainLayout from "@/layout/MainLayout";
import { Routes, Route } from "react-router-dom";

import Inicio from "@/pages/public/Inicio";
import Catalogo from "@/pages/public/Catalogo";
import Contacto from "@/pages/public/Contacto";
import ProductDetail from "@/pages/public/ProductDetail";
import Cart from "@/pages/public/Cart";
import Payment from "./pages/public/Payment";

import Login from "@/pages/admin/Login";
import Products from "@/pages/admin/Products";
import ProtectedRoute from "@/service/ProtectedRoute";
import AdminLayout from "@/layout/AdminLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/carrito" element={<Cart />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="productos" element={<Products />} />{" "}
        {/* /admin/productos */}
      </Route>
    </Routes>
  );
}

export default App;
