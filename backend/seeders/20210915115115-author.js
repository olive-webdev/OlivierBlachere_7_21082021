'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Olivier',
      surname: 'Blachere',
      email: 'olivier@blachere.fr',
      password: '$2b$04$T6skee8xO7rZh5YhFXySGOcyuZF7BOvSTjpVuIZ4MO12vqhNPNSeu',
      Ppicture: 'http://localhost:3000/images/author.jpg',
      service: 'développeur Web',
      admin: 0,
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
