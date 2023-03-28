-- migrate:up
CREATE TABLE additional_information_of_places(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	place_id INT NOT NULL,
	additional_information_id INT NOT NULL,
	content VARCHAR(300) NOT NULL,
	gender VARCHAR(100) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT additional_information_of_places_place_id_pk FOREIGN KEY (place_id) REFERENCES places (id),
	CONSTRAINT additional_information_of_places_additional_information_id_pk FOREIGN KEY(additional_information_id) REFERENCES place_additional_information (id)
);

-- migrate:down
DROP TABLE additional_information_of_places;
