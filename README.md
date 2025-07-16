# 🎯 Frontend - Sistema de Gestión de Incidencias UTP SJL

Este es el frontend del sistema de gestión de incidencias de la sede **UTP San Juan de Lurigancho**, desarrollado con React y Vite. Consume las APIs del backend (Spring Boot) para gestionar autenticación, usuarios y registros de incidencias.

---

##  Tecnologías Utilizadas

| Herramienta       | Versión | Uso Principal                         |
|-------------------|---------|----------------------------------------|
| React.js          | 18.x    | Librería principal del frontend        |
| Vite              | ^5.x    | Empaquetador y entorno de desarrollo   |
| Tailwind CSS      | ^3.x    | Diseño responsivo con utilidades       |
| React Router DOM  | ^6.x    | Enrutamiento de páginas                |
| HeroIcons         | SVG     | Iconos estilizados                     |
| Zustand / Redux   | Opcional| Manejo de estado global                |

---

## 📥 Requisitos Previos

- Node.js >= 18  
  👉 [Descargar Node.js](https://nodejs.org/en/download)

Verifica instalación:

```bash
node -v
npm -v
```

---

## ⚙️ Instalación del Proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/incidencias-utp-frontend.git
cd incidencias-utp-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en entorno local:

```bash
npm run dev
```

---

## 🌐 Configuración del entorno (`.env`)

Crea un archivo `.env` en la raíz del proyecto con lo siguiente:

```env
VITE_API_URL=http://localhost:8080/api
```

Asegúrate de que `VITE_API_URL` apunte a la URL donde se está ejecutando el backend.

---

## 📁 Estructura del Proyecto (Frontend)

```
src/
├── assets/           # Imágenes y recursos
├── components/       # Componentes reutilizables
├── pages/            # Vistas por ruta
├── store/            # Estado global con Zustand
├── services/         # Llamadas API con Axios
├── App.jsx
└── main.jsx
```

---

## 🌐 Comunicación con el Backend (Axios)

En `services/api.js` se configura Axios:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 💾 Manejo de Estado con Zustand

Ejemplo básico de store en `store/userStore.js`:

```js
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

---

## 🎨 Estilos con Tailwind

Tailwind está configurado vía `tailwind.config.js`.  
Ejemplo de uso:

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Enviar
</button>
```

---

## ✅ Funcionalidades Implementadas

- Inicio de sesión con JWT
- Registro y listado de incidencias
- Roles: usuario, técnico, administrador
- Navegación protegida según autenticación
- UI responsiva con Tailwind

---

## 📦 Empaquetado para Producción

```bash
npm run build
```

Esto generará los archivos listos para producción en la carpeta `dist/`.

Para previsualizar localmente el build:

```bash
npm run preview
```

---

## 🧩 Conexión con Backend

Asegúrate de tener el backend corriendo (Spring Boot).  
Todas las peticiones se envían a:

```
http://localhost:8080/api/
```

Endpoints esperados:

- `/auth/login`
- `/incidencias`
- `/usuarios`
- etc.

---

