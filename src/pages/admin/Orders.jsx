import React, { useState, useEffect } from "react";
import Table from "@/components/Panel/Table";
import orderService from "@/service/orderService";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await orderService.getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      }
    };
    fetchData();
  }, []);
  const columns = [
    { accessorKey: "user.nombre", header: "Nombre del usuario" },
    { accessorKey: "direccionEnvio", header: "Dirección de envío" },
    { accessorKey: "tipoEntrega", header: "Tipo de entrega" },
    { accessorKey: "totalFinal", header: "Total final" },
    { accessorKey: "fechaCreacion", header: "Fecha" },
    { accessorKey: "cuponAplicado", header: "Estado" },
  ];
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Usuarios</h2>
          <p className="text-3xl font-bold"></p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Pedidos</h2>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
      </div>
      <div className="p-20">
        <Table columns={columns} data={orders} />
      </div>
    </div>
  );
}

export default Orders;
