"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add dummy data to the vehichles table
    await queryInterface.bulkInsert(
      "blogs",
      [
        { userid: 1, title: "Test blog", content: "This is a test blog." },
        { userid: 1, title: "Test blog 2", content: "This is a test blog." },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all data from the vehichles table
    await queryInterface.bulkDelete("users", null, {});
  },
};
