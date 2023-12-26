const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
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

async function getAirports() {
  try {
    const airplanes = await airportRepository.findAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirpport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested airport not found", error.StatusCode);
    }
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested airport not found", error.StatusCode);
    }
  }
}

async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    return airport;
  } catch (error) {
    if ((error.StatusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError("The requested airport not found", error.StatusCode);
    }
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirpport,
  destroyAirport,
  updateAirport,
};
