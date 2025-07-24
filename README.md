# 🐾 Backend para Gestión de Adopciones - CDBackend3

Este es un backend desarrollado en **Node.js** y **Express**, que proporciona una API RESTful para gestionar usuarios, mascotas y adopciones. Además, incluye rutas para autenticación y generación de datos de prueba (mock).

La imagen de Docker está disponible aquí:  
👉 [https://hub.docker.com/r/miguevivs/backen3](https://hub.docker.com/r/miguevivs/backen3)

El código fuente está en GitHub:  
👉 [https://github.com/MigueVivas/CDBackend3](https://github.com/MigueVivas/CDBackend3)

---

## 🚀 Ejecutar el contenedor desde Docker Hub

### Paso 1: Ejecutar con Docker

```bash
docker run -p 8080:8080 miguevivs/backen3
```

> La aplicación se levantará en `http://localhost:8080`.

---

## 📁 Estructura y rutas

El archivo principal es `app.js`, donde se configuran los middlewares y se registran las rutas:

```js
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
```

---

## 📡 Endpoints disponibles

### 🔐 Autenticación (`/api/sessions`)

| Método | Ruta                   | Descripción                          |
|--------|------------------------|--------------------------------------|
| POST   | `/register`            | Registro de nuevo usuario            |
| POST   | `/login`               | Inicio de sesión                     |
| GET    | `/current`             | Usuario autenticado actual           |
| GET    | `/unprotectedLogin`    | Login sin autenticación (testing)    |
| GET    | `/unprotectedCurrent`  | Usuario actual sin autenticación     |

---

### 👤 Usuarios (`/api/users`)

| Método | Ruta           | Descripción                     |
|--------|----------------|---------------------------------|
| GET    | `/`            | Obtener todos los usuarios      |
| GET    | `/:uid`        | Obtener un usuario por ID       |
| PUT    | `/:uid`        | Actualizar un usuario por ID    |
| DELETE | `/:uid`        | Eliminar un usuario por ID      |

---

### 🐶 Mascotas (`/api/pets`)

| Método | Ruta              | Descripción                             |
|--------|-------------------|-----------------------------------------|
| GET    | `/`               | Obtener todas las mascotas              |
| POST   | `/`               | Crear una nueva mascota                 |
| POST   | `/withimage`      | Crear mascota con imagen (form-data)    |
| PUT    | `/:pid`           | Actualizar una mascota por ID           |
| DELETE | `/:pid`           | Eliminar una mascota por ID             |

---

### ❤️ Adopciones (`/api/adoptions`)

| Método | Ruta                | Descripción                              |
|--------|---------------------|------------------------------------------|
| GET    | `/`                 | Obtener todas las adopciones             |
| GET    | `/:aid`             | Obtener una adopción específica          |
| POST   | `/:uid/:pid`        | Crear una adopción (usuario + mascota)   |

---

### 🧪 Datos de prueba (`/api/mocks`)

| Método | Ruta                   | Descripción                                          |
|--------|------------------------|------------------------------------------------------|
| GET    | `/mockingusers`        | Genera y devuelve 50 usuarios simulados             |
| GET    | `/mockinpets`          | Genera y devuelve 50 mascotas simuladas             |
| POST   | `/generateData`        | Guarda usuarios y mascotas mock en memoria          |
|        | Body JSON: `{ "users": 10, "pets": 10 }`                                      |

---

## 🧰 Tecnologías usadas

- Node.js
- Express.js
- Multer (para subir imágenes)
- Docker

---

## 🛠 Repositorio del proyecto

📦 GitHub: [https://github.com/MigueVivas/CDBackend3](https://github.com/MigueVivas/CDBackend3)

🐳 Docker Hub: [https://hub.docker.com/r/miguevivs/backen3](https://hub.docker.com/r/miguevivs/backen3)

---

## 👤 Autor

**Miguel Vivas**  