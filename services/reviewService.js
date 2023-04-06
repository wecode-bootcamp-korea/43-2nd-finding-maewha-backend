const reviewDao = require("../models/reviewDao");

const addReview = async (userId, placeId, rating, comment) => {
  return await reviewDao.addReview(userId, placeId, rating, comment);
}

module.exports = {
  addReview
}