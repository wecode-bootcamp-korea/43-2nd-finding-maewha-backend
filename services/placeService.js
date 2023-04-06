const { placeDao, userDao } = require("../models");

const getAllPlaces = async (userId, placeId) => {
  const userDetail = await userDao.getUserById(userId)
  const placeDetail = await placeDao.placesDetail(placeId)

  return { userId : userDetail.id, place : placeDetail }
}

module.exports = {
  getAllPlaces
}