import React from "react";
import Table from "@/components/Panel/Table";

const mockUsers = [
	{
		id: 1,
		name: "María González",
		email: "maria.g@example.com",
		role: "Cliente",
		orders: 15,
		lastOrder: "2025-06-10",
	},
	{
		id: 2,
		name: "Juan Pérez",
		email: "juan.p@example.com",
		role: "Cliente",
		orders: 32,
		lastOrder: "2025-06-11",
	},
	{
		id: 3,
		name: "Ana Martínez",
		email: "ana.m@example.com",
		role: "Cliente",
		orders: 8,
		lastOrder: "2025-06-09",
	},
	{
		id: 4,
		name: "Carlos López",
		email: "carlos.l@example.com",
		role: "Cliente",
		orders: 25,
		lastOrder: "2025-06-12",
	},
	{
		id: 5,
		name: "Laura Torres",
		email: "laura.t@example.com",
		role: "Cliente",
		orders: 12,
		lastOrder: "2025-06-08",
	},
];

const Users = () => {
	const columns = [
		{
			accessorKey: "name",
			header: "Nombre",
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "role",
			header: "Rol",
			cell: ({ row }) => (
				<span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
					{row.original.role}
				</span>
			),
		},
		{
			accessorKey: "orders",
			header: "Pedidos",
		},
		{
			accessorKey: "lastOrder",
			header: "Último Pedido",
		},
		{
			id: "actions",
			header: "Acciones",
			cell: ({ row }) => (
				<div className="flex gap-2">
					<button
						onClick={() => alert(`Ver detalles de ${row.original.name}`)}
						className="text-blue-600 hover:underline"
					>
						Ver
					</button>
					<button
						onClick={() => alert(`Editar usuario ${row.original.name}`)}
						className="text-green-600 hover:underline"
					>
						Editar
					</button>
				</div>
			),
		},
	];

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Usuarios</h1>
				<button className="bg-blue-600 text-white px-4 py-2 rounded">
					Agregar Usuario
				</button>
			</div>

			{/* Estadísticas de usuarios */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div className="bg-white p-4 rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-2">Total Usuarios</h2>
					<p className="text-3xl font-bold">{mockUsers.length}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h2 className="text-lg font-semibold mb-2">Total Pedidos</h2>
					<p className="text-3xl font-bold">
						{mockUsers.reduce((total, user) => total + user.orders, 0)}
					</p>
				</div>
			</div>

			{/* Tabla de usuarios */}
			<div className="bg-white p-4 rounded-lg shadow">
				<Table columns={columns} data={mockUsers} />
			</div>
		</div>
	);
};

export default Users;