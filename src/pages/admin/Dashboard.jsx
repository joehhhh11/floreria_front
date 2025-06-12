import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Eye, Calendar, Download, Filter } from 'lucide-react';

// Datos de ventas mensuales
const salesData = [
  { month: "Ene", ventas: 3500, pedidos: 145 },
  { month: "Feb", ventas: 4200, pedidos: 167 },
  { month: "Mar", ventas: 3800, pedidos: 156 },
  { month: "Abr", ventas: 5100, pedidos: 198 },
  { month: "May", ventas: 4600, pedidos: 175 },
  { month: "Jun", ventas: 6200, pedidos: 210 },
  { month: "Jul", ventas: 5400, pedidos: 190 },
  { month: "Ago", ventas: 4800, pedidos: 180 },
  { month: "Sep", ventas: 6500, pedidos: 220 },
  { month: "Oct", ventas: 5800, pedidos: 205 },
  { month: "Nov", ventas: 6100, pedidos: 215 },
  { month: "Dic", ventas: 7200, pedidos: 250 }
];

// Datos existentes actualizados con colores
const bestSellers = [
  { id: 1, product: "Ramo de rosas", sales: 458, profit: 16030, growth: 12.5, color: "#ef4444" },
  { id: 2, product: "Orquídeas", sales: 385, profit: 19250, growth: 8.7, color: "#8b5cf6" },
  { id: 3, product: "Girasoles", sales: 342, profit: 8550, growth: -2.1, color: "#f59e0b" },
  { id: 4, product: "Lirios blancos", sales: 298, profit: 13410, growth: 15.3, color: "#10b981" }
];

const categoryData = [
  { name: 'Rosas', value: 35, color: '#ef4444' },
  { name: 'Orquídeas', value: 25, color: '#8b5cf6' },
  { name: 'Girasoles', value: 20, color: '#f59e0b' },
  { name: 'Lirios', value: 15, color: '#10b981' },
  { name: 'Otros', value: 5, color: '#6b7280' }
];

// Componente StatCard
const StatCard = ({ title, value, change, icon: Icon, trend }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
    <div className={`text-${trend === 'up' ? 'green' : 'red'}-500`}>
      {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
    </div>
  </div>
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('12m');
  const [chartType, setChartType] = useState('line');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Floristería</h1>
          <p className="text-gray-600">Resumen de ventas y rendimiento del negocio</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Eye className="w-4 h-4" />
            Reporte Avanzado
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Ventas Totales"
          value={formatCurrency(65280)}
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Productos Vendidos"
          value="2,483"
          change="+8.2%"
          icon={Package}
          trend="up"
        />
        <StatCard
          title="Clientes Nuevos"
          value="156"
          change="+24.1%"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Pedidos Activos"
          value="23"
          change="-5.2%"
          icon={Calendar}
          trend="down"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Ventas Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
              <Line type="monotone" dataKey="pedidos" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Distribución por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Sellers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Productos Más Vendidos</h2>
          <table className="w-full">
            <thead>
              <tr className="text-gray-600">
                <th className="text-left">Producto</th>
                <th className="text-left">Ventas</th>
                <th className="text-left">Ganancia</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-2">{item.product}</td>
                  <td className="py-2">{item.sales}</td>
                  <td className="py-2">{formatCurrency(item.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;