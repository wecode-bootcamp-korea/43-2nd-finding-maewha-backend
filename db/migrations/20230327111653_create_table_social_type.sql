-- migrate:up
CREATE TABLE social_type(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(500)
);

-- migrate:down
DROP TABLE social_type;
