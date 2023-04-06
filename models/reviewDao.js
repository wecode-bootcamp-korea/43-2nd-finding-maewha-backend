const { appDataSource } = require("./data-source.js");

const addReview = async (userId, placeId, rating, comment) => {
  return await appDataSource.query(`
    INSERT INTO reviews (
      user_id,
      place_id, 
      rating, 
      comment
    ) VALUES (?, ?, ?, ?)`,
    [userId, placeId, rating, comment]
  );
}

const addReview2 = async (reviewId, userId) => {
  return await appDataSource.query(`
  INSERT INTO review_likes (
    review_id,
    user_id
  ) VALUES (?, ?)`,
  [reviewId, userId]
  )
}

const addReview3 = async (reviewId, placeId, tagId) => {
  return await appDataSource.query(`
  INSERT INTO reviews_of_places_with_tags (
    review_id,
    place_id,
    tag_id
  ) VALUES (?, ?, ?)`,
  [reviewId, placeId, tagId]
  )
}


module.exports = {
  addReview,
  addReview2,
  addReview3
}