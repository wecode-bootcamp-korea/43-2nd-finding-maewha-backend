-- migrate:up
CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	social_type_id INT NOT NULL,
	social_user_id BIGINT NOT NULL,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(200) NOT NULL,
	gender VARCHAR(50) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT users_social_type_fk FOREIGN KEY (social_type_id) REFERENCES social_type (id)
);

-- migrate:down
DROP TABLE users;

