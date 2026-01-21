import { getMarketNews } from "./news.service.js";
import { getCoinPrices } from "./prices.service.js";
import { generateAIInsight } from "./ai.service.js";
import { getCryptoMeme } from "./memes.service.js";

export async function buildDashboard(userId) {
  try {
    // TODO: replace news with live news
    // const newsArticles = await getMarketNews(userId);
    const newsArticles = [
      {
        id: 28980355,
        slug: "Cardano-Sets-Up-a-Familiar-Bullish-Signal-Here-Is-Why-Whales-Are-Accumulating-Early",
        title:
          "Cardano Sets Up a Familiar Bullish Signal – Here Is Why Whales Are Accumulating Early",
        description:
          "Cardano has established a recognizable bullish signal in the market, indicating promising potential for future price movements. This development has sparked the interest of significant investors, commonly referred to as whales, who are strategically accumulating Cardano tokens at this early stage. The reasons behind their actions can be attributed to a combination of factors, including technical analysis, market trends, and a growing confidence in Cardano's long-term viability and innovation within the cryptocurrency space. As a result, the accumulation patterns of these high-net-worth individuals suggest they are positioning themselves advantageously for upcoming movements in the cryptocurrency market.",
        published_at: "2026-01-20T12:32:39Z",
        created_at: "2026-01-20T12:32:39+00:00",
        kind: "news",
      },
    ];
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
