import React, { useEffect, useState } from "react";
import Table from "@/components/Panel/Table";
import userService from "@/service/userService";

const Users = () => {
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(true); 

	const fetchUsers = async () => {
		try {
			const users = await userService.getAllUsers();
			setUser(users);
		} catch (error) {
			console.error("Error al cargar usuarios:", error);
		} finally {
			setLoading(false); 
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const columns = [
		{ accessorKey: "nombre", header: "Nombre" },
		{ accessorKey: "correo", header: "Email" },
		{
			accessorKey: "rol",
			header: "Rol",
			cell: ({ row }) => (
				<span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
					{row.original.rol}
				</span>
			),
		},
		{
			id: "actions",
			header: "Acciones",
			cell: ({ row }) => (
				<div className="flex gap-2">

					<button
						onClick={() => alert(`Editar usuario ${row.original.name}`)}
						className="text-red-600 hover:underline"
					>
						Eliminar
					</button>
				</div>
			),
		},
	];

	if (loading) {
		return (
			<div className="p-6 text-center">
				<p className="text-lg font-semibold">Cargando usuarios...</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Usuarios</h1>
				<button className="bg-blue-600 text-white px-4 py-2 rounded">
					Agregar Usuario
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div className="bg-white p-4 rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-2">Total Usuarios</h2>
					<p className="text-3xl font-bold">{user.length}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-2">Total Pedidos</h2>
					<p className="text-3xl font-bold">
						{user.reduce((total, u) => total + (u.orders || 0), 0)}
					</p>
				</div>
			</div>

			<div className="bg-white p-4 rounded-lg shadow">
				<Table columns={columns} data={user} />
			</div>
		</div>
	);
};

export default Users;
