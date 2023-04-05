const jwt = require("jsonwebtoken");

const reviewDao = require("../models/reviewDao");

const addReview = async (userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes) => {
  return await reviewDao.addReview(userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes);
}

const updateReview = async (userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes) => {
  return await reviewDao.updateReview(userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes);
}

const deleteReview = async (userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes) => {
  return await reviewDao.deleteReview(userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes);
}

module.exports = {
  addReview,
  updateReview,
  deleteReview
}