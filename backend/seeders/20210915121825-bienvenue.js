'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Postings', [{
      userId: 2,
      text: "Bienvenue sur le réseau social de Groupomania, j'espère qu'il vous plaira 😊.",
      image: 'http://localhost:3000/images/bienvenue.gif',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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
