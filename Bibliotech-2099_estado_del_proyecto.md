# 📚 Bibliotech 2099 — Estado del Proyecto

> Documento de referencia para archivar el estado actual del proyecto y poder retomarlo posteriormente.

---

# 1. Descripción general

**Bibliotech 2099** es una plataforma de biblioteca virtual.

La aplicación permitirá a los usuarios:

- Crear una cuenta para acceder a su biblioteca.
- Subir y gestionar libros.
- Consultar bibliotecas de otros usuarios.
- Compartir libros con otros usuarios.
- Leer libros mediante un sistema de lectura integrado.
- Calificar libros.
- Comentar libros.
- Mantener un estado de lectura para cada libro:
  - No leído.
  - En lectura.
  - Leído.

Una idea importante del proyecto es que **cada biblioteca funciona también como el perfil público de un usuario**.

---

# 2. Stack tecnológico decidido

La arquitectura elegida actualmente es:

```text
Frontend
Angular
    │
    │ HTTP / REST API
    ▼
Backend
Nest.js + TypeScript
    │
    │ TypeORM
    ▼
PostgreSQL
```

## Backend

- Node.js
- TypeScript
- Nest.js
- TypeORM
- PostgreSQL

## Infraestructura local

- Docker
- Docker Compose
- PostgreSQL ejecutándose dentro de Docker

## Gestión de Node

- nvm

La decisión de utilizar Docker para PostgreSQL evita tener que instalar y configurar PostgreSQL directamente en Fedora.

---

# 3. Estructura del repositorio

Se decidió utilizar un repositorio que pueda contener tanto frontend como backend:

```text
bibliotech-2099/
├── back/
│   ├── src/
│   ├── package.json
│   ├── docker-compose.yml
│   ├── .env
│   └── ...
│
├── front/
│   └── ... (todavía no creado)
│
└── README.md
```

Actualmente el trabajo se está realizando únicamente dentro de:

```text
bibliotech-2099/back
```

---

# 4. Estado actual del entorno

El proyecto fue retomado en un entorno Fedora.

Se instaló y configuró:

- Git.
- nvm.
- Node.js mediante nvm.
- npm.
- Docker.
- Docker Compose.

Después de clonar el repositorio, se instalaron las dependencias del backend:

```bash
cd bibliotech-2099/back
npm install
```

Docker fue comprobado correctamente.

---

# 5. PostgreSQL mediante Docker

Se decidió ejecutar PostgreSQL mediante Docker.

El archivo:

```text
back/docker-compose.yml
```

contiene un servicio PostgreSQL.

La configuración utilizada es:

```yaml
services:
  postgres:
    image: postgres:17
    container_name: bibliotech-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: bibliotech
      POSTGRES_PASSWORD: bibliotech
      POSTGRES_DB: bibliotech
    ports:
      - "5432:5432"
```

Esto crea:

```text
Contenedor:
bibliotech-postgres

Usuario:
bibliotech

Contraseña:
bibliotech

Base de datos:
bibliotech

Puerto:
5432
```

El contenedor fue levantado correctamente.

Comandos utilizados:

```bash
docker compose up -d
```

Para comprobar el estado:

```bash
docker compose ps
```

También se comprobó correctamente la conexión directa a PostgreSQL:

```bash
docker exec -it bibliotech-postgres psql -U bibliotech -d bibliotech
```

Por lo tanto, PostgreSQL está funcionando correctamente.

---

# 6. Conexión Nest.js ↔ PostgreSQL

El backend ya tiene instaladas las dependencias necesarias para la conexión.

Dependencias principales:

```text
@nestjs/typeorm
typeorm
pg
@nestjs/config
```

Se creó un archivo:

```text
back/.env
```

con:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=bibliotech
DB_PASSWORD=bibliotech
DB_DATABASE=bibliotech
```

El archivo `.env` debe permanecer ignorado por Git.

En `.gitignore` debe existir:

```gitignore
.env
```

---

# 7. Configuración actual de TypeORM

En:

```text
back/src/app.module.ts
```

se configuró Nest para utilizar:

- `ConfigModule`
- `ConfigService`
- `TypeOrmModule`

La configuración conceptual actual es:

```ts
ConfigModule.forRoot({
  isGlobal: true,
})

TypeOrmModule.forRootAsync({
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    type: 'postgres',

    host: configService.get<string>('DB_HOST'),

    port: Number(
      configService.get<string>('DB_PORT'),
    ),

    username: configService.get<string>('DB_USERNAME'),

    password: configService.get<string>('DB_PASSWORD'),

    database: configService.get<string>('DB_DATABASE'),

    autoLoadEntities: true,

    synchronize: true,
  }),
})
```

La conexión fue configurada correctamente.

La arquitectura actual es:

```text
Nest.js
   │
   ▼
TypeORM
   │
   ▼
localhost:5432
   │
   ▼
Docker
   │
   ▼
PostgreSQL
   │
   └── bibliotech
```

Actualmente la base de datos todavía no tiene entidades/tablas propias del proyecto.

---

# 8. Decisiones sobre TypeORM

Actualmente se utiliza:

```ts
autoLoadEntities: true
```

Esto permitirá que TypeORM detecte automáticamente las entidades registradas dentro de los módulos.

También se está utilizando temporalmente:

```ts
synchronize: true
```

Esto permitirá que TypeORM cree y sincronice las tablas durante el desarrollo inicial.

## Importante

Más adelante, antes de producción, se deberá cambiar la estrategia para utilizar:

```text
Migraciones
```

en lugar de depender de:

```ts
synchronize: true
```

---

# 9. Orden de desarrollo acordado

Se decidió avanzar lentamente porque es la primera experiencia utilizando Nest.js.

El orden previsto es:

```text
① Entorno Node funcionando
       ↓
② Nest funcionando
       ↓
③ Docker funcionando
       ↓
④ PostgreSQL funcionando
       ↓
⑤ Nest conectado a PostgreSQL
       ↓
⑥ Entidades TypeORM
       ↓
⑦ Relaciones entre entidades
       ↓
⑧ Migraciones
       ↓
⑨ Módulos Nest
       ↓
⑩ Services
       ↓
⑪ Controllers / API REST
       ↓
⑫ Autenticación
       ↓
⑬ Frontend Angular
```

Actualmente el proyecto se encuentra aproximadamente en:

```text
① ✅
② ✅
③ ✅
④ ✅
⑤ ✅
⑥ ⏳ SIGUIENTE PASO
```

---

# 10. Modelo de datos — Estado actual

El modelo entidad-relación fue diseñado anteriormente.

La primera entidad que se comenzó a revisar para traducir a TypeORM es:

```text
USER
```

El diseño original proporcionado fue:

```text
┌──────────────────────────────────────────┐
│                   USER                   │
├──────────────────────────────────────────┤
│ PK  id              UUID                 │
│     username        VARCHAR(30) NOT NULL │
│     email           VARCHAR(50)          │
│     password_hash   VARCHAR(50)          │
│     created_at      DATE                 │
│       │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│                   BOOK                   │
├──────────────────────────────────────────┤
│ PK  id             UUID                  │
│     title          VARCHAR(50)           │
│     author         VARCHAR(25)           │
│     genre          VARCHAR(50)           │
│     description    VARCHAR(500)          │
│     file_url       TEXT                  │
│     cover_url      TEXT                  │
│ FK  owner_id       REFERENCES User(id)   │
└──────────────────────────────────────────┘


┌──────────────────────────────────────────┐
│                BOOK SHARE                │
├──────────────────────────────────────────┤
│ FK  book_id        UUID REFERENCES       │
│                    Book(id)              │
│                                          │
│ FK  user_id        UUID REFERENCES       │
│                    User(id)              │
│                                          │
│ PK  (book_id, user_id)                   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│                BOOK SHARE                │
├──────────────────────────────────────────┤
│ FK  book_id        UUID REFERENCES       │
│                    Book(id)              │
│                                          │
│ FK  user_id        UUID REFERENCES       │
│                    User(id)              │
│                                          │
│ PK  (book_id, user_id)                   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│                 COMMENT                  │
├──────────────────────────────────────────┤
│ PK  id             UUID                  │
│                                          │
│ FK  book_id        UUID REFERENCES       │
│                    Book(id)              │
│                                          │
│ FK  user_id        UUID REFERENCES       │
│                    User(id)              │
│                                          │
│     text           TEXT                  │
│                                          │
│     created_at     TIMESTAMP             │
│                    DEFAULT               │
│                    CURRENT_TIMESTAMP     │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│                  RATING                  │
├──────────────────────────────────────────┤
│ FK  book_id        UUID REFERENCES       │
│                    Book(id)              │
│                                          │
│ FK  user_id        UUID REFERENCES       │
│                    User(id)              │
│                                          │
│     score          INTEGER               │
│                    CHECK (score          │
│                    BETWEEN 1 AND 5)      │
│                                          │
│ PK  (book_id, user_id)                   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│              READING STATUS              │
├──────────────────────────────────────────┤
│ FK  book_id        UUID REFERENCES       │
│                    Book(id)              │
│                                          │
│ FK  user_id        UUID REFERENCES       │
│                    User(id)              │
│                                          │
│ PK  (book_id, user_id)                   │
│                                          │
│     status         ENUM                  │
│                    ('reading',           │
│                     'read',              │
│                     'unread')            │
└──────────────────────────────────────────┘
```
---

# 16. Flujo recomendado para retomar

Cuando quieras volver al proyecto:

## 1. Entrar al backend

```bash
cd bibliotech-2099/back
```

## 2. Comprobar la versión de Node

```bash
node --version
npm --version
```

## 3. Si es una máquina nueva

Instalar dependencias:

```bash
npm install
```

## 4. Levantar PostgreSQL

```bash
docker compose up -d
```

## 5. Comprobar Docker

```bash
docker compose ps
```

## 6. Arrancar Nest

```bash
npm run start:dev
```

Si todo está funcionando, continuar desde:

```text
CREACIÓN DEL MÓDULO USERS
```

---

# 17. Comandos útiles de Docker

Levantar PostgreSQL:

```bash
docker compose up -d
```

Detener PostgreSQL:

```bash
docker compose down
```

Ver contenedores:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs
```

Entrar a PostgreSQL:

```bash
docker exec -it bibliotech-postgres psql -U bibliotech -d bibliotech
```

Salir de PostgreSQL:

```sql
\q
```

---

# 18. Filosofía de desarrollo acordada

La intención es **aprender Nest.js mientras se desarrolla el proyecto**, no simplemente generar un backend completo rápidamente.

Por eso se acordó avanzar gradualmente:

- No instalar dependencias innecesarias.
- No implementar JWT todavía.
- No implementar autenticación todavía.
- No crear todos los módulos de golpe.
- No crear entidades sin entender las relaciones.
- Revisar el modelo ER antes de traducirlo a TypeORM.
- Comprobar PostgreSQL después de crear cada entidad.

El objetivo es entender:

```text
Diagrama ER
      ↓
Modelo relacional
      ↓
Entidad TypeORM
      ↓
Relaciones TypeORM
      ↓
Servicio Nest
      ↓
Controller
      ↓
API REST
```

---

# 📍 Estado final al archivar

```text
PROYECTO: Bibliotech 2099

Repositorio: bibliotech-2099
Backend: Nest.js
Frontend: Angular (pendiente)
Base de datos: PostgreSQL
ORM: TypeORM
Infraestructura DB: Docker

ENTORNO:
Node + npm          ✅
Nest.js             ✅
Docker              ✅
PostgreSQL Docker   ✅
Conexión TypeORM    ✅

ENTIDADES:
User                ✅
Book                ✅
BookShare           ⏳ Pendiente
Comment             ⏳ Pendiente
Rating              ⏳ Pendiente
ReadingStatus       ⏳ Pendiente

SIGUIENTE PASO:
Completar los módulos User y Books.
```
