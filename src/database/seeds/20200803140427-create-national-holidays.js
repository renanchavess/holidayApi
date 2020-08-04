'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('holiday',
    [
      {
        name: 'Ano Novo',
        date: '01-01'
      },
      {
        name: 'Tiradentes',
        date: '04-21'
      },
      { 
        name: 'Dia do Trabalhador',
        date: '05-01'
      },
      {
        name: 'Independencia',
        date: '07-09'
      },
      {
        name: 'Nossa Senhora de Aparecia',
        date: '10-12'
      },
      {
        name: 'Finados',
        date: '11-02'
      },
      {
        name: 'Proclamação da República',
        date: '11-15'
      },
      {
        name: 'Natal',
        date: '12-25'
      },
    ], 
    {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
