-- migrate:up
CREATE TABLE liked_places(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	libraries_id INT NOT NULL,
	place_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT liked_places_libraries_id_fk FOREIGN KEY (libraries_id) REFERENCES libraries(id),
	CONSTRAINT liked_places_place_id_fk FOREIGN KEY (place_id) REFERENCES places (id)
);

-- migrate:down
DROP TABLE liked_places;
