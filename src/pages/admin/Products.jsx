import React, { useEffect, useState } from "react";
import Table from "@/components/Panel/Table";
import productService from "@/service/productService";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  const columns = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "description", header: "Descripción" },
    { accessorKey: "destacado", header: "Destacado" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "categoria.nombre", header: "Categoria" },
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
