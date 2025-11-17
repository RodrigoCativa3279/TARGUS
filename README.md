# [TARGUS](https://targus-app.onrender.com/home)
**Arduino Marcos**

**Cativa Rodrigo**

**Silva Benjamín**

**Vargas Lucas**

**Profesor**: Jackson Daniel Calderon Vargas

**Materia**: Desarrollo de Sistemas

**Proyecto Integrador – 2025**

## Guía de instalación y ejecución local

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


## Descripción del proyecto

TARGUS es una aplicación web diseñada para combinar entretenimiento y aprendizaje mediante juegos de lógica, deducción y memoria. La plataforma busca ofrecer una experiencia divertida pero también educativa, donde cada usuario pueda desarrollar sus habilidades cognitivas mientras disfruta de distintos desafíos interactivos.

## ¿Cómo surge la idea o necesidad del proyecto?

La idea surge al observar que la mayoría de los juegos en la web y en dispositivos móviles están orientados únicamente al ocio. En un contexto donde la estimulación mental es cada vez más necesaria, TARGUS propone una alternativa que fusione diversión, entrenamiento cerebral y progreso personal.
Además, muchas apps similares se centran en un solo tipo de juego y carecen de interacción social. TARGUS busca cubrir ese vacío ofreciendo variedad, personalización y herramientas comunitarias.

## Objetivo

Desarrollar una aplicación web multifuncional que permita a los usuarios jugar diversos juegos de deducción y habilidad mental, con sistemas de puntuación, recompensas, personalización de avatar, desafíos diarios y un foro comunitario. El sistema gestionará perfiles, estadísticas, misiones y configuraciones personales, todo dentro de una experiencia intuitiva, rápida y amigable.

## Lista de Requerimientos
### Requerimientos funcionales
- Registro e inicio de sesión de usuarios.
- Gestión de usuarios, juegos, puntuaciones, monedas y configuraciones.
- Menú general de juegos y menú lateral durante la partida.
- Sistema de puntuaciones, estadísticas y logros.
- Juego del día / desafío diario con recompensa especial.
- Modos contrarreloj en juegos compatibles.
- Creación de avatar personalizable (cara, ropa, colores, accesorios).
- Modo oscuro con guardado automático.
- Sistema de monedas para comprar comodines.
- Música ambiental configurable.
- Compartir resultados en redes sociales.
- Sistema multilenguaje.
- Foro comunitario para interacción entre usuarios.
- Roles: usuario común y administrador (gestión completa del contenido).

### Requerimientos no funcionales
- Tiempo de respuesta menor a 1 segundo.
- Carga inicial completa en menos de 4 segundos.
- Interfaz intuitiva y accesible para todas las edades.
- Diseño responsive para celular, tablet y PC.
- Seguridad en el almacenamiento de datos personales.
- Disponibilidad 24/7.
- Arquitectura escalable para soportar más usuarios y nuevos juegos.

## Tecnologías utilizadas
- Frontend: React + Vite
- Estilos: TailwindCSS o CSS Modules
- Internacionalización: i18next
- Backend: Node.js + Express
- Base de datos: MongoDB o Firebase Firestore
- Control de versiones: Git + GitHub
- Pruebas de API: Postman
- IDE: Visual Studio Code
- Otras: APIs externas (a definir según juego)
