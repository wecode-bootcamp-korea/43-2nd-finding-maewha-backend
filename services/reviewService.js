const reviewDao = require("../models/reviewDao");

const addReview = async (userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes) => {
  return await reviewDao.addReview(userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes);
}

module.exports = {
  addReview
}