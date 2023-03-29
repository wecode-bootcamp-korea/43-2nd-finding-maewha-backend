const { appDataSource } = require("./data-source.js");

const getUserById = async (id) => {
  const result = await appDataSource.query(
    `
    SELECT *
    FROM users
    WHERE id=?`,
    [id]
  );
  return result[0];
};

const createUser = async (email, name, kakaoId, gender) => {
  return appDataSource.query(
    `
    INSERT INTO users(
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

const checkUserByKakaoId = async (kakaoId) => {
  const [result] = await appDataSource.query(
    `SELECT
    u.social_user_id AS socialId
    FROM users AS u
    WHERE u.social_user_id=?`,
    [kakaoId]
  );
  return result;
};

module.exports = {
  getUserById,
  createUser,
  checkUserByKakaoId,
};
