const express = require("express");
const router = express.Router();
const { loginRequired } = require("../utils/auth");
const { placeController } = require("../controllers")


router.get("", loginRequired, placeController.getAllPlaces);
router.post("/:placeId", loginRequired, placeController.insertLikedPlace);

module.exports = { router }