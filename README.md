# [TARGUS – Plataforma de Juegos Cognitivos](https://targus-app.onrender.com/home)

#### Arduino Marcos – Cativa Rodrigo – Silva Benjamín – Vargas Lucas
#### ET 36 DE 15 “Alte Guillermo Brown”
#### Proyecto Informático II
#### Buenos Aires, Argentina

## Descripción del Proyecto
TARGUS es una plataforma web desarrollada para ofrecer una experiencia de entretenimiento orientada al desarrollo cognitivo.
A diferencia de los juegos tradicionales, que solo se centran en la diversión, TARGUS permite ejercitar la memoria, la lógica, la velocidad mental y la deducción mediante una serie de desafíos y actividades interactivas.

La aplicación incluye registro e inicio de sesión, personalización de avatar, sistema de monedas, juegos diarios y configuraciones ajustables, buscando una experiencia dinámica y accesible para los usuarios.

## ¿Cómo surge la idea del proyecto?

Se observó que muchos estudiantes buscan opciones para entrenar su mente mientras se divierten, pero la mayoría de las aplicaciones disponibles son simples, repetitivas o no ofrecen progresión.
Por este motivo, se decidió desarrollar una plataforma propia que combinara entretenimiento, desafío mental y una interfaz moderna accesible para diferentes usuarios y dispositivos.


# Guía de instalación y ejecución local
## Requisitos
- Node.js 18 LTS o superior (recomendado 18.x)
- npm 9+
- PostgreSQL (local o gestionado)

## Estructura del proyecto
- `frontend/` (Vite + React)
- `backend/` (Node + Express + PostgreSQL)
- `render.yaml` (despliegue en Render con Blueprint)

## 1) Clonar el repositorio
```bash
git clone https://github.com/RodrigoCativa3279/TARGUS
cd TARGUS
```

## 2) Variables de entorno (backend/.env)
Crea un archivo `backend/.env` con, por ejemplo:
```
JWT_SECRET=tu_secreto_seguro
DATABASE_URL=postgres://usuario:password@host:5432/base

# Opcional: si servís el frontend por separado
FRONTEND_URL=http://localhost:5173
```
Notas:
- Para PostgreSQL local podrías usar: `postgres://postgres:postgres@localhost:5432/targus`.
- En Render, `DATABASE_URL` la inyecta el servicio. No subas `.env` a Git.

## 3) Instalar dependencias y build del frontend
Terminal 1 (frontend):
```bash
cd frontend
npm ci
npm run build
```

## 4) Instalar dependencias del backend
Terminal 2 (backend):
```bash
cd backend
npm ci
```

## 5) Preparar la base de datos
- Crea la base y la tabla `usuario` con las columnas usadas por las rutas (`/api/auth`).
- Podés ejecutar un script SQL desde pgAdmin/psql.

## 6) Ejecutar localmente
Levantar el backend (sirve también el frontend compilado en `frontend/dist`):
```bash
cd backend
node server.js
```

Abrir en el navegador:
- App: `http://localhost:3001/`
- Health: `http://localhost:3001/healthz`

Modo desarrollo de frontend (opcional, con HMR):
```bash
cd frontend
npm run dev
```
Las llamadas del frontend usan rutas relativas `/api/...`, y el backend permite CORS para `localhost` y `*.onrender.com`.

## 7) Despliegue en Render (Blueprint)
1. Subí el repo a GitHub.
2. Render → New → Blueprint → seleccioná el repo.
3. Verificá recursos detectados por `render.yaml`:
   - Web Service: `targus-app`
   - Database: `targus-db`
4. Variables (en el servicio web):
   - `NODE_VERSION=18` (ya en yaml)
   - `JWT_SECRET` (Render la genera)
   - `DATABASE_URL` (enlazada a `targus-db`)
   - `FRONTEND_URL` (opcional)
5. Deploy y verificá `https://<tu-app>.onrender.com/healthz`.

## 8) Troubleshooting
- CORS: si usás otro dominio, seteá `FRONTEND_URL`.
- DB: el backend habilita SSL automáticamente si el host no es `localhost`.
- Si ves 404 del frontend, asegurate de haber corrido `npm run build` en `frontend/`.


## Lista de Requerimientos
### Requerimientos funcionales
- Registro e inicio de sesión de usuarios.✔️
- Gestión de usuarios, juegos, puntuaciones y configuraciones.✔️
- Menú general de juegos y menú lateral durante la partida.✔️
- Sistema de estadísticas y logros.❌
- Sistema de puntuaciones️️.✔️
- Juego del día / desafío diario con recompensa especial.❌
- Modos contrarreloj en juegos compatibles.✔️
- Creación de avatar personalizable.✔️
- Modo oscuro con guardado automático.❌
- Sistema de monedas para comprar comodines.❌
- Música ambiental configurable.❌
- Compartir resultados en redes sociales.❌
- Sistema multilenguaje.✔️
- Foro comunitario para interacción entre usuarios.❌
- Roles: usuario común y administrador (gestión completa del contenido).✔️

### Requerimientos no funcionales
- Tiempo de respuesta menor a 1 segundo.✔️
- Carga inicial completa en menos de 4 segundos.✔️
- Interfaz intuitiva y accesible para todas las edades.✔️
- Diseño responsive para celular, tablet y PC.✔️
- Seguridad en el almacenamiento de datos personales.✔️
- Disponibilidad 24/7.✔️
- Arquitectura escalable para soportar más usuarios y nuevos juegos.✔️

