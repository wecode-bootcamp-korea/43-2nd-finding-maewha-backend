const { placeService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllPlaces = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {placeId} = req.query;

  const result = await placeService.getAllPlaces(userId, placeId);

  return res.status(200).json({ result });
});

const likePlaces = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {placeId} = req.body;

  const result = await placeService.insertLikedPlace(userId, placeId);

  return res.status(200).json({ result });
});

module.exports = {
  getAllPlaces,
  likePlaces
}