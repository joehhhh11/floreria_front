import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Inicio from '@/pages/public/Inicio'
import { Outlet } from 'react-router-dom'
function MainLayout() {
  return (
    <div className='bg-flor-2'>
        <Navbar />
          <Outlet/>
        <Footer />

    </div>
  )
}

export default MainLayout