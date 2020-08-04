'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('holidays', 
      { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,          
        },
        ibge_code: {
          type: Sequelize.STRING(7),
          allowNull: true,
        },
        date: { 
          type: Sequelize.STRING(5),
          allowNull: true,
        },         
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('holidays');
  }
}

