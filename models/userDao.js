const { appDataSource } = require("./data-source.js");

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
  createUser,
  checkUserByKakaoId,
};
