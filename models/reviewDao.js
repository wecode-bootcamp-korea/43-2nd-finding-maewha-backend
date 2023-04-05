const { appDataSource } = require("./data-source.js");

const addReview = async (id, userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes) => {
  return await appDataSource.query(`
    INSERT INTO reviews (
      id,
      userId,
      placeId, 
      rating, 
      comment,
      createdAt,
      reviewsOfplacesWithTags, 
      reviewLikes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes]
  );
}

const updateReview = async (userId, placeId, rating, comment, createdAt, reviewsOfplacesWithTags, reviewLikes) => {
  return await appDataSource.query(`
    UPDATE
      reviews
    SET
      rating=?,
      comment=?
    WHERE userId=? AND placeId = ? AND createdAt = ? AND reviewsOfplacesWithTags = ? AND reviewLikes =?
  `,[userId, placeId, rating, comment, createdAt, reviewLikes]
  );
};

const deleteReview = async (userId, placeId)  => {
  return await appDataSource.query(`
	  DELETE 
    FROM reviews 
    WHERE user_id=? AND place_id=? 
    `,
     [id, userId, placeId]
  );
};


module.exports = {
  addReview,
  updateReview,
  deleteReview
}