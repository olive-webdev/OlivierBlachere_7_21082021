'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'mentor',
      surname: 'openclassrooms',
      email: 'mentor@groupomania.fr',
      password: '$2b$04$T6skee8xO7rZh5YhFXySGOcyuZF7BOvSTjpVuIZ4MO12vqhNPNSeu',
      Ppicture: 'http://localhost:3000/images/Logo_OpenClassrooms.png',
      service: 'administrateur',
      admin: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
