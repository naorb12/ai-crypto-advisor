import pool from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(email, name, password) {
  try {
    const user = await findUserByEmail(email);
    if (user.rows.length > 0) {
      throw new Error("User with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await pool.query(
      "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name",
      [email, name, hashedPassword],
    );
    if (response.rows.length <= 0) {
      throw new Error("Couldn't insert user to db");
    }

    return response.rows[0];
  } catch (err) {
    throw err;
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await pool.query(
      "SELECT id, name, onboarding_completed FROM users WHERE email = $1",
      [email],
    );
    return user;
  } catch (err) {
    throw err;
  }
}

export async function verifyUserPassword(email, password) {
  try {
    const result = await pool.query(
      "SELECT id, email, name, password FROM users WHERE email = $1",
      [email],
    );

    const hashedPassword = result.rows[0].password;
    const userEmail = result.rows[0].email;
    const userId = result.rows[0].id;

    const isVerified = await bcrypt.compare(password, hashedPassword);

    if (!isVerified) {
      console.log("Password not good");
      return null;
    }

    const token = jwt.sign(
      {
        id: userId,
        email: userEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return token;
  } catch (err) {
    throw err;
  }
}
