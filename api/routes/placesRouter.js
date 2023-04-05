const express = require('express');

const { placeController } = require("../controller")
const router = express.Router();

router.get("", placeController.getAllPlaces)

module.exports = router;