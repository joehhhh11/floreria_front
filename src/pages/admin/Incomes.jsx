import React from "react";
import Table from "@/components/Panel/Table";

const mockIncomes = [
  {
    id: 1,
    customer: "María González",
    amount: 120.0,
    date: "2025-06-10",
    method: "Tarjeta",
  },
  {
    id: 2,
    customer: "Juan Pérez",
    amount: 85.5,
    date: "2025-06-11",
    method: "Efectivo",
  },
  {
    id: 3,
    customer: "Ana Martínez",
    amount: 99.99,
    date: "2025-06-09",
    method: "PayPal",
  },
  {
    id: 4,
    customer: "Carlos López",
    amount: 45.75,
    date: "2025-06-12",
    method: "Transferencia",
  },
  {
    id: 5,
    customer: "Laura Torres",
    amount: 200.0,
    date: "2025-06-08",
    method: "Tarjeta",
  },
];

const Incomes = () => {
  const columns = [
    {
      accessorKey: "customer",
      header: "Cliente",
    },
    {
      accessorKey: "amount",
      header: "Monto ($)",
    },
    {
      accessorKey: "date",
      header: "Fecha",
    },
    {
      accessorKey: "method",
      header: "Método de Pago",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <button
          onClick={() => alert(`Ver ingreso de ${row.original.customer}`)}
          className="text-blue-600 hover:underline"
        >
          Ver
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ingresos</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Imprimir reporte
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Ingresos</h2>
          <p className="text-3xl font-bold">
            ${mockIncomes.reduce((acc, income) => acc + income.amount, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Transacciones</h2>
          <p className="text-3xl font-bold">{mockIncomes.length}</p>
        </div>
      </div>

      {/* Tabla de ingresos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <Table columns={columns} data={mockIncomes} />
      </div>
    </div>
  );
};

export default Incomes;
