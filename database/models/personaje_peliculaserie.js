'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personaje_PeliculaSerie extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Personaje, {
        foreignKey: 'personajeId',
        as: 'personaje'
      });
      this.belongsTo(models.PeliculaSerie, {
        foreignKey: 'peliculaSerieId',
        as: 'peliculaserie'
      });
    }
  };
  Personaje_PeliculaSerie.init({
    personajeId: {
      type: DataTypes.INTEGER,
      references: { model: 'Personaje', key: 'id' },
      onDelete: 'CASCADE'
    },
    peliculaSerieId: {
      type: DataTypes.INTEGER,
      references: { model: 'PeliculaSerie', key: 'id' },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Personaje_PeliculaSerie',
  });
  return Personaje_PeliculaSerie;
};