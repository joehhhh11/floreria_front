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
import { SignIn } from "@clerk/clerk-react";

import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import Users from "@/pages/admin/Users";
import Incomes from "@/pages/admin/Incomes";
import Orders from "@/pages/admin/Orders";
import ProtectedRoute from "@/service/ProtectedRoute"; 
import Cupones from "@/pages/admin/Cupones";
import History from "@/pages/public/History";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <RedirectOnSignIn />
      <Routes>
      <Route path="/sign-in" element={<div className="flex justify-center h-screen items-center">
        <SignIn  routing="path" path="/sign-in" />  </div>} />
        
      

        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/auth-redirect" element={<AuthRedirect />} />

          <Route element={<AuthWrapper />}>
            <Route path="/carrito" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/historial" element={<History />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />

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
          <Route path="cupones" element={<Cupones />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
