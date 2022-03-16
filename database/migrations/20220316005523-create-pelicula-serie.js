'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PeliculaSeries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagen: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      fecha_creacion: {
        type: Sequelize.DATE
      },
      calificacion: {
        type: Sequelize.ENUM('1', '2', '3', '4', '5')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PeliculaSeries');
  }
};