const express = require("express");
const { AirplaneMiddleware } = require("../../middlewares");
const router = express.Router();

const { AirplaneController } = require("../../controllers");

router.post(
  "/",
  AirplaneMiddleware.validateCreateRequest,
  AirplaneController.createAirplane
);

router.get("/", AirplaneController.getAirplanes);

router.get("/:id", AirplaneController.getAirplane);

router.delete("/:id", AirplaneController.destroyAirplane);

router.patch(
  "/:id",
  AirplaneMiddleware.validateUpdateRequest,
  AirplaneController.updateAirplane
);

module.exports = router;
