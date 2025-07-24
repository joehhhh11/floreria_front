import React, { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import Table from "@/components/Panel/Table";
import { IconActions } from "@/components/Panel/IconActions";
import ActionModal from "@/components/Panel/ActionModal";
import productService from "../../service/productService";
import cuponService from "../../service/cuponService";
function Cupones() {
  const [cupones, setCupones] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarActionModal, setMostrarActionModal] = useState(false);
  const [cuponEditando, setCuponEditando] = useState(null);
  const [cuponSeleccionado, setCuponSeleccionado] = useState(null);
  const [modoModal, setModoModal] = useState("view");

  const [formData, setFormData] = useState({
    codigo: "",
    descuentoPorcentaje: "",
    fechaExpiracion: "",
    active: true,
  });

  const getCupones = async () => {
    const cupones = await productService.getCupones();
    setCupones(cupones);
  };

  useEffect(() => {
    getCupones();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const abrirModal = (cupon = null) => {
    if (cupon) {
      setCuponEditando(cupon);
      setFormData({
        codigo: cupon.codigo,
        descuentoPorcentaje: cupon.descuentoPorcentaje.toString(),
        fechaExpiracion: cupon.fechaExpiracion
          ? new Date(cupon.fechaExpiracion).toISOString().slice(0, 16)
          : "",
        active: cupon.active,
      });
    } else {
      setCuponEditando(null);
      setFormData({
        codigo: "",
        descuentoPorcentaje: "",
        fechaExpiracion: "",
        active: true,
      });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCuponEditando(null);
  };

  const guardarCupon = async () => {
    if (!formData.codigo || !formData.descuentoPorcentaje) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (
      formData.descuentoPorcentaje < 1 ||
      formData.descuentoPorcentaje > 100
    ) {
      alert("El descuento debe estar entre 1% y 100%");
      return;
    }

    const cuponData = {
      codigo: formData.codigo.toUpperCase(),
      descuentoPorcentaje: parseInt(formData.descuentoPorcentaje),
      fechaExpiracion: formData.fechaExpiracion || null,
      active: formData.active,
      fechaCreacion: cuponEditando
        ? cuponEditando.fechaCreacion
        : new Date().toISOString(),
    };

    try {
      await cuponService.createCupon(cuponData);
      await getCupones();
      cerrarModal();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el cupón.");
    }
    cerrarModal();
  };

const eliminarCupon = async (cupon) => {
  try {
    await cuponService.deleteCupon(cupon.codigo); 
    await getCupones(); 
    setMostrarActionModal(false); 
  } catch (err) {
    console.error(err);
    alert("Error al eliminar el cupón.");
  }
};


  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "Sin límite";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const estaExpirado = (fechaExpiracion) => {
    if (!fechaExpiracion) return false;
    return new Date(fechaExpiracion) < new Date();
  };

  const handleDelete = (cupon) => {
    setCuponSeleccionado(cupon);
    setModoModal("delete");
    setMostrarActionModal(true);
  };

  const handleConfirmDelete = () => {
    if (cuponSeleccionado) {
      eliminarCupon(cuponSeleccionado);
    }
  };
  const handleConfirmToggleActivo = async () => {
  if (!cuponSeleccionado) return;
  try {
    const actualizado = {
      ...cuponSeleccionado,
      active: !cuponSeleccionado.active,
    };
    await cuponService.updateCupon(cuponSeleccionado.codigo, actualizado);
    await getCupones();
    setMostrarActionModal(false);
  } catch (err) {
    console.error(err);
    alert("Error al actualizar el estado del cupón.");
  }
};


  const columns = useMemo(
    () => [
      {
        accessorKey: "codigo",
        header: "Código",
        cell: ({ row }) => (
          <div className="font-medium text-gray-900">{row.original.codigo}</div>
        ),
      },
      {
        accessorKey: "descuentoPorcentaje",
        header: "Descuento",
        cell: ({ row }) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {row.original.descuentoPorcentaje}%
          </span>
        ),
      },
      {
        accessorKey: "fechaCreacion",
        header: "Creación",
        cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {formatearFecha(row.original.fechaCreacion)}
          </div>
        ),
      },
      {
        accessorKey: "fechaExpiracion",
        header: "Expiración",
        cell: ({ row }) => (
          <div
            className={`text-sm ${
              estaExpirado(row.original.fechaExpiracion) &&
              row.original.fechaExpiracion
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {formatearFecha(row.original.fechaExpiracion)}
          </div>
        ),
      },
      {
        accessorKey: "active",
        header: "Estado",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
  setCuponSeleccionado(row.original);
  setModoModal("toggleActivo");
  setMostrarActionModal(true);
}}

              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                row.original.active
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              }`}
            >
              {row.original.active ? "Activo" : "Inactivo"}
            </button>
            {estaExpirado(row.original.fechaExpiracion) &&
              row.original.fechaExpiracion && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Expirado
                </span>
              )}
          </div>
        ),
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
          <IconActions
            onDelete={() => handleDelete(row.original)}
            show={{ delete: true }}
          />
        ),
      },
    ],
    []
  );

  const renderActionModalContent = () => {
    if (!cuponSeleccionado) return null;

    switch (modoModal) {
        case "toggleActivo":
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">
        {cuponSeleccionado.active ? "Desactivar" : "Activar"} Cupón
      </h3>
      <p className="text-sm mb-4">
        ¿Estás seguro que deseas {cuponSeleccionado.active ? "desactivar" : "activar"} el cupón "
        {cuponSeleccionado.codigo}"?
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleConfirmToggleActivo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirmar
        </button>
        <button
          onClick={() => setMostrarActionModal(false)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );

      case "delete":
        return (
          <div>
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Eliminar Cupón
            </h3>
            <p className="text-sm mb-4">
              ¿Estás seguro de que deseas eliminar el cupón "
              {cuponSeleccionado.codigo}"?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirmar
              </button>
              <button
                onClick={() => setMostrarActionModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Cupones
          </h1>
          <p className="text-gray-600">
            Administra los cupones de descuento de tu tienda
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => abrirModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Crear Cupón
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Table columns={columns} data={cupones} />
        </div>
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {cuponEditando ? "Editar Cupón" : "Crear Nuevo Cupón"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código del cupón *
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleInputChange}
                    placeholder="ej: DESCUENTO20"
                    maxLength={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    style={{ textTransform: "uppercase" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descuento (%) *
                  </label>
                  <input
                    type="number"
                    name="descuentoPorcentaje"
                    value={formData.descuentoPorcentaje}
                    onChange={handleInputChange}
                    placeholder="20"
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Valor entre 1% y 100%
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de expiración
                  </label>
                  <input
                    type="datetime-local"
                    name="fechaExpiracion"
                    value={formData.fechaExpiracion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dejar vacío para que no expire
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="active"
                    id="active"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        active: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="active"
                    className="text-sm font-medium text-gray-700"
                  >
                    Cupón activo
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={cerrarModal}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={guardarCupon}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {cuponEditando ? "Actualizar" : "Crear"} Cupón
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        style={{ display: mostrarActionModal ? "flex" : "none" }}
      >
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
          {renderActionModalContent()}
          <button
            onClick={() => setMostrarActionModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cupones;
