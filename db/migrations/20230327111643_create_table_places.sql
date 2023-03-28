-- migrate:up
CREATE TABLE places(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	social_id VARCHAR(3000),
	name VARCHAR(1000) NOT NULL,
	address VARCHAR(3000) ,
	thumbnail VARCHAR(3000),
	description VARCHAR(300),
	latitude DECIMAL(18, 14),
	longitude DECIMAL(18, 14)
);

-- migrate:down
DROP TABLE places;
