'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false        
      },
      build: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false
      },
      registration_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      location: {
        type: Sequelize.JSON
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cars');
  }
};