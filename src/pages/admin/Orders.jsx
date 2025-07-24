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
        const products = await getOrderById(order.pedidoId);
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
const actualizarEstado = async (pedidoId, nuevoEstado) => {
  try {
    await orderService.updateOrderStatus(pedidoId, nuevoEstado); // ✅ aquí
    const data = await orderService.getAllOrders();
    setOrders(data);
    closeModal();
  } catch (err) {
    console.error("Error al actualizar estado:", err);
  }
};



  const columns = [
    { accessorKey: "user.nombre", header: "Nombre del usuario" },
    { accessorKey: "direccionEnvio", header: "Dirección de envío" },
    { accessorKey: "tipoEntrega", header: "Tipo de entrega" },
    { accessorKey: "totalFinal", header: "Total final" },
    { accessorKey: "fechaCreacion", header: "Fecha" },
    {
  accessorKey: "cuponAplicado",
  header: "Cupón",
  cell: ({ getValue }) => {
    const value = getValue();
    return value ? value : <span className="italic text-gray-500">Sin cupón</span>;
  },
},
    {
  accessorKey: "estado",
  header: "Estado del pedido",
  cell: ({ getValue }) => {
    const estado = getValue();

    const colorMap = {
      PENDIENTE: "bg-yellow-100 text-yellow-800",
      ENVIADO: "bg-blue-100 text-blue-800",
      ENTREGADO: "bg-green-100 text-green-800",
      CANCELADO: "bg-red-100 text-red-800",
    };

    const color = colorMap[estado] || "bg-gray-100 text-gray-800";

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${color}`}
      >
        {estado}
      </span>
    );
  },
},

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
        onEstadoChange={actualizarEstado}
      />


    </div>
  );
}

export default Orders;
