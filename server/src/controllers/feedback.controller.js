import { setFeedback } from "../services/feedback.service.js";

export async function addFeedback(req, res) {
  try {
    const userId = req.user.id;
    const { section, feedbackType, contentSnapshot } = req.body;

    if (!section || !feedbackType || !contentSnapshot) {
      return res.status(400).json({ error: "Details are missing" });
    }

    const result = await setFeedback(
      userId,
      section,
      feedbackType,
      contentSnapshot,
    );

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Couldn't send feedback." });
  }
}
