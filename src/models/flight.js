"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: "airplane_id",
        as: "airplane_detail",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "departure_airport_id",
        as: "departure_airport",
      });

      this.belongsTo(models.Airport, {
        foreignKey: "arrival_airport_id",
        as: "arrival_airport",
      });
    }
  }
  Flight.init(
    {
      flight_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplane_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departure_airport_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrival_airport_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrival_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departure_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boarding_gate: {
        type: DataTypes.STRING,
      },
      total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
