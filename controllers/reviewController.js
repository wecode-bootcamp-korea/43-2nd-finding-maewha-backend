const reviewService = require("../services/reviewService");
const { catchAsync } = require("../utils/error");

const addReview = catchAsync (async (req, res) => {
  const userId = req.user.id;
  const { placeId, rating, comment, tagId} = req.body;
  if(!userId || !rating || !comment) {
    return res.status(400).json({ message: "KEY_ERROR" })
  }
  await reviewService.addReview(userId, placeId, rating, comment, tagId)
  return res.status(201).json({ message: "CREATED_REVIEW" })
})

module.exports = {
  addReview
}




