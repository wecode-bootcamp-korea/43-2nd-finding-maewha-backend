const { placeService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllPlaces = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {placeId} = req.query;

  const result = await placeService.getAllPlaces(userId, placeId);

  return res.status(200).json({ result });
});

const insertLikedPlace = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const placeId = +req.params.Id;

  if (!placeId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const result = await placeService.insertLikedPlace(userId, placeId);

  return res.status(201).json({ result });
});




module.exports = {
  getAllPlaces,
  insertLikedPlace
}