const { placesService } = require("../services");
const { catchAsync } = require("../utils/error");


const getAllPlaces = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {placeId} = req.query;

  const result = await placesService.getAllPlaces(userId, placeId);

  return res.status(200).json({ result });
});

module.exports = {
  getAllPlaces
}