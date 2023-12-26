const express = require("express");
const { AirportMiddleware } = require("../../middlewares");
const router = express.Router();

const { AirportController } = require("../../controllers");

router.post(
  "/",
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);

router.get("/", AirportController.getAirports);

router.get("/:id", AirportController.getAirport);

router.delete("/:id", AirportController.destroyAirport);

router.patch(
  "/:id",
  AirportMiddleware.validateUpdateRequest,
  AirportController.updateAirport
);

module.exports = router;
