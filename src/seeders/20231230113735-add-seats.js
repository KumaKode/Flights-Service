"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Seats", [
      {
        airplaneId: 4,
        row: 1,
        col: "A",
        CreatedAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 4,
        row: 1,
        col: "B",
        CreatedAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 4,
        row: 1,
        col: "C",
        CreatedAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 4,
        row: 2,
        col: "D",
        CreatedAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 4,
        row: 2,
        col: "E",
        CreatedAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 4,
        row: 2,
        col: "F",
        CreatedAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
