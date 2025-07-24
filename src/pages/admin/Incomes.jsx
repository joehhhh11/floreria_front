import React,   { useState, useEffect } from "react";
import Table from "@/components/Panel/Table";
import orderService from "@/service/orderService";

function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await orderService.getAllOrders();
        setIncomes(orders.map(mapOrderToIncome));   
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const columns = [
    { accessorKey: "customer", header: "Cliente" },
    { accessorKey: "amount",   header: "Monto ($)" },
    { accessorKey: "date",     header: "Fecha" },
    { accessorKey: "method",   header: "Método de Pago" },

  ];
  if (loading) return <p className="p-6">Cargando ingresos…</p>;
  if (error)   return <p className="p-6 text-red-600">Error: {error.message}</p>;

  const total = incomes.reduce((s, i) => s + (Number(i.amount) || 0), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ingresos</h1>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Ingresos</h2>
          <p className="text-3xl font-bold">
            ${total.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Transacciones</h2>
          <p className="text-3xl font-bold">{incomes.length}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <Table columns={columns} data={incomes} />
      </div>
    </div>
  );
};
const mapOrderToIncome = (o) => ({
  id:       o.id,
  customer: `${o.user?.nombre ?? ""} ${o.user?.apellido ?? ""}`.trim(),
  amount:   o.totalFinal,
  date:     o.fechaCreacion.slice(0, 10),
  method:   o.tipoPago ?? "—",
});
export default Incomes;
