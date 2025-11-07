-- Copiá este bloque entero y pegalo en el Query Tool de pgAdmin, conectado a tu base targus_db (la de Render o local, da igual):

-- Creación de tablas para PostgreSQL
-- Base de datos: targus_db

-- Si querés asegurarte de crear desde cero:
-- DROP TABLE IF EXISTS estadistica, juego, usuario CASCADE;

-- ===========================
-- Tabla: usuario
-- ===========================

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre_usuario VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  monedas INT DEFAULT 0,
  musica_activa BOOLEAN NOT NULL,
  volumen_musica INT NOT NULL,
  modo_oscuro BOOLEAN NOT NULL,
  idioma VARCHAR(50) NOT NULL
);

-- ===========================
-- Tabla: juego
-- ===========================

CREATE TABLE IF NOT EXISTS juego (
  id_juego SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  tiempo_limite INT NOT NULL,
  puntuacion_maxima INT NOT NULL,
  desafio_diario BOOLEAN NOT NULL
);

-- ===========================
-- Tabla: estadistica
-- ===========================

CREATE TABLE IF NOT EXISTS estadistica (
  id_usuario INT PRIMARY KEY,
  partidas_jugadas INT NOT NULL,
  partidas_ganadas INT NOT NULL,
  mejor_puntuacion INT NOT NULL,
  total_puntos INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
);
