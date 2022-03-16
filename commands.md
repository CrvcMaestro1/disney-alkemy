# Some commands and links that I used

## Commands Sequelize 
- sequelize model:generate --name Usuario --attributes name:string,email:string,password:string

- sequelize model:generate --name Personaje --attributes imagen:string,nombre:string,edad:integer,peso:decimal,historia:text

- sequelize model:generate --name PeliculaSerie --attributes imagen:string,titulo:string,fecha_creacion:date,calificacion:enum:'{1,2,3,4,5}'

- sequelize model:generate --name Genero --attributes imagen:string,nombre:string

- sequelize model:generate --name Personaje_PeliculaSerie --attributes personajeId:integer,peliculaSerieId:integer

- sequelize model:generate --name Genero_PeliculaSerie --attributes generoId:integer,peliculaSerieId:integer

## Links

- https://siddharth-lakhara.medium.com/understanding-sequelize-associations-part-1-one-to-one-1-1-mapping-897ce176caf9

- https://siddharth-lakhara.medium.com/understanding-sequelize-associations-part-2-one-to-many-1-n-mapping-10a7d7929a5b

- https://siddharth-lakhara.medium.com/understanding-sequelize-associations-part-3-many-to-many-n-m-mapping-3e7dcdeb78db

- https://dev.to/nedsoft/performing-crud-with-sequelize-29cf

- https://anjelicaa.medium.com/deploying-a-node-js-postgres-sequelize-app-to-heroku-da3dc9de07cd

## Command run sequelize migration in heroku

- ```heroku run sequelize db:migrate --env production -app alkemy-disney-crvc```