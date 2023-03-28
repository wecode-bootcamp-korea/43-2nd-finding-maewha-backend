-- migrate:up
CREATE TABLE review_likes(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	review_id INT NOT NULL,
	user_id INT NOT NULL,
	CONSTRAINT review_likes_review_id_pk FOREIGN KEY (review_id) REFERENCES reviews (id),
	CONSTRAINT review_likes_user_id_pk FOREIGN KEY (user_id) REFERENCES users (id),
  UNIQUE (review_id, user_id)
);

-- migrate:down
DROP TABLE review_likes;
