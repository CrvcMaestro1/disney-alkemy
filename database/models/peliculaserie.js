'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PeliculaSerie extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Personaje, {
        foreignKey: 'peliculaSerieId',
        through: 'Personaje_PeliculaSerie',
        as: 'personajes'
      });
      this.belongsToMany(models.Genero, {
        foreignKey: 'peliculaSerieId',
        through: 'Genero_PeliculaSerie',
        as: 'generos'
      });
    }
  };
  PeliculaSerie.init({
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_creacion: DataTypes.DATE,
    calificacion: DataTypes.ENUM('1', '2', '3', '4', '5')
  }, {
    sequelize,
    modelName: 'PeliculaSerie',
  });
  return PeliculaSerie;
};