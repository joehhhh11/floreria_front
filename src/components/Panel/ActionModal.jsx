import React from "react";
import Table from "@/components/Panel/Table";
const ActionModal = ({ isOpen, onClose, data, mode, products }) => {
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
          <>
            <div>
              <h3>Detalle del Pedido</h3>
              <Table columns={columns} data={products} />
            </div>
          </>
        );
      case "edit":
        return (
          <>
            <h3 className="text-lg font-bold mb-4">Editar Pedido</h3>
            <p className="text-sm mb-4 text-gray-700">
              Aquí iría un formulario editable (puedes adaptarlo).
            </p>
            <pre className="text-xs bg-gray-100 p-2 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              Guardar cambios
            </button>
          </>
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
      <div className="bg-white p-6 rounded opacity- shadow-lg max-w-md w-full relative">
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
