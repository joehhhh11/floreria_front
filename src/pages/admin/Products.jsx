import React from "react";
import Table from "@/components/Panel/Table";

const mockProducts = [
  { id: 1, name: "Ramo de rosas", price: 35 },
  { id: 2, name: "Lirios blancos", price: 45 },
  { id: 3, name: "Tulipanes", price: 40 },
  { id: 4, name: "Margaritas", price: 30 },
  { id: 5, name: "Girasoles", price: 25 },
  { id: 6, name: "Orquídeas", price: 50 },
  { id: 7, name: "Claveles", price: 20 },
  // ... más productos
];

const Products = () => {
  // Define las columnas para la tabla
  const columns = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "price",
      header: "Precio ($)",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <button
          onClick={() => alert(`Editar producto ID ${row.original.id}`)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <Table columns={columns} data={mockProducts} />
    </div>
  );
};

export default Products;
