const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const compareTime = require("../utils/helpers/datetime-helpers");

function validateCreateRequest(req, res, next) {
  ErrorResponse.message = "Something went wrong while creating flight";
  if (!req.body.flight_number) {
    ErrorResponse.error = new AppError(
      ["flight_number name not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.airplane_id) {
    ErrorResponse.error = new AppError(
      ["airplane_id code not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departure_airport_id) {
    ErrorResponse.error = new AppError(
      ["departure_airport_id not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrival_airport_id) {
    ErrorResponse.error = new AppError(
      ["arrival_airport_id not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrival_time) {
    ErrorResponse.error = new AppError(
      ["arrival_time not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departure_time) {
    ErrorResponse.error = new AppError(
      ["departure_time not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.error = new AppError(
      ["price not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.boarding_gate) {
    ErrorResponse.error = new AppError(
      ["boarding_gate not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.total_seats) {
    ErrorResponse.error = new AppError(
      ["total_seats not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (compareTime(req.body.departure_time, req.body.arrival_time)) {
    ErrorResponse.error = new AppError(
      [
        "departure_time and arrival_time can't be same or arrival time is less than departure time",
      ],
      StatusCodes.BAD_REQUEST
    );
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    ErrorResponse.message = "Something went wrong while updating the Object";
    ErrorResponse.error = new AppError(
      ["Request body is empty in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (Object.keys(req.body).length < 8) {
    ErrorResponse.message = "Something went wrong while updating the Object";
    ErrorResponse.error = new AppError(
      ["Incomplete request body"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
