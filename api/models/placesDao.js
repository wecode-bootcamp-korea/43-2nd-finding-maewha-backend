const dataSource = require('./dataSource')

const placesDetail = async () => await dataSource.query(`SELECT * FROM places`)

const getPlacesById = async (placeId) => {
  const result = await dataSource.query(`
  SELECT place_id AS placeId
  FROM basic_info
  INNER JOIN additional_info
  ON basic_info.place_id = additional_info.place_id`)
    
}

const getPlacesByReviews = async (placeId) => {
  const result = await dataSource.query(`
  SELECT AVG(rating) as averageRating
  from reviews
  WHERE place_id=?`, [placeId])
  return result
}


module.exports = {
  placesDetail,
  getPlacesById,
  getPlacesByReviews
}