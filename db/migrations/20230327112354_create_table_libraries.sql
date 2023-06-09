-- migrate:up
CREATE TABLE libraries(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	name VARCHAR(200),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT libraries_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE libraries;
