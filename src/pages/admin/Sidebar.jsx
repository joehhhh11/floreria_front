import React, { useState } from "react";
import { 
  Home, 
  Package, 
  Users, 
  TrendingUp, 
  ShoppingBag, 
  Gift,
  Flower2,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("/admin");

  const navigate = useNavigate();
  const menuItems = [
    {
      to: "/admin",
      icon: Home,
      label: "Dashboard"
    },
    {
      to: "/admin/productos",
      icon: Package,
      label: "Productos"
    },
    {
      to: "/admin/usuarios",
      icon: Users,
      label: "Usuarios"
    },
    {
      to: "/admin/ingresos",
      icon: TrendingUp,
      label: "Ingresos"
    },
    {
      to: "/admin/pedidos",
      icon: ShoppingBag,
      label: "Pedidos"
    },
    {
      to: "/admin/cupones",
      icon: Gift,
      label: "Cupones"
    }
  ];

  return (
    <aside 
      className="hidden md:flex flex-col w-72 p-6 space-y-8 shadow-xl"
      style={{ 
        background: `linear-gradient(135deg, #DBCCBA 0%, #F8F3EC 100%)`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center space-x-3 mb-2">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <Flower2 className="w-7 h-7 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl font-light text-gray-800 tracking-wide">
            Flora Admin
          </h1>
          <p className="text-xs text-gray-600 opacity-80">Panel de Control</p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.to;
          
          return (
            <button
              key={item.to}
                onClick={() => {
    setActiveItem(item.to);
    navigate(item.to);
  }}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden w-full text-left ${
                isActive
                  ? "text-gray-800 font-medium shadow-lg transform scale-[1.02]"
                  : "text-gray-700 hover:text-gray-800 hover:shadow-md hover:transform hover:scale-[1.01]"
              }`}
              style={{
                backgroundColor: isActive 
                  ? 'rgba(255, 255, 255, 0.95)' 
                  : 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {isActive && (
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                  style={{ backgroundColor: '#DBCCBA' }}
                />
              )}
              
              <div className={`p-2 rounded-lg transition-colors duration-300 ${
                isActive 
                  ? 'text-amber-600' 
                  : 'text-gray-600 group-hover:text-amber-600'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              <span className="font-light tracking-wide">
                {item.label}
              </span>

              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
            </button>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white border-opacity-30">
        <div 
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        >
          <BarChart3 className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <p className="text-sm font-light text-gray-700 mb-1">
            Ventas del Día
          </p>
          <p className="text-lg font-medium text-gray-800">
            S/ 1,248.50
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;