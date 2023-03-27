const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");

const kakaoSignin = catchAsync(async (req, res) => {
  console.log("HI");
  const kakaoToken = req.headers.authorization;

  if (!kakaoToken) {
    console.err(err);
    const err = new Error("KAKAOTOKEN_ERROR");
    err.statusCode = 401;
    throw err;
  }

  const accessToken = await userService.kakaoSignin(kakaoToken);

  return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  kakaoSignin,
};
