# Documentación del Frontend

##  Introducción

Este módulo corresponde al **frontend** del sistema web desarrollado con **React.js**. Se encarga de la interfaz gráfica y la interacción del usuario con el sistema. Está estructurado siguiendo el patrón **MVC**, los principios **SOLID** y la implementación del patrón **DAO** para el manejo de servicios.

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

##  Estructura del Proyecto

```plaintext
src/
├── assets/        → Imágenes, íconos, estilos globales
├── components/    → Componentes reutilizables (botones, tablas, etc.)
├── hooks/         → Hooks personalizados para lógica compartida
├── layout/        → Componentes de diseño general (Sidebar, Header)
├── pages/         → Páginas principales del sistema (vistas)
├── service/       → Acceso a datos (DAO)
├── store/         → Manejo de estado global (Zustand o Redux)
├── App.jsx        → Componente principal y definición de rutas
├── main.jsx       → Punto de entrada de React
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# floreria_front" 
