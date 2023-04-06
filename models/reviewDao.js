const { appDataSource } = require("./data-source.js");

const addReview = async (userId, placeId, rating, comment, tagId) => {
  const review = await appDataSource.query(`
    INSERT INTO reviews (
      user_id,
      place_id, 
      rating, 
      comment
    ) VALUES (?, ?, ?, ?)`,
    [userId, placeId, rating, comment]
  );
  const reviewId = review.insertId

  await appDataSource.query(`
  INSERT INTO review_likes (
    review_id,
    user_id
  ) VALUES (?, ?)`,
  [reviewId, userId]
  )

  await appDataSource.query(`
  INSERT INTO reviews_of_places_with_tags (
    review_id,
    place_id,
    tag_id
  ) VALUES (?, ?, ?)`,
  [reviewId, placeId, tagId]
  )
}

module.exports = {
  addReview
}
