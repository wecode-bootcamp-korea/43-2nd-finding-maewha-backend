const { appDataSource } = require("./data-source.js");

const addReview = async (userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes) => {
  return await appDataSource.query(`
    INSERT INTO reviews (
      userId,
      placeId, 
      rating, 
      comment,
      createdAt,
      reviewsOfplacesWithTags, 
      reviewLikes
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes]
  );
}

module.exports = {
  addReview
}