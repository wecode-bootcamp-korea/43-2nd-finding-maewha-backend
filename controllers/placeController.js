const { placeService } = require("../services");
const { catchAsync } = require("../utils/error");


const getAllPlaces = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {placeId} = req.params;

  const result = await placeService.getAllPlaces(userId, placeId);

  return res.status(200).json({ result });
});

router.post('/like/:userId/:placeId', async (req, res) => {
  const { userId, placeId } = req.params;
  try {
    await likedPlaceService.addLikedPlace(userId, placeId);
    res.status(200).json({ message: 'Successfully liked place' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  getAllPlaces
}