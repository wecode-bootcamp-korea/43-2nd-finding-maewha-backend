const { placeDao, userDao, appDataSource } = require("../models");

const getAllPlaces = async (userId, placeId) => {
  const userDetail = await userDao.getUserById(userId)
  const placeDetail = await placeDao.placesDetail(placeId)

  return { userId : userDetail.id, place : placeDetail}
}

async function addLikedPlace(userId, placeId) {
  const existingLikedPlace = await PlaceDao.selectLikedPlace(userId, placeId);
  if (existingLikedPlace.length > 0) {
    throw new Error('Already liked place');
  }

  const result = await PlaceDao.insertLikedPlace(userId, placeId);
  if (result.affectedRows === 0) {
    throw new Error('Failed to add liked place');
  }
}


const insertLikedPlace = async (userId, placeId) => {
  const likedExists = await placeDao.likedExists(userId, placeId);

  if (!likedExists) {
    return placeDao.insertLikedPlace(userId, placeId);
  }
};

module.exports = {
  getAllPlaces,
  insertLikedPlace,
  addLikedPlace
}