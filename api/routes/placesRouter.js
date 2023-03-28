const express = require('express');

const { placesController } = require("../controller")
const router = express.Router();

router.get("", placesController.getAllPlaces)

module.exports = router;