import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Table from "@/components/Panel/Table";
import productService from "@/service/productService";
import useAuthStore from "@/store/authStore";
import axios from "axios";

const Products = () => {
  const token = useAuthStore((state) => state.token);
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

const handleImportExcel = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/products/import",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Archivo importado correctamente");
    window.location.reload(); 
  } catch (err) {
    console.error("Error al importar productos:", err);
    alert("Error al importar archivo: " + err.message);
  }
};
  if (loading) return <div className="p-6">Cargando productos...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>

        <label className="cursor-pointer bg-flor-1 text-white px-4 py-2 rounded hover:bg-flor-2 transition-all">
          Importar Excel
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImportExcel}
            className="hidden"
          />
        </label>
      </div>

      <Table columns={columns} data={products} />
    </div>
  );
};

export default Products;
