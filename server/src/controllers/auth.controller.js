import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  verifyUserPassword,
} from "../services/auth.service.js";

export async function signUp(req, res, next) {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: "Details are missing" });
    }
    const response = await createUser(email, name, password);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    if (err.message === "User with this email already exists.") {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: "Can't sign up" });
  }
}

export async function logIn(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Details are missing" });
    }

    const users = await findUserByEmail(email);
    if (users.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "User with this email doesn't exist" });
    }

    const token = await verifyUserPassword(email, password);
    if (!token) {
      res.status(401).json({ error: "Password incorrect." });
    }
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ error: "Can't log in" });
  }
}
