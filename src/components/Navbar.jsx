import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {

    const icons = [
        { name: 'home', icon: '/car.png' },
        { name: 'search', icon: '/favore.png' },
        { name: 'notifications', icon: '/user.png' },
        { name: 'profile', icon: '/search.png' }
    ];
  return (
    <>
      <nav className='flex justify-between px-40 py-10 bg-flor-2'>
        <div>
            <ul className='flex gap-5'>
                <li><Link to="/">Sobre nosotros</Link></li>
                <li><Link to="/catalogo">Catalogo</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
            </ul>
        </div>
        <div className='-ml-28'>
            <Link to="/">
               <img src="/logoFloreria.png" alt="logo" className="logo" />
            </Link>
           
        </div>
        <div className='flex gap-5'>
            {icons.map((icon, index) => (
                <a href="#" key={index} className="icon-link">
                    <img src={icon.icon} alt={icon.name} className="icon" />
                </a>
            ))}
        </div>
      </nav>
    </>
  )
}

export default Navbar