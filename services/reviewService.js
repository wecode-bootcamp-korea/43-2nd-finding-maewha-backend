const reviewDao = require("../models/reviewDao");

const addReview = async (userId, placeId, rating, comment, reviewId, tagId) => {
  return await reviewDao.addReview(userId, placeId, rating, comment, reviewId, tagId);
}

module.exports = {
  addReview
}