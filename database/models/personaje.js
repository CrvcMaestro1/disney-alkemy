'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personaje extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.PeliculaSerie, {
        foreignKey: 'personajeId',
        through: 'Personaje_PeliculaSerie',
        as: 'peliculasoseries'
      });
    }
  };
  Personaje.init({
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    historia: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Personaje',
  });
  Personaje.prototype.toJSON = function () {
    var { createdAt, updatedAt, ...personaje } = Object.assign({}, this.get());
    return personaje;
  }
  return Personaje;
};