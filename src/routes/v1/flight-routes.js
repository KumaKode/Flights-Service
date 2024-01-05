const express = require("express");
const { FlightMiddleware } = require("../../middlewares");
const router = express.Router();

const { FlightController } = require("../../controllers");

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);
router.get("/", FlightController.getFlights);
router.get("/:id", FlightController.getFlight);
router.patch(
  "/:id/seats",
  FlightMiddleware.validateUpdateSeatsRequest,
  FlightController.updateSeats
);

module.exports = router;
