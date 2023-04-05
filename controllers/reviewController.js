const reviewService = require("../services/reviewService");
const { catchAsync } = require("../utils/error");

const addReview = catchAsync (async (req, res) => {
  const userId = req.user.id;
  const { userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes } = req.body;
  const addReview = await reviewService.addReview(userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes)
  return res.status(201).json({ addReview, message: SUCCESS })
})

const updateReview = catchAsync (async (req, res) => {
  const reviewId = req.params.id;
  const { userId, placeId, reviewId, review } = req.body;
  const places = await reviewService.updateReview(
    userId, 
    placeId, 
    reviewId, 
    review
  );
  return res.status(200).json({ places, massage: "Updated" })
})

const deleteReview = catchAsync (async (req, res) => {
  const id = req.body.id;
  const userId = req.user.id;
  const placeId = req.params.placeId;
  await reviewService.deleteReview(id, userId, placeId)
  return res.status(204).json({ message : "Deleted" })
})

module.exports = {
  addReview,
  updateReview,
  deleteReview
}




