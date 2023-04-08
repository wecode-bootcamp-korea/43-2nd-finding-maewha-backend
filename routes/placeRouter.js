const express = require("express");
const router = express.Router();
const { loginRequired } = require("../utils/auth");
const { placeController } = require("../controllers");

router.get("/:placeId", loginRequired, placeController.getAllPlaces);
router.get("", loginRequired, placeController.getPlaces);
router.post("/:placeId", loginRequired, placeController.insertLikedPlace);
router.get("/visitor", placeController.visitorGetPlaces);

module.exports = { router };
