import {
  insertPreferences,
  getPreferencesFromDB,
} from "../services/user-preferences.service.js";

export async function getPreferences(req, res, next) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "No user id" });
    }

    const result = await getPreferencesFromDB(userId);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Couldn't get preferences" });
  }
}

export async function setPreferences(req, res, next) {
  try {
    const userId = req.user.id;
    const { typeOfInvestor, assets, interests } = req.body;
    if (!userId || !typeOfInvestor || !assets || !interests) {
      return res.status(400).json({ error: "Details are missing" });
    }

    const result = await insertPreferences(
      userId,
      typeOfInvestor,
      assets,
      interests,
    );
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldnt add preferences" });
  }
}
