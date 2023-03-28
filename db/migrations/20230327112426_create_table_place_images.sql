-- migrate:up
CREATE TABLE place_images(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	place_id INT NOT NULL,
	url VARCHAR(3000),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT place_images_place_id_fk FOREIGN KEY (place_id) REFERENCES places (id)
);

-- migrate:down
DROP TABLE place_images;
