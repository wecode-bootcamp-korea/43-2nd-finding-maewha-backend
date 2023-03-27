-- migrate:up
CREATE TABLE basic_info(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(1000)
);

-- migrate:down
DROP TABLE basic_info;
