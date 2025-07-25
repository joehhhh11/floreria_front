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
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
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
      fetchProducts();
    } catch (err) {
      console.error("Error al importar productos:", err);
      alert("Error al importar archivo: " + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await productService.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert("Error al eliminar producto: " + err.message);
    }
  };

const handleSaveEdit = async () => {
  if (!editProduct?.id) {
    alert("El producto no tiene ID. No se puede actualizar.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("price", editProduct.price);
    formData.append("stock", editProduct.stock);
    formData.append("categoriaId", editProduct.categoriaId || 1); // Asegúrate que no sea null


    await axios.put(
      `http://localhost:8080/api/products/${editProduct.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditProduct(null);
    fetchProducts();
  } catch (err) {
    alert("Error al actualizar producto: " + err.message);
    console.error(err);
  }
};


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
        <div className="flex gap-4">
          <button
            onClick={() => setEditProduct({ ...row.original })}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => handleDeleteProduct(row.original.id)}
            className="text-red-600 hover:underline"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

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

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

            <input type="hidden" value={editProduct.id || ""} />

            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </label>

            <label className="block mb-2">
              Descripción:
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </label>

            <label className="block mb-2">
              Stock:
              <input
                type="number"
                className="w-full border p-2 rounded mt-1"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct((prev) => ({
                    ...prev,
                    stock: parseInt(e.target.value),
                  }))
                }
              />
            </label>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
