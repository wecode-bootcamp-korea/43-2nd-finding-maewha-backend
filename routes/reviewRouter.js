const express = require("express");
const reviewController = require("../controllers/reviewController");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("/", loginRequired, reviewController.addReview);
router.put("/putreviewId", loginRequired, reviewController.updateReview);
router.delete("/deletereviewId", loginRequired, reviewController.deleteReview);

module.exports = { router };