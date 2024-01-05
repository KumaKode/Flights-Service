const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot Create a new City Object!",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlights(query) {
  let customfilter = {};
  let sortfilter = [];
  const endingTripTime = "23:59:00";
  if (query.trips) {
    const [departure_airport_id, arrival_airport_id] = query.trips.split("-");
    if (departure_airport_id !== arrival_airport_id) {
      customfilter.departure_airport_id = departure_airport_id;
      customfilter.arrival_airport_id = arrival_airport_id;
    }
  }
  if (query.tripDate) {
    customfilter.departure_time = {
      [Op.gte]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }
  if (query.price) {
    [min_price, max_price] = query.price.split("-");
    customfilter.price = {
      [Op.between]: [min_price, max_price === undefined ? 20000 : max_price],
    };
  }
  if (query.travellers) {
    customfilter.total_seats = { [Op.gte]: query.travellers };
  }
  if (query.sort) {
    //sortfilter = query.sort.split(/[_,]/);
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortfilter = sortFilters;
  }
  try {
    const flights = await flightRepository.getFlights(customfilter, sortfilter);
    return flights;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested flight not found", error.StatusCode);
    }
  }
}

async function updateSeats(id, seats, dec) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      id,
      seats,
      dec
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot update the flight data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateSeats,
};
