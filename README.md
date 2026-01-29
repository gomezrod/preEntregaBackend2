# E-commerce Backend - 1° Pre-entrega (Módulo 2)

Este proyecto marca el inicio del segundo módulo del curso de **Programación Backend en Node.js** de **Coderhouse**. El enfoque principal de esta entrega es la implementación de un sistema de gestión de usuarios robusto, integrando autenticación, autorización y seguridad avanzada.

## 🎯 Objetivos de la Entrega

Implementar un CRUD de usuarios completo, junto con un sistema de Autenticación y Autorización utilizando estándares de la industria como **JWT** y **Passport**.

## 🚀 Características Implementadas

### 1. Modelo de Usuario (User Model)

Se definió un esquema de Mongoose para usuarios con los siguientes campos:

* `first_name`, `last_name`, `email` (único), `age`.
* `password`: Almacenada de forma segura mediante **hashing**.
* `cart`: Referencia al modelo de Carts para vinculación automática.
* `role`: Control de acceso (por defecto: 'user').

### 2. Seguridad y Encriptación

* **Bcrypt:** Implementación de `hashSync` para asegurar que las contraseñas nunca se almacenen en texto plano.
* **JWT (JSON Web Tokens):** Generación de tokens para mantener sesiones de usuario de forma stateless y segura.

### 3. Autenticación con Passport

Se configuraron estrategias de **Passport** para manejar:

* Registro e inicio de sesión.
* Extracción y validación de tokens JWT desde las cookies o headers.

## 📂 Estructura del Proyecto

```text
src/
├── config/             # Configuración de Passport y variables de entorno
├── dao/                # Modelos de Mongoose (User, Products, Carts)
├── routes/             # Endpoints (incluye el nuevo sessions.router.js)
├── utils/              # Funciones de bcrypt (createHash, isValidPassword)
└── app.js              # Servidor y middleware de Passport

```

## 📑 Nuevos Endpoints: Sessions (`/api/sessions`)

| Método | Ruta | Descripción |
| --- | --- | --- |
| **POST** | `/register` | Registra un nuevo usuario con contraseña encriptada. |
| **POST** | `/login` | Autentica al usuario y genera un token JWT. |
| **GET** | `/current` | **Estrategia Current:** Valida el JWT actual y devuelve los datos del usuario logueado (protegido por Passport). |

## 🛠️ Tecnologías Utilizadas

* **Node.js & Express**
* **MongoDB Atlas & Mongoose**
* **Passport & Passport-JWT**
* **Bcrypt**
* **JSON Web Token**

---

## ✅ Criterios de Aceptación Cumplidos

* [x] **Encriptación:** Uso de bcrypt para el resguardo de credenciales.
* [x] **Estrategia "Current":** Endpoint funcional que extrae el usuario asociado al token de manera efectiva.
* [x] **Validación Precisa:** Si el token es inválido o inexistente, Passport devuelve un error de autenticación apropiado.
* [x] **Asociación de Carrito:** Cada usuario creado cuenta con una referencia a un carrito de compras.

---

# Proyecto base: E-commerce Backend

El objetivo principal es la implementación de un sistema de persistencia sólido utilizando **MongoDB** y **Mongoose**, integrando operaciones de paginación, filtrado y ordenamiento en el catálogo de productos.

## 🚀 Características

* **Persistencia de Datos:** Uso de MongoDB Atlas mediante Mongoose.
* **Gestión de Productos:** API completa para crear, leer, actualizar y eliminar productos.
* **Carrito de Compras:** Sistema de carritos con persistencia y gestión de productos integrados.
* **Paginación Avanzada:** Implementación de `mongoose-paginate-v2` para consultas eficientes en `/api/products`.
* **Motor de Plantillas:** Vistas dinámicas renderizadas con **Handlebars**.
* **Websockets:** Actualización en tiempo real para la lista de productos (vía `/realtimeproducts`).

## 🛠️ Tecnologías Utilizadas

* **Node.js** & **Express**
* **MongoDB** & **Mongoose**
* **Handlebars** (Motor de plantillas)
* **Socket.io** (Comunicación en tiempo real)
* **Dotenv** (Gestión de variables de entorno)

## 📂 Estructura del Proyecto

```text
src/
├── dao/                # Data Access Object (Mongoose models & Managers)
├── public/             # Archivos estáticos (JS cliente, CSS)
├── routes/             # Definición de endpoints (products, carts, views)
├── views/              # Plantillas Handlebars (.handlebars)
├── app.js              # Punto de entrada del servidor
└── db/                 # Configuración de conexión a MongoDB

```

## ⚙️ Configuración e Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/gomezrod/preEntregaBackend2.git
cd preEntregaBackend2

```


2. **Instalar dependencias:**
```bash
npm install

```


3. **Variables de Entorno:**
Crea un archivo `.env` en la raíz del proyecto y configura tu URI de MongoDB Atlas:
```env
PORT=8080
MONGO_URL=tu_cadena_de_conexion_mongodb

```


4. **Ejecutar el servidor:**
* Modo desarrollo: `npm run dev`
* Modo producción: `npm start`



## 📑 Endpoints Principales

### Productos (`/api/products`)

* `GET /`: Lista productos con soporte para:
* `limit`: Cantidad de resultados (default 10).
* `page`: Número de página.
* `sort`: Ordenamiento por precio (`asc`/`desc`).
* `query`: Filtrado por categoría o disponibilidad.


* `GET /:pid`: Obtiene un producto por ID.
* `POST /`: Agrega un nuevo producto.
* `PUT /:pid`: Actualiza un producto existente.
* `DELETE /:pid`: Elimina un producto.

### Carritos (`/api/carts`)

* `POST /`: Crea un nuevo carrito.
* `GET /:cid`: Lista los productos de un carrito (con **populate** para ver detalles).
* `POST /:cid/product/:pid`: Agrega un producto al carrito.
* `DELETE /:cid/products/:pid`: Elimina un producto específico del carrito.
* `PUT /:cid`: Actualiza el carrito con un arreglo de productos.
* `PUT /:cid/products/:pid`: Actualiza la cantidad de un producto.
* `DELETE /:cid`: Elimina todos los productos del carrito.

### Vistas (`/`)

* `/products`: Visualización de productos con paginación amigable.
* `/carts/:cid`: Vista detallada de un carrito específico.
* `/realtimeproducts`: Listado de productos con actualización automática vía Sockets.

---

**Autor:** [gomezrod](https://www.google.com/search?q=https://github.com/gomezrod)

**Curso:** Programación Backend - Coderhouse