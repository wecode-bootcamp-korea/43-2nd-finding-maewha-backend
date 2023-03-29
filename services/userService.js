const jwt = require("jsonwebtoken");
const axios = require("axios");

const userDao = require("../models/userDao");

const getUserLibraries = async (userId) => {
  return await userDao.getLibraries(userId);
};

const getPlacesInUserLibrary = async (userId, libraryId) => {
  return await userDao.getPlacesInLibrary(userId, libraryId);
};

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

  const {
    data: {
      id: kakaoId,
      properties: { nickname: name, profile_image: profileImage },
      kakao_account: { email, gender },
    },
  } = getKakaoUser;
  let user = await userDao.getUserByKakaoId(kakaoId);

  if (!user) {
    user = await userDao.createUser(email, name, kakaoId, gender);
    return jwt.sign({ user: user.insertId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  return jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  kakaoSignIn,
  getUserLibraries,
  getPlacesInUserLibrary,
};
