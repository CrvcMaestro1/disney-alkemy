'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.PeliculaSerie, {
        foreignKey: 'generoId',
        through: 'Genero_PeliculaSerie',
        as: 'peliculasoseries'
      });
    }
  };
  Genero.init({
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Genero',
  });
  return Genero;
};