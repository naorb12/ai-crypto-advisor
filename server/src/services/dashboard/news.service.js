import "dotenv/config";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { getPreferencesFromDB } from "../user-preferences.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getMarketNews(userId) {
  try {
    const user_preferences = await getPreferencesFromDB(userId);

    if (!user_preferences) {
      throw new Error("Preferences don't exist");
    }

    const cryptoAssets = user_preferences.assets;
    const interests = user_preferences.interests;

    const response = await fetch(
      `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${process.env.CRYPTO_PANIC_API_KEY}&public=true&currencies=${cryptoAssets.join(",")}`,
    );

    if (!response.ok) {
      throw new Error("Couldn't fetch news");
    }

    const data = await response.json();
    const result = getNewByInterests(data, interests);
    return result;
  } catch (err) {
    console.log(err);

    const fallbackNewsPath = join(__dirname, "fallback-news.json");
    const fallbackNews = JSON.parse(readFileSync(fallbackNewsPath, "utf-8"));
    return fallbackNews;
  }
}

function getNewByInterests(data, interests) {
  const interestsSet = new Set(interests);

  if (
    (interestsSet.has("Social") || interestsSet.has("Fun")) &&
    !interestsSet.has("Market News")
  ) {
    const social = data.results.filter(
      (article) =>
        article.kind === "blog" ||
        article.kind === "twitter" ||
        article.kind === "reddit" ||
        article.kind === "media",
    );

    if (social.length >= 4) {
      return social.slice(0, 4);
    }

    if (social.length > 0) {
      const socialIds = new Set(social.map((article) => article.id));
      const remaining = data.results.filter(
        (article) => !socialIds.has(article.id),
      );
      return [...social, ...remaining].slice(0, 4);
    }
  }
  return data.results.slice(0, 4);
}
