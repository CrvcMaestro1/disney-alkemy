const { v4: uuidv4 } = require('uuid');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  Usuario.addHook('beforeSave', async (user) => {
    return user.id = uuidv4();
  });
  Usuario.prototype.toJSON = function () {
    var { password, createdAt, updatedAt, ...usuario } = Object.assign({}, this.get());
    return usuario;
  }
  return Usuario;
};