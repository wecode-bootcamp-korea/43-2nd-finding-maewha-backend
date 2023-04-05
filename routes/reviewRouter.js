const express = require("express");
const reviewController = require("../controllers/reviewController");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/", loginRequired, reviewController.addReview);
router.put("/reviewId", loginRequired, reviewController.updateReview);
router.delete("/placeId", loginRequired, reviewController.deleteReview);

module.exports = { router };