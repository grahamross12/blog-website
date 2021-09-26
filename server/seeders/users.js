'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    // Add dummy data to the vehichles table
    await queryInterface.bulkInsert('users', [
      { username: 'grahamross',
        password: '1234' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from the vehichles table
    await queryInterface.bulkDelete('users', null, {});
  }
};
