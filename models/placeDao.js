const { appDataSource } = require('./data-source')

const placesDetail = async (placeId) => {
  const result = await appDataSource.query(
 `SELECT 
 AVG(r.rating) AS avgRating, 
 COUNT(r.id) AS countReview,
 p.id, 
 p.social_id as socialId, 
 p.name, 
 p.address, 
 p.thumbnail, 
 p.description, 
 p.latitude, 
 p.longitude, 
 paic.additional_information AS additionalInformation, 
 pi.images, 
 pbic.basic_information AS basiclInformation, 
 rl.likesCount, 
 rrr.reviewList,
 mlt.mostLikedTags
FROM places p
LEFT JOIN reviews r ON p.id = r.place_id
LEFT JOIN (
 SELECT 
   place_id,
   JSON_ARRAYAGG(
     JSON_OBJECT(
       "id", paic.id,
       "title", title,
       "gender", gender,
       "content", content
     )
   ) AS additional_information
 FROM place_additional_information_contents paic
 INNER JOIN place_additional_information_titles pait ON pait.id = paic.additional_information_id
 GROUP BY place_id
) AS paic ON p.id = paic.place_id
LEFT JOIN (
 SELECT 
   place_id,
   JSON_ARRAYAGG(
     JSON_OBJECT(
       "id", pbic.id,
       "title", title,
       "content", content
     )
   ) AS basic_information
 FROM place_basic_information_contents pbic
 INNER JOIN place_basic_information_titles pbit ON pbit.id = pbic.basic_information_id
 GROUP BY place_id
) AS pbic ON p.id = pbic.place_id
LEFT JOIN (
 SELECT 
   place_id,
   JSON_ARRAYAGG(
     JSON_OBJECT(
       "id", pi.id,
       "imageUrls", url
     )
   ) AS images
 FROM place_images pi
 GROUP BY place_id
) AS pi ON p.id = pi.place_id
LEFT JOIN (
 SELECT 
   r.place_id, 
   COUNT(*) AS likesCount 
 FROM reviews r
 INNER JOIN review_likes rl ON r.id = rl.review_id
 GROUP BY r.place_id
) AS rl ON p.id = rl.place_id
LEFT JOIN (
 SELECT 
   r.place_id,
   JSON_ARRAYAGG(
     JSON_OBJECT(
       "userId", r.user_id,
       "placeId", r.place_id,
       "rating", r.rating,
       "comment", r.comment,
       "createdAt", r.created_at,
       "tagList", tagList
     )
   ) AS reviewList
 FROM (
   SELECT 
     r.id, 
     JSON_ARRAYAGG(
       JSON_OBJECT(
         "id", t.id,
         "tagName", t.name
       )
     ) AS tagList
   FROM reviews r
   LEFT JOIN reviews_of_places_with_tags rpt ON rpt.review_id = r.id
   LEFT JOIN tags t ON t.id = rpt.tag_id
   GROUP BY r.id
 ) rr
 INNER JOIN reviews r ON rr.id = r.id
 INNER JOIN users u ON r.user_id = u.id
 GROUP BY r.place_id
) AS rrr ON p.id = r.place_id
	INNER JOIN (
		SELECT
	  place_id,
	  JSON_ARRAYAGG(
	    JSON_OBJECT(
	      "tagId", rpt.tag_id,
	      "tagName", t.name,
	      "tagLikeCount", rpt.tagCount
	    )
	  ) AS mostLikedTags
	FROM (
	  SELECT 
	    place_id, tag_id, COALESCE(COUNT(tag_id)) AS tagCount
	  FROM reviews_of_places_with_tags
	  GROUP BY place_id, tag_id
	  ORDER BY tagCount DESC, tag_id ASC
	  LIMIT 3
	) rpt
	INNER JOIN tags t ON t.id = rpt.tag_id
	GROUP BY place_id
)AS mlt ON p.id = mlt.place_id
WHERE p.id = ?
GROUP BY 
 p.id,
 p.social_id,
 p.name,
 p.address,
 p.thumbnail,
 p.description,
 p.latitude,
 p.longitude,
 paic.additional_information,
 pi.images,
 pbic.basic_information,
 rl.likesCount,      
 rrr.reviewList,
 mlt.mostLikedTags`, [placeId]
);
return result
}

const likedExists = async (userId, placeId) => {
  const [result] = await appDataSource.query(`
    SELECT * FROM liked_places
    WHERE user_id = ? AND place_id = ?`, 
    [userId, placeId]
  );
  return result;
};

const insertLikedPlace = async (userId, placeId) => {
  const likedPlace = await appDataSource.query(
    `
      INSERT
      INTO likedPlace (
        user_id,
        place_id
      ) VALUES (?, ?)
    `, [userId, placeId]
  );

  return likedPlace.insertId
};

module.exports = {
  placesDetail,
  likedExists,
  insertLikedPlace
}



