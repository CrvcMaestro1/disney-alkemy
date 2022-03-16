'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genero_PeliculaSerie extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Genero, {
        foreignKey: 'generoId',
        as: 'genero'
      });
      this.belongsTo(models.PeliculaSerie, {
        foreignKey: 'peliculaSerieId',
        as: 'peliculaserie'
      });
    }
  };
  Genero_PeliculaSerie.init({
    generoId: {
      type: DataTypes.INTEGER,
      references: { model: 'Genero', key: 'id' },
      onDelete: 'CASCADE'
    },
    peliculaSerieId: {
      type: DataTypes.INTEGER,
      references: { model: 'PeliculaSerie', key: 'id' },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Genero_PeliculaSerie',
  });
  return Genero_PeliculaSerie;
};