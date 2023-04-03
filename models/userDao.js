const { appDataSource } = require("./data-source.js");

const getLibraries = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT 
      id,
      name,
      created_at,
      updated_at
      FROM libraries 
      WHERE user_id = ?`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getPlacesInLibrary = async (userId, libraryId) => {
  try {
    return await appDataSource.query(
      `SELECT
      li.id AS libraryId,
      li.name AS libraryName, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "placeId", lp.place_id,
          "placeName", pl.name,
          "reviewRating", (SELECT COALESCE(AVG(rating), 0)
                      FROM reviews
                      WHERE place_id = lp.place_id),
          "reviewCount", (SELECT COUNT(*)
                      FROM reviews
                      WHERE place_id = lp.place_id)
        )
      )AS places
      FROM libraries AS li 
      JOIN liked_places AS lp ON li.id = lp.libraries_id
      JOIN places AS pl ON pl.id = lp.place_id
      WHERE li.user_id = ? AND lp.libraries_id = ?

      `,
      [userId, libraryId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};
const deletePlaceLike = async (userId, placeId) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    let userCheck = 1;
    const checkOwner = await queryRunner.query(
      `SELECT *
      FROM libraries
      JOIN liked_places
      ON 
      libraries.id = liked_places.libraries_id
      WHERE libraries.user_id = ? 
      AND liked_places.place_id = ?
      `,
      [userId, placeId]
    );
    if ((checkOwner[0].id = undefined)) {
      validUser = 0;
      throw err;
    }

    await queryRunner.query(
      `DELETE 
      FROM liked_places 
      WHERE place_id = ?
      AND libraries_id IN (SELECT id 
        FROM libraries
        WHERE user_id =?)
      `,
      [placeId, userId]
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    if ((validUser = 0)) {
      const error = new Error("NOT_YOUR_LIBRARY");
      await queryRunner.rollbackTransaction();
      err.statusCode = 400;
      throw error;
    } else {
      const error = new Error("INVALID_DATA_INPUT");
      error.statusCode = 400;
      throw error;
    }
  }
};

const deleteLibrary = async (userId, libraryId) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    let userCheck = 1;
    const checkOwner = await queryRunner.query(
      `SELECT * FROM libraries
			WHERE id = ? AND user_id = ?
			`,
      [libraryId, userId]
    );
    if ((checkOwner[0].id = undefined)) {
      userCheck = 0;
      throw err;
    }

    await queryRunner.query(
      `DELETE
      FROM liked_places
      WHERE libraries_id = ?
      `,
      [libraryId]
    );

    await queryRunner.query(
      `DELETE
      FROM libraries
      WHERE id = ? AND user_id = ?
      `,
      [libraryId, userId]
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    if ((userCheck = 0)) {
      const error = new Error("NOT_YOUR_LIBRARY");
      await queryRunner.rollbackTransaction();
      err.statusCode = 400;
      throw error;
    } else {
      const error = new Error("INVALID_DATA_INPUT");
      error.statusCode = 400;
      throw error;
    }
  }
};

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
  getLibraries,
  getPlacesInLibrary,
  deletePlaceLike,
  deleteLibrary,
};
