"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flight_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      airplane_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Airplanes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      departure_airport_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Airports",
          key: "code",
        },
      },
      arrival_airport_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Airports",
          key: "code",
        },
      },
      arrival_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      departure_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boarding_gate: {
        type: Sequelize.STRING,
      },
      total_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Flights");
  },
};
