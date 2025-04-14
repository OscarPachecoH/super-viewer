# superviewer

Este es un proyecto en desarrollo que busca ser una extensión para supervisión, enfocado hacia los clientes de una empresa, y que permite detallar los procesos que se llevan a cabo mediante gráficas y reportes, mejorando la relación entre cliente y empresa.

El proyecto se divide en dos secciones, API y Cliente (interfaz), por lo que necesitarás ambas carpetas para el funcionamiento del proyecto.

Actualmente el proyecto está en etapa inicial, por lo que, algunas funciones son limitadas o se encuentran en procesos de implementación.

## Estado actual

- Inicio de sesión seguro.
- Dashboard personalizado para cliente.

**Nota: El proyecto puede contener errores o puede tener funciones incompletas**

## Funciones planeadas

Las funciones que se planean agregar en un futuro son:
- Gestión de perfil de usuario.
- Lista de proyectos del cliente.
- Creación de reportes en formato PDF.
- Creación de bitácora de avance en formato PDF.
- Gráficas de progresos del proyecto.

## Estructura
- `/api`: Backend de la aplicación (Node, Express).
- `/client`: Frontend de la aplicación (React).

## Requisitos
- Node 23.5.0.
- Servidor de base de datos (XAMPP, WAMP).
- Navegador web moderno (Chrome, Firefox, Edge, etc.).

## Uso
1. Clona el repositorio.
2. Importa el archivo SQL `superviewer.sql` en tu gestor de base de datos o crea las tablas según el esquema proporcionado.
3. Ejecutar, en cada carpeta, el comando `npm install`.
4. Ejecutar la API, `/api`, con el comando `npm run dev` y para el cliente, `/client`, `npm start`, este último abrirá una pestaña en tu navegador.