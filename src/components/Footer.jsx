import React from 'react'

function Footer() {
  return (
    <>
        <footer className='bg-flor-2'>
            <div className='grid grid-cols-4 pt-5 pb-5'>
                <div className='flex justify-center items-center'>
                    <img src="/logo2.png" alt="" />
                </div>
                <div className='flex items-center'>
                    <ul>
                        <li><a href="">Categories</a></li>
                        <li><a href="">Sobre nosotros</a></li>
                        <li><a href="">Catalogo</a></li>
                        <li><a href="">Contacto</a></li>
                    </ul>
                </div>
                <div className='flex items-center'>
                     <ul>
                        <li><a href="">Soporte</a></li>
                        <li><a href="">Delivery</a></li>
                        <li><a href="">Ayuda y soporte</a></li>
                        <li><a href="">24/7 Servicios</a></li>
                    </ul>
                </div>
                <div className='flex items-center'>
                    <ul>
                        <li><a href="">+123 45678 945</a></li>
                        <li><a href="">floreria@gmail.com</a></li>
                        <li><a href="">123 Miraflores</a></li>
                        <li><a href="">8:00 am - 8:00 pm</a></li>
                    </ul>
                </div>
            </div>
            <div className='flex justify-center pb-5 pt-5'>
                <p> Floreria Lulu © 2023 Todos los derechos reservados</p>
            </div>

        </footer>
    </>
  )
}

export default Footer