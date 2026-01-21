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
    id: 28995155,
    slug: 'When-You-HearSell-Bitcoin-in-Public',
    title: 'When You Hear"Sell Bitcoin" in Public',
    description: 'When you hear "Sell Bitcoin" in public. Check out our Crypto Prediction Market Game Surge: https://wesurgenow. com/ REFERRAL LINKS ✅Bitunix: https://bit. ly/BITUNIX-Gift 🔥Get up to $4,00,000 | Welcome Bonus | No KYC ✅ Weex https://bit',
    published_at: '2026-01-20T22:00:00Z',
    created_at: '2026-01-20T22:00:00+00:00',
    kind: 'media'
  },
  {
    id: 28996540,
    slug: 'Bitcoin-Slips-Below-90000-as-Crypto-Market-Sell-Off-Deepens',
    title: 'Bitcoin Slips Below $90,000 as Crypto Market Sell-Off Deepens',
    description: 'According to market data, Bitcoin fell to around $89,400, marking a daily decline of nearly four percent and extending weekly [&#8230;] The post Bitcoin Slips Below $90,000 as Crypto Market Sell-Off Deepens appeared first on Coindoo.',
    published_at: '2026-01-20T22:30:56Z',
    created_at: '2026-01-20T22:30:56+00:00',
    kind: 'news'
  },
  {
    id: 28996503,
    slug: 'Altcoin-market-sees-sharp-drawdown-as-selling-pressure-accelerates',
    title: 'Altcoin market sees sharp drawdown as selling pressure accelerates',
    description: 'The altcoin market extended its sell-off as the total crypto market cap excluding Bitcoin dropped to around $1. 2 trillion.',
    published_at: '2026-01-20T22:30:15Z',
    created_at: '2026-01-20T22:30:15+00:00',
    kind: 'news'
  },
  {
    id: 28996541,
    slug: 'New-ChatGPT-Predicts-the-Price-of-XRP-Bitcoin-and-Dogecoin-By-the-End-of-2026', 
    title: 'New ChatGPT Predicts the Price of XRP, Bitcoin and Dogecoin By the End of 2026',
    description: 'ChatGPT has mapped a bullish 2026 scenario that puts Bitcoin near $220000, sees XRP targeting $10 by 2027, and expects Dogecoin to clear $1. It has tied the outlook to U. S. regulatory shifts, ETF demand, and macro cooling, while warning that FOMO can skew entries. It flags Greenland tariff risk too.',
    published_at: '2026-01-20T22:30:00Z',
    created_at: '2026-01-20T22:30:00+00:00',
    kind: 'news'
  }
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
