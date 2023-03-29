const jwt = require("jsonwebtoken");
const axios = require("axios");

const userDao = require("../models/userDao");

const kakaoSignIn = async (kakaoToken) => {
  const getKakaoUser = await axios
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        authorization: `Bearer ${kakaoToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
    .catch((err) => {
      const error = new Error("KAKAO_TOKEN_ERROR");
      error.statusCode = 400;
      throw error;
    });

  const { data } = getKakaoUser;
  console.log(data);
  const kakaoId = data.id;
  const name = data.properties.nickname;
  const email = data.kakao_account.email;
  const gender = data.kakao_account.gender;
  let user = await userDao.checkUserByKakaoId(kakaoId);

  if (!user) {
    user = await userDao.createUser(email, name, kakaoId, gender);
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
};

module.exports = {
  kakaoSignIn,
};
