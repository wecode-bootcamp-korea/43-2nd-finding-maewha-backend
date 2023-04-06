const express = require("express");
const reviewController = require("../controllers/reviewController");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", reviewController.addReview);

module.exports = { router };