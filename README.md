# Guía de Instalación

Para clonar el repositorio en tu computadora:
* git clone https://github.com/RodrigoCativa3279/TARGUS

Abrir una BD local con XAMPP y pegar el codigo de "targus_db.sql" o importar el archivo.

En VSCode abrir una terminal en la ruta del proyecto:
* npm run dev

En otra terminal (ahora para el backend):
* cd src/server
* node server.js


---
## Otras indicaciones que pueden ser utiles
####En caso de no tener todas las dependencias:
* npm install

#### En caso de no tener node:
##### Download and install Chocolatey:
* powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
##### Download and install Node.js:
* choco install nodejs --version="25.0.0"
##### Verify the Node.js version:
* node -v # Should print "v25.0.0".
##### Verify npm version:
* npm -v # Should print "11.6.2".
