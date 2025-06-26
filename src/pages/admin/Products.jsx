import React, { useEffect, useState } from "react";
import Table from "@/components/Panel/Table";
import { fetchProducts } from "@/service/productsApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "price", header: "Precio ($)" },
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

  if (loading) return <div className="p-6">Cargando productos...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <Table columns={columns} data={products} />
    </div>
  );
};

export default Products;
