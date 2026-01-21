import pool from "../database/db.js";

export async function setFeedback(
  userId,
  section,
  feedbackType,
  contentSnapshot,
) {
  try {
    const result = await pool.query(
      `INSERT INTO dashboard_feedback (user_id, section, feedback_type, content_snapshot) VALUES ($1, $2, $3, $4)`,
      [userId, section, feedbackType, JSON.stringify(contentSnapshot)],
    );

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}
