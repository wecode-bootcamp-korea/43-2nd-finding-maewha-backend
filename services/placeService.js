const { placeDao, userDao, appDataSource } = require("../models");

const getAllPlaces = async (userId, placeId) => {
  const userDetail = await userDao.getUserById(userId)
  const placeDetail = await placeDao.placesDetail(placeId)

  return { userId : userDetail.id, place : placeDetail}
}

async function alreadyLiked(userId, placeId) {
  const existingLikedPlace = await likedPlaceDao.selectLikedPlace(userId, placeId);
  if (existingLikedPlace.length > 0) {
    throw new Error('Already liked place');
  }

  const result = await likedPlaceDao.insertLikedPlace(userId, placeId);
  if (result.affectedRows === 0) {
    throw new Error('Failed to add liked place');
  }
}



module.exports = {
  getAllPlaces,
  alreadyLiked
}