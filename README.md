
# Cece
 Cece es una aplicacion que recolecta información de temperatura y humedad en diferentes lugares y la reporta a usuarios registrados.

## Problemática

Usualmente, el clima de las ciudades y sus variables relacionadas cambian diariamente, por lo que es necesario monitorear valores diarios que nos permitan predecir ya sea a ojo o estadísticamente, el clima que se dará en los días próximos.

## Requisitos funcionales de la aplicación

- El sistema debe dar una bienvenida cálida al usuario y conextualizarlo en qué es la aplicación. 
-  El sistema debe autenticar los usuarios de una manera sencilla y rápida.
- El sistema debe consultar los datos que han sido recolectados y mostrarlos de manera dinámica y agrupada al usuario.
- El sistema debe recibir datos  periódicamente desde un dispositivo Arduino y almacenarlos en una base de datos.
-   El sistema debe permitir al usuario cerrar sesión cuando ya no desee ver los datos.
- El sistema debe ser compuesto por dos aplciaciones: Front-end y Back-end, que deben comunicarse mediante API-REST y los métodos POST y GET.

## Requisitos no funcionales de la aplicación


- *Eficiencia*: Toda funcionalidad del sistema debe responder al usuario en menos de 5 segundos
- Escalabilidad: El sistema debe manejar adecuadamente altos volúmenes de datos.
-   _Seguridad:_  El sistema debe almacenar el origen de todos los datos de manera que puedan ser rastreados y distinguidos de fuentes fraudulentas
-  _Usabilidad:_  El sistema debe poseer una interfaz de usuario simple, navegable y entendible a  primera vista.
-   _Disponibilidad:_  El sistema debe estar disponible 99% del tiempo.
-   _Extensibilidad:_  El sistema debe pemitir agregar módulos sin necesidad de modificar totalmente el sistema.
- *Mantenibilidad:* El sistema debe ser fácil de adaptar a las actualizaciones que se presente en sus tecnologías.

## Tecnologías
- Front-end : Se utilizó el framework  [Angular](https://angular.io/)  para desarrollar el frontend, el cual utiliza HTML, CSS y Typescript.
- Back-end: Para desarrollar el backend se utilizó  [Node.js](https://nodejs.org/es/)  
- Database: Por facilidad en uso y administraciónn, se usó la base de datos no relacional  [MongoDB](https://www.mongodb.com/es).
- Para realizar la conexión entre el servidor y la base de datos se utilizó  [mongoose](https://mongoosejs.com/), el cual permite definir objetos con un esquema fuertemente tipado que se asigna a un documento  _MongoDB_.
- Para implementar la  _API REST_  se utilizó el framework de  _Node.js_  llamado  [Express.js](https://expressjs.com/es/)  el cual permite crear de manera rápida y sencilla métodos  `POST`,  `GET`,  `PUT`, entre otros.
- Para autebticación se utilizó una API de Google por medio de la librería de  _Node_  llamada  [angularx-social-login](https://www.npmjs.com/package/angularx-social-login).

## Especificaciones
**Servicios API REST**
El servidor ofrece los siguientes servicios:

 -   Obtener todos los datos que se encuentran en la base de datos a través de una petición tipo GET  usando `/getinfo`, un ejemplo exitoso simulado con Postman y el servidor corriendo en el puerto 3000 fue el siguiente: 
 > GET http://localhost:3000/getinfo
    
 -  Ingresar datos nuevos desde un sensor a través de un POST usando `/add` y enviando los siguientes parámetros:  dirección MAC, temperatura, humedad, ciudad*, usuario y con las siguientes abreviaturas y tipos de dato:

|Campo|Tipo |
|--|--|
| MAC |  String
|temp|Number
|hum|Number
|city|String
|user|String
|date|Date

Con Postman se simuló envíos de datos al servidor en el puerto 3000 y se obtuvieron resultados exitosos usando la siguiente petición:

> POST http://localhost:3000/add?MAC=25-54-90-23&temp=77&hum=55&city=Medellin&user=lmvasquezg&date=2020-02-06
>
La dirección MAC se toma con el objetivo de poder restringir el ingreso de datos a sensores autorizados de manera que se pueda rastrear el origen y asegurar la autenticidad de los datos.

*Para la primera versión de Cece se toma ubicación como una ciudad, sin embargo se espera en versiones futuras poder tener una posición más excata para mayor precisión de los datos.

## Dificultades

**Tecnologías:**
A pesar de haber trabajado anteriormente con Angular, Node fue completamente nuevo para mí. Ya había trabajado con Flask y la estructura es parecida ya que ambos son lenguajes back-end, sin embargo, la sintaxis cambia y pocas cosas se configuran de la misma manera, en especial la base de datos, ya que requiere especificaciones más complejas que en Flask. 

Asimismo, fue la primera vez que usé nuevas librerías en Angular como CanvasJS y se me dificultó el paso de formato obtenido del servidor a los datos usados por la librería para graficar.

**Fundamentos:**
Si bien tenía bases en programación, el desarrollo web implica el uso de frameworks y herramientas que muchas veces pasan como "caja negra", tecnologías que generan un producto pero muchas veces la documentación no es muy clara de cómo lo hace, por lo que considero que conceptos relacionados con arquitecturas web, desarrollo y frameworks populares son necesarios a la hora de decidir qué usar y básicamente qué buscar para evitar caer en tutoriales o páginas que sobre complican el desarrollo.

**Habilidades:** Considero que me hacen falta habilidades en arquitectura, seguridad y conectividad especialmente en el lado del back-end para poder realizar una adecuada protección de datos y un paso de mensajes sencillo, seguro y eficiente.

## Aprendizajes
De el desarrollo de este proyecto aprendí mucho más sobre el desarrollo del fron-end, el uso de librerías y cómo integrarlas a un proyecto en Angular, por el lado del back-end aprendí una forma diferente de implementar un servidor, y a su vez diferentes formas de conectar con MongoDB, de enviar y recibir datos, manejo de formatos, entre otros.
 

## Ejecución
Cece corre actualmente de manera local, para poder ejecutarlo requerirá tener instaladas las tecnologías anteriormente mencionadas.

Inicialmente abra dos terminales diferentes, en una navegue hasta el directorio `gui/Cece` , allí, descarge las dependencias necesarias utilizando  `npm install` y posteriormente ejecute el comando:

    ng serve -o

Este comando pondrá a correr el Front-end en el puerto 4200 de su máquina.

 Para correr el Back-end, en la otra terminal navegue hasta la carpeta `server`y descargue las dependencias necesarias para ejecutar el servidor con  `npm install`, finalmente ejecutelo con:

`node nodeserver.js`

Una vez realizados estos pasos podrá usar la aplicación desde su navegador de preferencia.

