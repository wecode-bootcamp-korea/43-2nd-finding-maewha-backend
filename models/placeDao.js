

const { appDataSource } = require('./data-source')

const placesDetail = async (placeId, userId) => {
  const result = await appDataSource.query(
 `SELECT
  avgRating.avgRating,
  countReview.countReview,
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
  r.reviewList
  FROM places p 


    -- 찜하기
    LEFT JOIN (
    SELECT libraries.id from libraries
    JOIN liked_places ON libraries.id = liked_places.libraries_id
    WHERE libraries.user_id = ?
    ) AS likePlaces 


    -- 많이 선택된 태그
    JOIN (
    SELECT 
      reviews_of_places_with_tags ropwt.tag_id,
      tags.name,
    COUNT(*) AS count
    FROM ropwt
    JOIN tags ON tags.id = ropwt.tag_id
    WHERE ropwt.place_id = ? 
    GROUP BY ropwt.tag_id
    HAVING COUNT(*) > (SELECT COUNT(*) FROM reviews WHERE place_id = 1) / 3
      )


  JOIN (
  SELECT
    place_id,
    AVG(rating) as avgRating
    FROM reviews r
    GROUP BY r.place_id
  ) as avgRating on p.id = avgRating.place_id
  JOIN (
  SELECT p.id,
  COUNT(r.id) as countReview 
  FROM places p
  LEFT JOIN reviews r on r.place_id = p.id
  GROUP BY p.id
  ) as countReview ON p.id = countReview.id
  JOIN (
  SELECT r.place_id,
  COUNT(*) as likesCount
  FROM reviews r
  INNER JOIN review_likes rl ON r.id = rl.review_id
  GROUP BY r.place_id
  ) AS rl ON p.id = rl.place_id
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
  INNER JOIN place_basic_information_titles pbit on pbit.id = pbic.basic_information_id
  GROUP BY place_id
  ) pbic on p.id = pbic.place_id
  LEFT JOIN (
  SELECT
    place_id,
    JSON_ARRAYAGG(
    JSON_OBJECT(
      "id", id, 
      "imageUrls", url
    )
  ) AS images
  FROM
    place_images
  GROUP BY
    place_id
  ) pi ON p.id = pi.place_id
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
  INNER JOIN place_additional_information_titles pait on pait.id = paic.additional_information_id
  GROUP BY place_id
  ) paic on p.id = paic.place_id
  

-- 태그
LEFT JOIN (
  SELECT
  place_id,
    JSON_ARRAYAGG(
    JSON_OBJECT(
      "userId", r.user_id,
      "placeId", r.place_id,
      "rating", r.rating,
      "comment", r.comment,
      "createdAt", r.created_at,
      "reviewTags", (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            "tagId", ropwt.tag_id,
            "tagName", tags.name
          )
        )
      )
    )
  ) AS reviewList
  FROM reviews r
  INNER JOIN users u on r.user_id = u.id
  JOIN tags ON tags.id = reviews_of_places_with_tags.place_id
  GROUP BY place_id
  ) r ON p.id = r.place_id
  WHERE p.id = ?`,[placeId, placeId]

);

return result
}

module.exports = {
  placesDetail,
}






/*SELECT
avgRating.avgRating,
countReview.countReview,
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
r.reviewList
FROM places p
(select libraries.id from libraries 
  JOIN liked_places ON libraries.id = liked_places.libraries_id
  WHERE libraries.user_id = ?)
   / LEFT JOIN (
  SELECT libraries.id from libraries
  JOIN liked_places ON libraries.id = liked_places.libraries.user_id
  WHERE libraries.user_id = ?
  ) AS likePlaces
LEFT JOIN (
SELECT
ropwt.place_id as placeId,
JSON_ARRAYAGG(
  JSON_OBJECT(
    "tagId", ropwt.tag_id,
    "tagName", tags.name,
    "tagCount", COUNT(*)
  )
)as placeTags
FROM 
  reviews_of_places_with_tags ropwt
JOIN 
  tags 
ON 
  tags.id = ropwt.tag_id
GROUP BY
  placeId, tagId, tagName
HAVING
  COUNT(*) > (SELECT COUNT(*) FROM reviews r WHERE place_id = ?) / 2
) as topTags ON topTags.placeId = p.id
JOIN (
SELECT
  place_id,
  AVG(rating) as avgRating
  FROM reviews r
  GROUP BY r.place_id
) as avgRating on p.id = avgRating.place_id
JOIN (
SELECT p.id,
COUNT(r.id) as countReview 
FROM places p
LEFT JOIN reviews r on r.place_id = p.id
GROUP BY p.id
) as countReview ON p.id = countReview.id
JOIN (
SELECT r.place_id,
COUNT(*) as likesCount
FROM reviews r
INNER JOIN review_likes rl ON r.id = rl.review_id
GROUP BY r.place_id
) AS rl ON p.id = rl.place_id
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
INNER JOIN place_basic_information_titles pbit on pbit.id = pbic.basic_information_id
GROUP BY place_id
) pbic on p.id = pbic.place_id
LEFT JOIN (
SELECT
  place_id,
  JSON_ARRAYAGG(
  JSON_OBJECT(
    "id", id, 
    "imageUrls", url
  )
) AS images
FROM
  place_images
GROUP BY
  place_id
) pi ON p.id = pi.place_id
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
INNER JOIN place_additional_information_titles pait on pait.id = paic.additional_information_id
GROUP BY place_id
) paic on p.id = paic.place_id

LEFT JOIN (
SELECT
place_id,
  JSON_ARRAYAGG(
  JSON_OBJECT(
    "user_id", r.user_id,
    "place_id", r.place_id,
    "rating", r.rating,
    "comment", r.comment,
    "created_at", r.created_at
  )
) AS reviewList
FROM reviews r
INNER JOIN users u on r.user_id = u.id
GROUP BY place_id
) r ON p.id = r.place_id
WHERE p.id = ?
*/

/*
JOIN (
  SELECT 
	reviews_of_places_with_tags.tag_id,
    tags.name,
    COUNT(*) AS count
FROM 
	reviews_of_places_with_tags
JOIN 
	tags 
	ON 
	tags.id = reviews_of_places_with_tags.tag_id
WHERE
    reviews_of_places_with_tags.place_id = ? 
GROUP BY
    reviews_of_places_with_tags.tag_id
HAVING
    COUNT(*) > (SELECT COUNT(*) FROM reviews WHERE place_id = 1) / 3
    )
*/

/*  (select libraries.id from libraries 
    JOIN liked_places ON libraries.id = liked_places.libraries_id
    WHERE libraries.user_id = ?)*/
