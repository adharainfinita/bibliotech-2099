# Bibliotech Backend

Backend para **Bibliotech**, una plataforma de biblioteca virtual donde los usuarios pueden:

- Subir y gestionar sus propios libros.
- Compartir libros con otros usuarios.
- Consultar bibliotecas ajenas.
- Leer libros en un visor integrado.
- Calificar, comentar y marcar el estado de lectura de cada libro.

## 🚀 Tecnologías

- **Node.js** 20+
- **Nest.js** 10+
- **TypeScript**
- **TypeORM** + PostgreSQL (configurable con otras bases de datos)
- **JWT Authentication** (tokens de acceso y refresco)
- **Cloudinary** o **Amazon S3** (opcional) para almacenamiento de archivos
- **CORS** habilitado para frontend en Angular

## 📁 Estructura del Proyecto

bibliotech-2099_back/
├── src/
│ ├── auth/ # Autenticación y autorización
│ ├── users/ # Gestión de usuarios
│ ├── books/ # Gestión de libros
│ ├── libraries/ # Bibliotecas personales
│ ├── comments/ # Comentarios y calificaciones
│ ├── shared/ # Utilidades y helpers
│ └── main.ts # Punto de entrada
├── .env # Variables de entorno
├── package.json
├── tsconfig.json
└── README.md

## 🔧 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/bibliotech-back.git
   cd bibliotech-back

2. Instalar dependencias:
```bash
npm install
```
3. Configurar las variables de entorno:
    Crear un archivo .env en la raíz con:
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=bibliotech
JWT_SECRET=supersecreto
JWT_REFRESH_SECRET=supersecreto_refresh
PORT=3000
```
4. Ejecuta las migraciones:
```bash
npm run typeorm migration:run 
```
5. Iniciar el servidor:
```bash
npm run start:dev
```

🔒 Autenticación
La API utiliza JWT para proteger endpoints privados:

Login y Registro generan un accessToken y un refreshToken.

El accessToken expira rápido y se renueva con el refreshToken.

Endpoints como /books, /libraries, /comments requieren autenticación.

📚 Funcionalidades planificadas

Registro e inicio de sesión de usuarios

Subida de libros (PDF, EPUB)

Compartir libros con otros usuarios

Comentar y calificar libros

Estado de lectura: leído, en lectura, no leído

Visor de lectura embebido

Panel de administración para moderar contenido

🌐 Frontend

El frontend se desarrolla con Angular en un repositorio separado:

bibliotech-2099_front

📝 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo LICENSE para más información.
