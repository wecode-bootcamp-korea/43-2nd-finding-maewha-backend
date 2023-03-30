const { appDataSource } = require("./data-source.js");

const getUserById = async (id) => {
  const result = await appDataSource.query(
    `
    SELECT 
    id, 
    social_type_id, 
    social_user_id, 
    name, 
    email,
    gender,
    created_at,
    updated_at
    FROM users
    WHERE id=?`,
    [id]
  );
  return result[0];
};

const createUser = async (email, name, kakaoId, gender) => {
  return appDataSource.query(
    `INSERT INTO users(
      email,
      name,
      social_type_id,
      social_user_id,
      gender
    ) VALUES (
      ?,
      ?,
      1,
      ?,
      ?
    )
    `,
    [email, name, kakaoId, gender]
  );
};

const getUserByKakaoId = async (kakaoId) => {
  const [result] = await appDataSource.query(
    `SELECT
    u.id
    FROM users AS u
    WHERE u.social_user_id=?`,
    [kakaoId]
  );
  return result;
};

module.exports = {
  getUserById,
  createUser,
  getUserByKakaoId,
};
