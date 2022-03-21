const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const PersonajeModel = require('./personaje');
const PeliculaModel = require('./pelicula');
const GeneroModel = require('./genero');
const UsuarioModel = require('./usuario');

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Personaje = PersonajeModel(sequelize, DataTypes);
const Pelicula = PeliculaModel(sequelize, DataTypes);
const Genero = GeneroModel(sequelize, DataTypes);
const Usuario = UsuarioModel(sequelize, DataTypes);

Personaje.belongsToMany(Pelicula, { through: 'Personaje_Pelicula' });
Pelicula.belongsToMany(Personaje, { through: 'Personaje_Pelicula' });
Genero.hasMany(Pelicula);
Pelicula.belongsTo(Genero);

sequelize.sync();

Usuario.addHook('beforeSave', async (user) => {
  return user.id = uuidv4();
});

Usuario.prototype.toJSON = function () {
  var { password, createdAt, updatedAt, ...usuario } = Object.assign({}, this.get());
  return usuario;
}

Personaje.prototype.toJSON = function () {
  var { createdAt, updatedAt, ...personaje } = Object.assign({}, this.get());
  return personaje;
}

module.exports = { sequelize, Personaje, Pelicula, Genero, Usuario };