# Bibliotech Backend

Backend para **Bibliotech**, una plataforma de biblioteca virtual donde los usuarios pueden:

- Subir y gestionar sus propios libros.
- Compartir libros con otros usuarios.
- Consultar bibliotecas ajenas.
- Leer libros en un visor integrado.
- Calificar, comentar y marcar el estado de lectura de cada libro.

## 🚀 Tecnologías

- **Python 3.10+**
- **Django 4.x**
- **Django REST Framework**
- **SQLite** (por defecto, reemplazable por PostgreSQL o MongoDB)
- **JWT Authentication** (a implementar)
- **Cloudinary o S3** para almacenamiento de archivos (opcional)
- **CORS** habilitado para frontend en React/Vite

## 📁 Estructura del Proyecto

bibliotech_backend/
├── core/ # App principal con modelos, vistas y urls
├── bibliotech_backend/ # Configuración del proyecto
├── manage.py
├── requirements.txt
└── README.md

## 🔧 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/bibliotech-backend.git
   cd bibliotech-backend

2. Crea un entorno virtual:
```bash
python -m venv env
source env/bin/activate
```

2. Instala las dependencias:
```
pip install -r requirements.txt
```

3. Crea la base de datos y aplica las migraciones:
```
python manage.py migrate
```
4. Crea un superusuario (opcional para el admin panel):
```
python manage.py createsuperuser
```
5. Ejecuta el servidor:
```
python manage.py runserver
```
🔒 Autenticación

Se implementará autenticación basada en tokens JWT para el acceso a los endpoints protegidos (login, registro, perfil, etc.).
📚 Funcionalidades planificadas

Registro e inicio de sesión de usuarios

Subida de libros (PDF, EPUB)

Compartir libros con otros usuarios

Comentar y calificar libros

Estado de lectura: leído, en lectura, no leído

Visor de lectura embebido

    Panel de administración para moderar contenido

🌐 Frontend

El frontend del proyecto se desarrolla por separado, con Vite + React, en el repositorio: bibliotech-frontend
📝 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo LICENSE para más información.
