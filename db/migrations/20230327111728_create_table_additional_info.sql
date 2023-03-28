-- migrate:up
CREATE TABLE place_additional_information(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(1000)
);

-- migrate:down
DROP TABLE place_additional_information;
