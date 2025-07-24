import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Calendar, MapPin, Phone, User } from 'lucide-react';
import orderService from '@/service/orderService';

function History() {
  const [filter, setFilter] = useState('todos');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const data = await orderService.getOrdersByCustomer();
      console.log("ordenes miasss", data);
      setOrders(data);
    };
    getOrders();
  }, []);

  const getStatusConfig = (status) => {
    const configs = {
      'PENDIENTE': {
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        label: 'Pendiente',
      },
      'EN_PROCESO': {
        icon: Package,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        label: 'En Proceso',
      },
      'ENTREGADO': {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'Entregado',
      },
      'cancelado': {
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: 'Cancelado',
      },
    };
    return configs[status];
  };

  const filteredOrders = filter === 'todos'
    ? orders
    : orders.filter(order => order.estado === filter);

  const filterButtons = [
    { key: 'todos', label: 'Todos', count: orders.length },
    { key: 'PENDIENTE', label: 'Pendientes', count: orders.filter(o => o.estado === 'PENDIENTE').length },
    { key: 'EN_PROCESO', label: 'En Proceso', count: orders.filter(o => o.estado === 'en-proceso').length },
    { key: 'ENTREGADO', label: 'Entregados', count: orders.filter(o => o.estado === 'entregado').length },
    { key: 'cancelado', label: 'Cancelados', count: orders.filter(o => o.estado === 'cancelado').length }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-flor-2, #F8F3EC)' }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-800 mb-2">Historial de Pedidos</h1>
          <p className="text-gray-600">Gestiona y revisa todos tus pedidos de flores</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {filterButtons.map(button => (
              <button
                key={button.key}
                onClick={() => setFilter(button.key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === button.key
                    ? 'text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 shadow-sm hover:shadow-md'
                }`}
                style={{
                  backgroundColor: filter === button.key ? '#DBCCBA' : 'white',
                }}
              >
                {button.label}
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white bg-opacity-30">
                  {button.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map(order => {
            const statusConfig = getStatusConfig(order.estado);
            if (!statusConfig) return null;
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.pedidoId}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className={`px-6 py-4 ${statusConfig.bg} ${statusConfig.border} border-b`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                      <span className={`font-medium text-sm ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      #{order.pedidoId}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(order.fechaCreacion).toLocaleDateString('es-PE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {order.user?.nombre}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Productos:</h4>
                    <div className="space-y-1">
                      {order.detalles.length === 0 ? (
                        <div className="text-sm text-gray-500 italic pl-4">Sin detalles</div>
                      ) : (
                       order.detalles.map((item, index) => (
  <div key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-gray-100">
    {item.producto?.nombre} × {item.cantidad} — S/ {item.subtotal.toFixed(2)}
  </div>
))
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      {order.direccionEnvio}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {order.user?.correo}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="text-lg font-semibold" style={{ color: '#DBCCBA' }}>
                        S/ {order.totalFinal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="w-full py-2 px-4 rounded-lg text-sm font-medium text-white transition-colors duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#DBCCBA' }}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DBCCBA' }}>
              <Package className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No hay pedidos {filter !== 'todos' && `con estado "${filter}"`}
            </h3>
            <p className="text-gray-500">
              {filter === 'todos'
                ? 'Aún no tienes pedidos registrados'
                : 'Prueba cambiar el filtro para ver otros pedidos'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
