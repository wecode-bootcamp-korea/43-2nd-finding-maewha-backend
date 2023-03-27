-- migrate:up
CREATE TABLE additional_info(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(1000)
);

-- migrate:down
DROP TABLE additional_info;
