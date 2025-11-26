# Titi! Interactive Zoo Display
Titi es un proyecto interactivo compuesto por múltiples estaciones (juego, selección de roles, checkpoints, preguntas, etc.) que se comunican en tiempo real mediante eventos. El sistema incluye vistas para niños, padres y administradores, así como un backend en Node.js con Express, Socket.IO y Supabase.

## Tecnologías utilizadas

1. Node.js + Express
2. Supabase Realtime
3. Supabase (Base de datos)
4. JavaScript, HTML y CSS
5. Vercel

## Requisitos previos !

Para correr el proyecto localmente es necesario tener instalado: 

- Node.js
- npm
- Base de datos Supabase
- Un archivo .env con las variables necesarias (explicación en la sección de variables de entorno)

##Instalación

Sigue estos pasos

1. Clonar el Repositorio

2. Instalar dependencias
   
   ```
   npm install
   ```
3. Crear el archivo .env en la raiz del proyecto. No se puede subir a ningún repositorio. (Importante!)

Aquí se colocan las variables de tu base de datos.

```
SUPABASE_URL=...
SUPABASE_KEY=...
SUPABASE_SERVICE_ROLE=...
```

4. Iniciar el servidor localmente

Se inicia en http://localhost:5050, las vistas se encuentran en /child, /parent y /game.

```
npm run dev
```

## Endpoints:

/games – Iniciar juego, terminarlo o cambiar estación

/child – Registro y datos de niños

/parent – Registro de padres

/questions – Consulta de preguntas por estación

/checkpoint – Guardar y obtener progreso

/motion – Evento de motion en tiempo real

## Backup de Schemas

En el repositorio encontrarán el Backup de Schemas de Supabase, dentro de la carpeta /database.

