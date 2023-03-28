-- migrate:up
CREATE TABLE place_basic_information_contents(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	place_id INT NOT NULL,
	basic_information_id INT NOT NULL,
	content VARCHAR(2000) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT place_basic_information_contents_place_id_pk FOREIGN KEY (place_id) REFERENCES places (id),
	CONSTRAINT place_basic_information_contents_basic_information_id_pk FOREIGN KEY(basic_information_id) REFERENCES place_basic_information_titles (id)
);

-- migrate:down
DROP TABLE place_basic_information_contents;
