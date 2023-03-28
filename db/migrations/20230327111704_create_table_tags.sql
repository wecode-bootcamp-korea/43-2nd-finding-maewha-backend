-- migrate:up
CREATE TABLE tags(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(2000) NOT NULL
);

-- migrate:down
DROP TABLE tags;
