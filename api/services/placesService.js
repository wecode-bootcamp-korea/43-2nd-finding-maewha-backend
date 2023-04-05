const { placeDao } = require("../models");

const getAllPlaces = async () => {
  return placeDao.getAllPlaces()
}

module.exports = {
  getAllPlaces
}