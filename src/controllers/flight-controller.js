const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flight_number: req.body.flight_number,
      airplane_id: req.body.airplane_id,
      departure_airport_id: req.body.departure_airport_id,
      arrival_airport_id: req.body.arrival_airport_id,
      arrival_time: req.body.arrival_time,
      departure_time: req.body.departure_time,
      price: req.body.price,
      boarding_gate: req.body.boarding_gate,
      total_seats: req.body.total_seats,
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFlights(req, res) {
  try {
    const flights = await FlightService.getFlights(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getFlights,
};
