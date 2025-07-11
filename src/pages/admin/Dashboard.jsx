import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Eye, Calendar, Download, Filter } from 'lucide-react';

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
  const [salesData, setSalesData] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, bestRes, catRes] = await Promise.all([
          fetch('/api/dashboard/monthly-sales'),
          fetch('/api/dashboard/best-sellers'),
          fetch('/api/dashboard/category-distribution'),
        ]);
        const sales = await salesRes.json();
        const best = await bestRes.json();
        const cat = await catRes.json();
        setSalesData(sales);
        setBestSellers(best);
        setCategoryData(cat);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando dashboard...</div>;
  }

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
          value={formatCurrency(salesData.reduce((acc, item) => acc + (item.ventas || 0), 0))}
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Productos Vendidos"
          value={salesData.reduce((acc, item) => acc + (item.pedidos || 0), 0)}
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