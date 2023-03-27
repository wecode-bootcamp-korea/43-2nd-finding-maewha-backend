const { appDataSource } = require("./data-source");

const createUser = async (email, name, kakaoid, gender) => {
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
    [email, name, kakaoid, gender]
  );
};

const checkUserbyKakaoid = async (kakaoId) => {
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
  checkUserbyKakaoid,
};
