const express = require("express");
const router = express.Router();
const { loginRequired } = require("../utils/auth");
const placeController = require("../controllers/placeController")

router.get("", loginRequired, placeController.getAllPlaces);
router.post("/likeplaces", loginRequired, placeController.likePlaces);

module.exports = { router }