const { placesService } = require("../services");
const { catchAsync } = require("../utils/error");


const getAllPlaces = catchAsync(async (req, res) => {
  const places = await placesService.getAllPlaces();

  return res.status(200).json({ data: places});
});

module.exports = {
  getAllPlaces
}