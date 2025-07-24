import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Package, Users, Eye, Calendar, Download, Filter
} from 'lucide-react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import orderService from '@/service/orderService';
import productService from '@/service/productService';
import userService from "@/service/userService";

const StatCard = ({ title, value, icon: Icon, trend }) => (
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
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

const getUser = async () => {
  const users = await userService.getAllUsers();
  return users;
};

  const formatCurrency = (value) => new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, productsData, categoriesData] = await Promise.all([
          orderService.getAllOrders(),
          productService.getAllProducts(),
          productService.getAllCategories()
        ]);

        setOrders(ordersData);
        console.log("Ejemplo de order:", ordersData[23]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    getUser().then(setUser);
  }, []);

  const salesData = orders.reduce((acc, order) => {
    const date = new Date(order.fechaCreacion);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const existing = acc.find(item => item.month === month);
    const total = order.detalles?.reduce((s, d) => s + d.subtotal, 0) || 0;
    if (existing) {
      existing.ventas += total;
      existing.pedidos += 1;
    } else {
      acc.push({ month, ventas: total, pedidos: 1 });
    }
    return acc;
  }, []).sort((a, b) => a.month.localeCompare(b.month));


  const bestSellersMap = {};
  orders.forEach(order => {
    order.detalles?.forEach(item => {
      const id = item.producto.id;
      if (!bestSellersMap[id]) {
        bestSellersMap[id] = {
          id,
          product: item.producto.name,
          sales: item.cantidad,
          profit: item.subtotal
        };
      } else {
        bestSellersMap[id].sales += item.cantidad;
        bestSellersMap[id].profit += item.subtotal;
      }
    });
  });
  const bestSellers = Object.values(bestSellersMap).sort((a, b) => b.sales - a.sales).slice(0, 5);


  const categoryCount = {};
  products.forEach(prod => {
    const cat = prod.categoria?.nombre || 'Sin categoría';
    if (!categoryCount[cat]) {
      categoryCount[cat] = { name: cat, value: 1 };
    } else {
      categoryCount[cat].value += 1;
    }
  });
  const categoryData = Object.values(categoryCount).map((item, i) => ({
    ...item,
    color: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'][i % 5]
  }));

  const totalVentas = salesData.reduce((sum, item) => sum + item.ventas, 0);
  const totalPedidos = salesData.reduce((sum, item) => sum + item.pedidos, 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando dashboard...</div>;
  }
const exportToExcel = () => {
  const wb = XLSX.utils.book_new();

  const pedidosData = orders.map(order => ({
    ID: order.pedidoId,
    Fecha: new Date(order.fechaCreacion).toLocaleDateString('es-PE'),
    Cliente: order.user?.nombre || "Desconocido",
    Correo: order.user?.correo || "Sin correo",
    Estado: order.estado || "No definido",
    Total: order.totalFinal ?? order.subtotal ?? 0,
    TipoEntrega: order.tipoEntrega || "No especificado",
    Dirección: order.direccionEnvio || "No indicada",
    Productos: order.detalles?.map(
      d => `${d.producto?.name || "Producto desconocido"} x${d.cantidad}`
    ).join(', ') || "Sin productos"
  }));
  const pedidosSheet = XLSX.utils.json_to_sheet(pedidosData);
  XLSX.utils.book_append_sheet(wb, pedidosSheet, "Pedidos");

  const topProductosSheet = XLSX.utils.json_to_sheet(
    bestSellers.map(item => ({
      Producto: item.product,
      CantidadVendida: item.sales,
      GananciaTotal: item.profit
    }))
  );
  XLSX.utils.book_append_sheet(wb, topProductosSheet, "Top Productos");

  const ventasMensualesSheet = XLSX.utils.json_to_sheet(
    salesData.map(item => ({
      Mes: item.month,
      TotalPedidos: item.pedidos,
      TotalVentas: item.ventas
    }))
  );
  XLSX.utils.book_append_sheet(wb, ventasMensualesSheet, "Ventas Mensuales");

  const categoriasSheet = XLSX.utils.json_to_sheet(
    categoryData.map(cat => ({
      Categoria: cat.name,
      TotalProductos: cat.value
    }))
  );
  XLSX.utils.book_append_sheet(wb, categoriasSheet, "Categorias");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `Reporte_Floristeria_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
};


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Floristería</h1>
          <p className="text-gray-600">Resumen de ventas y rendimiento del negocio</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> Exportar
          </button>
<button
  onClick={exportToExcel}
  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  <Eye className="w-4 h-4" /> Reporte Avanzado
</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Ventas Totales" value={formatCurrency(totalVentas)} trend="up" icon={DollarSign} />
        <StatCard title="Productos Vendidos" value={totalPedidos} trend="up" icon={Package} />
        <StatCard title="Clientes Nuevos" value={user.length} trend="up" icon={Users} />
        <StatCard title="Pedidos Activos" value={orders.length} trend="down" icon={Calendar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Distribución por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
