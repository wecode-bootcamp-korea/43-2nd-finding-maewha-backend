const express = require("express");
const { loginRequired } = require("../utils/auth");
const placesController = require("../controllers/placesController")
const router = express.Router();

router.get("", loginRequired, placesController.getAllPlaces);

module.exports = {router}