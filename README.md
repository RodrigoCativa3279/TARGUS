# [TARGUS](https://targus-app.onrender.com/home)

## Guía de Instalación para uso Local

Para clonar el repositorio en tu computadora:
* git clone https://github.com/RodrigoCativa3279/TARGUS

---

Para la Base de Datos:

Conectarte desde pgAdmin a Render (recomendado)

🔹 Paso a paso:

1. Abrí pgAdmin

2. En el panel izquierdo → clic derecho en “Servers” → Create > Server

3. Completá los datos así 👇

General:
* Name: RenderDB (o como quieras)
Connection:
* Host name / address: dpg-d46upi1r0fns73bgevr0-a.oregon-postgres.render.com
* Port: 5432
* Maintenance database: targus_db
* Username: targus_db_user
* Password: ccn3NpKQCmdFnPXSybxPIHbTQLIisG6L

⚠️ Marcar la casilla “Save password”

SSL:
* Mode: Require

Luego → “Save”.

✅ Si todo está bien, deberías ver tu base targus_db en el panel izquierdo.

Ahora tenés que copiar las sentencias SQL del arhcivo targus_db.sql y ejecutarlas en pgAdmin

🧠 Cómo ejecutarlo en pgAdmin

1. Abrí pgAdmin

2. En el panel izquierdo → expandí tu Server RenderDB → Databases → targus_db

3. Hacé clic derecho sobre targus_db → Query Tool

4. Pegá todo el SQL anterior

5. Clic en el botón “▶ Ejecutar (F5)”

Deberías ver en la consola:

" Query returned successfully in X ms. "


Y las tablas aparecerán en Schemas → public → Tables.

---

En VSCode abrir una terminal en la ruta del proyecto:
* npm run dev

En otra terminal (ahora para el backend):
* cd src/server
* node server.js

---

## Otras indicaciones que pueden ser utiles


### En caso de no tener todas las dependencias:
* npm install

### En caso de no tener node:
##### Download and install Chocolatey:
* powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
##### Download and install Node.js:
* choco install nodejs --version="25.0.0"
##### Verify the Node.js version:
* node -v # Should print "v25.0.0".
##### Verify npm version:
* npm -v # Should print "11.6.2".
