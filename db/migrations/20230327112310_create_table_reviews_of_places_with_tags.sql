-- migrate:up
CREATE TABLE reviews_of_places_with_tags(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	review_id INT NOT NULL,
	place_id INT NOT NULL,
	tag_id INT NOT NULL,
	CONSTRAINT reviews_of_places_with_tags_place_id_pk FOREIGN KEY (place_id) REFERENCES places (id),
	CONSTRAINT reviews_of_places_with_tags_review_id_pk FOREIGN KEY (review_id) REFERENCES reviews (id),
	CONSTRAINT reviews_of_places_with_tags_tag_id_pk FOREIGN KEY (tag_id) REFERENCES tags (id)
);

-- migrate:down
DROP TABLE reviews_of_places_with_tags;
