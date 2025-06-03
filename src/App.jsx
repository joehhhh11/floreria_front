import { useState } from 'react'
import './App.css'
import MainLayout from '@/layout/MainLayout'
import { Routes, Route } from 'react-router-dom';

import Inicio from '@/pages/public/Inicio'
import Catalogo from '@/pages/public/Catalogo'
import Contacto from '@/pages/public/Contacto'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  )
}

export default App
