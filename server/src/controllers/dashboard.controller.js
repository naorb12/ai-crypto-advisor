import { getMarketNews } from "../services/dashboard/news.service.js";
import { getCoinPrices } from "../services/dashboard/prices.service.js";
import { generateAIInsight } from "../services/dashboard/ai.service.js";
import { getCryptoMeme } from "../services/dashboard/memes.service.js";

export async function getNews(req, res) {
  try {
    const userId = req.user.id;
    const newsArticles = await getMarketNews(userId);
    res.status(200).json({ newsArticles });
  } catch (err) {
    if (err.message === "Preferences don't exist") {
      return res.status(400).json({ error: err.message });
    }
    console.error("News error:", err);
    res.status(500).json({ error: "error fetching news" });
  }
}

export async function getPrices(req, res) {
  try {
    const userId = req.user.id;
    const coinPrices = await getCoinPrices(userId);
    res.status(200).json({ coinPrices });
  } catch (err) {
    if (err.message === "Preferences don't exist") {
      return res.status(400).json({ error: err.message });
    }
    console.error("Prices error:", err);
    res.status(500).json({ error: "error fetching prices" });
  }
}

export async function getAIInsight(req, res) {
  try {
    const userId = req.user.id;
    const aiInsight = await generateAIInsight(userId);
    res.status(200).json({ aiInsight });
  } catch (err) {
    if (err.message === "Preferences don't exist") {
      return res.status(400).json({ error: err.message });
    }
    console.error("AI insight error:", err);
    res.status(500).json({ error: "error generating AI insight" });
  }
}

export async function getMeme(req, res) {
  try {
    const meme = await getCryptoMeme();
    res.status(200).json({ meme });
  } catch (err) {
    console.error("Meme error:", err);
    res.status(500).json({ error: "error fetching meme" });
  }
}
