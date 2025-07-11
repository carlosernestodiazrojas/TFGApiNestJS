# 🏘️ Plataforma Tecnológica para la Gestión de Comunidades de Vecinos

> **API desarrollada con NestJS para la gestión integral de comunidades vecinales**

---

## 📋 Información del Proyecto

**Trabajo de Fin de Estudio**  
Grado en Ingeniería Informática - UNIR  
**Autor:** Carlos Ernesto Díaz Rojas  
**Año:** 2025

## 🚀 Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 20 o superior)
- **npm**
- **PostgreSQL** (servidor de base de datos)
- **Servicio S3 compatible** (Minio recomendado para desarrollo)

### Servicios Externos Requeridos

Si no tienes estos servicios configurados, puedes seguir las guías oficiales:

- 🗄️ **PostgreSQL:** [Instalación con Docker](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)
- 📦 **Minio (S3):** [Instalación con Docker](https://docs.min.io/enterprise/aistor-object-store/installation/container/install/?tab=download-image-docker)

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/carlosernestodiazrojas/TFGApiNestJS.git
   cd TFGApiNestJS
   ```

2. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```

3. **Edita el archivo `.env` con tus credenciales, sustituir las de ejemplo**
   ```env
   # Base de Datos PostgreSQL
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASS=tu_contraseña
   DB_NAME=nombre_bd
   
   # Almacenamiento S3 (Minio/AWS)
   MINIO_ENDPOINT=http://localhost:9000
   MINIO_ACCESS_KEY=tu_access_key
   MINIO_SECRET_KEY=tu_secret_key
   MINIO_BUCKET=tu_bucket
   MINIO_REGION=us-east-1
   ```

4. **Instala las dependencias**
   ```bash
   npm install
   ```

5. **Ejecuta en modo desarrollo**
   ```bash
   npm run start:dev
   ```

## 🛠️ Scripts Disponibles

Consulta el archivo `package.json` para ver todos los scripts disponibles.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **GPL-3.0** License.

**Copyright © 2025 Carlos Ernesto Díaz Rojas**