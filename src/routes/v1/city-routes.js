const express = require("express");
const { CityMiddleware } = require("../../middlewares");
const router = express.Router();

const { CityController } = require("../../controllers");

router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);

router.get("/", CityController.getCities);

router.get("/:id", CityController.getCity);

router.delete("/:id", CityController.destroyCity);

router.patch(
  "/:id",
  CityMiddleware.validateUpdateRequest,
  CityController.updateCity
);

module.exports = router;
