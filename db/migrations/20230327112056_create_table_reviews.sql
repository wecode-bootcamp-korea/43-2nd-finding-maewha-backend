-- migrate:up
CREATE TABLE reviews(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	place_id INT NOT NULL,
	rating DECIMAL(2, 1) NOT NULL,
	comment VARCHAR(3000),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT reviews_user_id_pk FOREIGN KEY (user_id) REFERENCES users (id),
	CONSTRAINT reviews_place_id_pk FOREIGN KEY (place_id) REFERENCES places (id)
);

-- migrate:down
DROP TABLE reviews;