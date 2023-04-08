const { placeService } = require("../services");
const { catchAsync } = require("../utils/error");

const getAllPlaces = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { placeId } = req.params;

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

const getPlaces = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { tags } = req.query;
  const { offset } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "INVALID_USER" });
  }
  if (!tags || !offset) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const getPlaces = await placeService.getPlaces(userId, tags, offset);

  return res.status(200).json({
    data: getPlaces,
  });
});

const visitorGetPlaces = catchAsync(async (req, res) => {
  const { tags } = req.query;
  const { offset } = req.query;

  if (!tags || !offset) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const visitorGetPlaces = await placeService.visitorGetPlaces(tags, offset);

  return res.status(200).json({
    data: visitorGetPlaces,
  });
});

module.exports = {
  getAllPlaces,
  insertLikedPlace,
  getPlaces,
  visitorGetPlaces,
};
