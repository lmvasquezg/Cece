
# Cece
 Cece es una aplicacion que recolecta información de temperatura y humedad en diferentes lugares y la reporta a usuarios registrados.
## Tecnologías
- Front-end : Angujar ( HTML , CSS , Typescript )
- Back-end: NodeJS
## Ejecución
Cece corre actualmente de manera local, para poder ejecutarlo requerirá tener instaladas las tecnologías anteriormente mencionadas.
Inicialmente abra dos terminales diferentes, en una navegue hasta el directorio `gui/Cece` , allí ejecute el comando:  

    ng serve -o

Este comando pondra a correr el Front-end en el puerto 4200 de su máquina. Para correr el Back-end, navegue hasta la carpeta `server`y ejecute el comando 
    node nodeserver.js
Una vez realizados estos pasos podrá usar la aplicaicón desde su navegador de preferencia.
## Desarrollo

 1. **Homepage:** Se comenzó con el Front End haciendo una página de bienvenida, con una barra de navegación sencilla usando herramientas de Angular como Material y una libreria llamada intouch-screensaver para hacer la galería de la página de inicio. Se agregó el botón de incio de sesión que sería implementado posteriomente una vez el Back End esté implementado.
 2. **Gráficos:** Se comenzó a trabajar en la visualización de datos, para hacer la vista más iteractiva se usó la libreria CanvasJS para hacer gráficos animados, de manera que a partir de una transformación básica del formato de los datos, se pueda ver la información agrupada en lugar de varios datos regados.
 3. **Database:** Debido a su facilidad de uso y conexión se usó MongoDB para el almacenamiento de datos,  inicialmente se creó un Cluster desde Mongo Atlas y posteriormente usando la herramienta Compass se crearon las colecciones de Data ( temperatura, humedad y localización), Keys (API Keys de sensores), y Users (usuarios registrados), y se insertaron datos manualmente para tener información de prueba.
