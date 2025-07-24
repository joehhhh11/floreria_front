import React from "react";
import Table from "@/components/Panel/Table";

const ActionModal = ({ isOpen, onClose, data, mode, products, onEstadoChange }) => {
  if (!isOpen || !data) return null;

  const columns = [
    { accessorKey: "producto.name", header: "Nombre" },
    { accessorKey: "cantidad", header: "Cantidad" },
    { accessorKey: "producto.categoria.descripcion", header: "Categoria" },
    { accessorKey: "precioUnitario", header: "Precio Unitario" },
    { accessorKey: "subtotal", header: "Precio" },
  ];

  const renderContent = () => {
    switch (mode) {
      case "view":
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">Detalle del Pedido</h3>
            <Table columns={columns} data={products} />
          </div>
        );

      case "edit":
        return (
          <div>
            <h3 className="text-lg font-bold mb-4">Editar Estado del Pedido</h3>
            <select
              className="border p-2 rounded w-full"
              value={data.estado || "PENDIENTE" || "EN_PROCESO" || "ENTREGADO" || "CANCELADO"}
              onChange={(e) => onEstadoChange(data.pedidoId, e.target.value)}
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROCESO">En proceso</option>
              <option value="ENTREGADO">Entregado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
        );

      case "delete":
        return (
          <>
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Eliminar Pedido
            </h3>
            <p className="text-sm mb-4">
              ¿Estás seguro de que deseas eliminar este pedido?
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded mr-2">
              Confirmar
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancelar
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        {renderContent()}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ActionModal;
