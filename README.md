# Challenge Alkemy con Node Js

## Nota
- Puedes hacer peticiones a los endpoints desde Postman, con el enlace que proporciono abajo, no es necesario ejecutar localmente. Desde la documentación puedes ejecutar en postman.

## Instrucciones

- El proyecto está desplegado en Heroku
    - Enlace: https://alkemy-disney-crvc.herokuapp.com
- La documentación de los endpoints está en Postman
    - Enlace: https://documenter.getpostman.com/view/8486968/UVsQsjFW

## Si deseas ejecutar localmente

- Crear una base de datos vacía en postgres
- Crear un archivo .env con las instrucciones del .env.example
- Ejecutar el comando ```npm install```
- Realizar las migraciones con los siguientes comandos
    ```
    makemigration --name <cualquier-nombre-de-migracion>
    runmigration
    ```
- Finalmente ejecutar el comando ```npm start```

Desarrollado con <3 por **Christian Vera** para la aceleración de **Alkemy**.