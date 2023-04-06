const reviewService = require("../services/reviewService");
const { catchAsync } = require("../utils/error");

const addReview = catchAsync (async (req, res) => {
  const userId = 5;
  const { placeId, rating, comment} = req.body;
  if(!userId || !rating || !comment) {
    return res.status(400).json({ message: "KEY_ERROR" })
  }
  await reviewService.addReview(userId, placeId, rating, comment)
  return res.status(201).json({ message: "CREATED_REVIEW" })
})


module.exports = {
  addReview
}




