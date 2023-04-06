const { placeDao, userDao } = require("../models");

const getAllPlaces = async (userId, placeId) => {
  const userDetail = await userDao.getUserById(userId)
  const placeDetail = await placeDao.placesDetail(placeId)

  return { userId : userDetail.id, place : placeDetail }
}

const insertLikedPlace = async (userId, placeId) => {
  const likedExists = await placeDao.likedExists(userId, placeId);

  if (!likedExists) {
    return placeDao.insertLikedPlace(userId, placeId);
  }
};

module.exports = {
  getAllPlaces,
  insertLikedPlace
}