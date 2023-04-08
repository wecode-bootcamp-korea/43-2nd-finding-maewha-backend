const { placeDao, userDao, appDataSource } = require("../models");

const getAllPlaces = async (userId, placeId) => {
  const userDetail = await userDao.getUserById(userId);
  const placeDetail = await placeDao.placesDetail(placeId);

  return { userId: userDetail.id, place: placeDetail };
};

async function addLikedPlace(userId, placeId) {
  const existingLikedPlace = await PlaceDao.selectLikedPlace(userId, placeId);
  if (existingLikedPlace.length > 0) {
    throw new Error("Already liked place");
  }

  const result = await PlaceDao.insertLikedPlace(userId, placeId);
  if (result.affectedRows === 0) {
    throw new Error("Failed to add liked place");
  }
}

const insertLikedPlace = async (userId, placeId) => {
  const likedExists = await placeDao.likedExists(userId, placeId);

  if (!likedExists) {
    return placeDao.insertLikedPlace(userId, placeId);
  }
};
const placeDao = require("../models/placeDao");

const getPlaces = async (userId, tags, offset) => {
  const tagList = tags;
  const tagListLength = tagList.length;

  return await placeDao.getPlaces(userId, offset, tagList, tagListLength);
};

const visitorGetPlaces = async (tags, offset) => {
  let tagList = tags.split(",");
  const tagListLength = tagList.length;
  tagList = tagList.join(",");

  return await placeDao.visitorGetPlaces(tagList, tagListLength, offset);
};

module.exports = {
  getPlaces,
  visitorGetPlaces,
};

module.exports = {
  getAllPlaces,
  insertLikedPlace,
  addLikedPlace,
};
