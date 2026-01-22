import { getMarketNews } from "./news.service.js";
import { getCoinPrices } from "./prices.service.js";
import { generateAIInsight } from "./ai.service.js";
import { getCryptoMeme } from "./memes.service.js";

export async function buildDashboard(userId) {
  try {
    const newsArticles = await getMarketNews(userId);    
    
    const coinPrices = await getCoinPrices(userId);

    const aiInsight = await generateAIInsight(userId);

    const meme = await getCryptoMeme();

    return {
      newsArticles,
      coinPrices,
      aiInsight,
      meme,
    };
  } catch (err) {
    console.log(err);

    throw err;
  }
}
