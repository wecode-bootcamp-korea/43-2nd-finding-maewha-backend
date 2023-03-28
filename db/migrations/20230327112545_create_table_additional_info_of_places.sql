-- migrate:up
CREATE TABLE place_additional_information_contents(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	place_id INT NOT NULL,
	additional_information_id INT NOT NULL,
	content VARCHAR(300) NOT NULL,
	gender VARCHAR(100) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT place_additional_contents_place_id_pk FOREIGN KEY (place_id) REFERENCES places (id),
	CONSTRAINT place_additional_contents_additional_information_id_pk FOREIGN KEY(additional_information_id) REFERENCES place_additional_information_titles (id)
);

-- migrate:down
DROP TABLE place_additional_information_contents;
