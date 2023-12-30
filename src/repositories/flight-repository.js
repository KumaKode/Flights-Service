const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airport, Airplane, City } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getFlights(filter, sort) {
    const response = await this.model.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplane_detail",
        },
        {
          model: Airport,
          required: true,
          as: "departure_airport",
          on: {
            col: Sequelize.where(
              Sequelize.col("Flight.departure_airport_id"),
              "=",
              Sequelize.col("departure_airport.code")
            ),
          },
          include: [
            {
              model: City,
              required: true,
            },
          ],
        },
        {
          model: Airport,
          required: true,
          as: "arrival_airport",
          on: {
            col: Sequelize.where(
              Sequelize.col("Flight.departure_airport_id"),
              "=",
              Sequelize.col("arrival_airport.code")
            ),
          },
          include: [
            {
              model: City,
            },
          ],
        },
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
