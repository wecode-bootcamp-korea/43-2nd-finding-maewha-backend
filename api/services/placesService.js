const { placesDao } = require("../models");

const getAllPlaces = async () => {
  return placesDao.getAllPlaces()
}

module.exports = {
  getAllPlaces
}