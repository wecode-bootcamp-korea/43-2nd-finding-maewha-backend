const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");

const getUserLibraries = catchAsync(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "INVALID_USER" });
  }
  const getUserLibraries = await userService.getUserLibraries(userId);

  return res.status(200).json({
    data: getUserLibraries,
  });
});

const getPlacesInUserLibrary = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { libraryId } = req.query;

  if (!userId || !libraryId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const getPlacesInUserLibrary = await userService.getPlacesInUserLibrary(
    userId,
    libraryId
  );

  return res.status(200).json({ data: getPlacesInUserLibrary });
});

const kakaoSignIn = catchAsync(async (req, res) => {
  const kakaoToken = req.headers.authorization;
  const accessToken = await userService.kakaoSignIn(kakaoToken);

  return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  kakaoSignIn,
  getUserLibraries,
  getPlacesInUserLibrary,
};
