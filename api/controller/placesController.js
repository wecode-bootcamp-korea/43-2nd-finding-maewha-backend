const { placeService } = require("../services");
const { catchAsync } = require("../utils/error");


const getAllPlaces = catchAsync(async (req, res) => {
  const places = await placeService.getAllPlaces();

  return res.status(200).json({ data: places});
});

module.exports = {
  getAllPlaces
}