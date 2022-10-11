# eCommerce Backend

Backend desarrollado en NodeJS como proyecto final de curso dictado por CoderHouse.
Consiste en una API RESTFUL con los siguientes endpoint:
- Productos
 - Obtener un producto por ID
 - Obtener productos por categoria
 - Obtener todos los productos
 - Crear producto
 - Actualizar producto
 - Borrar producto
- Carrito
 - Insertar producto dentro de carrito
 - Obtener carrito
 - Borrar carrito
 
- Orden de compra
 - Obtener ordenes de compra
 - Crear orden de compra
 
- Usuarios
 - Ingresar
 - Registrarse
 - Salir
 
Además cuenta con un chat funcionando con webSocket.

## Otras características
- Base de datos MongoDB. Alternativamente con memoria
- Validación de datos con Ajv 
- Gestión de usuarios con Passport
- Test con Mocha, Chai y Supertest


## Estructura
El proyecto se estrucuró siguiendo las mejores prácticas según [goldbergyoni](https://github.com/goldbergyoni): 
https://github.com/goldbergyoni/nodebestpractices

- Structure your solution by components
- Layer your app, keep Express within its boundaries
- Separate Express 'app' and 'server'
- Distinguish operational vs programmer errors
- Handle errors centrally, not within a middleware
- etc.

## DEMO
Se ha creado un sitio web con NextJS para probar todas las funcionalidades del backend.

https://ch-ecommerce-frontend.vercel.app/

[Repositorio del frontend](https://github.com/stronix90/1.1.CH_eCommerce_frontend)

El backend se ha alojado en Glitch y el frondend se ha alojado en Vercel.
Por tanto, se ha configurado en ambos sitios las cors correspondientes para que puedan interactuar ambos sitios y gestionar las conexiones seguras.

## Instalación
Para copiar este proyecto en su computadora deberá tener previamente instalado [`Git`](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalaci%C3%B3n-de-Git) y [`NodeJS`](https://nodejs.org/es/). Luego se deberán seguir los siguientes pasos:

**1. Clonar el repositorio**
``` shell
git clone https://github.com/stronix90/CH_eCommerce_backend
```
Ingresar a la carpeta de la aplicación:
``` shell
cd CH_eCommerce_backend
```
**2. Instalar dependencias**
```
npm install
```
**3. Ejecutar la aplicación**

``` shell
- npm run dev
- npm run start
```
