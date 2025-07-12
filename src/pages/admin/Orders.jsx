import React, { useState, useEffect } from "react";
import Table from "@/components/Panel/Table";
import orderService from "@/service/orderService";
import ActionModal from "@/components/Panel/ActionModal";
import { IconActions } from "@/components/Panel/IconActions";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);

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

  const getOrderById = async (id) => {
    const products = await orderService.getOrderById(id);
    return products;
  };

  const openModal = async (order, mode) => {
    setSelectedOrder(order);
    setModalMode(mode);

    if (mode === "view") {
      try {
        const products = await getOrderById(order.pedidoId);; // asegúrate que `order._id` exista
        console.log(products.detalles);
        setOrderProducts(products.detalles);
      } catch (error) {
        console.error("Error al obtener productos del pedido:", error);
      }
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalMode(null);
  };

  const columns = [
    { accessorKey: "user.nombre", header: "Nombre del usuario" },
    { accessorKey: "direccionEnvio", header: "Dirección de envío" },
    { accessorKey: "tipoEntrega", header: "Tipo de entrega" },
    { accessorKey: "totalFinal", header: "Total final" },
    { accessorKey: "fechaCreacion", header: "Fecha" },
    { accessorKey: "cuponAplicado", header: "Estado" },
    {
      header: "Ver",
      cell: ({ row }) => (
        <IconActions
        
          onView={() => openModal(row.original, "view")}
          show={{ view: true }}
        />
      ),
    },
    {
      header: "Editar / Eliminar",
      cell: ({ row }) => (
        <IconActions
          onEdit={() => openModal(row.original, "edit")}
          onDelete={() => openModal(row.original, "delete")}
          show={{ edit: true, delete: true }}
        />
      ),
    },
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

      <div className="p-4">
        <Table columns={columns} data={orders} />
      </div>

      <ActionModal
        isOpen={!!modalMode}
        onClose={closeModal}
        data={selectedOrder}
        mode={modalMode}
        products={orderProducts}
      />
    </div>
  );
}

export default Orders;
