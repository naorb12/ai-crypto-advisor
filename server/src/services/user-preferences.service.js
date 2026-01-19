import pool from "../database/db.js";

export async function getPreferencesFromDB(userId) {
  try {
    const result = await pool.query(
      "SELECT type_of_investor, assets, interests FROM user_preferences WHERE user_id = $1",
      [userId],
    );

    if (result.rows.length <= 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

export async function insertPreferences(
  userId,
  typeOfInvestor,
  assets,
  interests,
) {
  try {
    const result = await pool.query(
      "INSERT INTO user_preferences VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, typeOfInvestor, assets, interests],
    );

    if (result.rows.length <= 0) {
      throw new Error("Couldn't insert preferences");
    }

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}
