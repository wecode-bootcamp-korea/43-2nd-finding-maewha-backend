const jwt = require("jsonwebtoken");
const axios = require("axios");

const userDao = require("../models/userDao");

const kakaoSignIn = async (kakaoToken) => {
  const getKakaoToken = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      authorization: `Bearer ${kakaoToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!getKakaoToken) {
    const error = new Error("KAKAO_TOKEN_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const { data } = getKakaoToken;
  console.log(data);
  const kakaoid = data.id;
  const name = data.properties.nickname;
  const email = data.kakao_account.email;
  const gender = data.kakao_account.gender;
  const userId = await userDao.checkUserByKakaoId(kakaoid);

  if (!userId) {
    const newUser = await userDao.createUser(email, name, kakaoId, gender);

    return jwt.sign({ userId: newUser.insertId }, process.env.JWT_SECRET);
  }

  return jwt.sign({ userId: userId }, process.env.JWT_SECRET);
};

module.exports = {
  kakaoSignIn,
};
