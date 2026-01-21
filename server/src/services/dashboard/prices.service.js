import "dotenv/config";
import { getPreferencesFromDB } from "../user-preferences.service.js";

export async function getCoinPrices(userId) {
  try {
    const user_preferences = await getPreferencesFromDB(userId);

    if (!user_preferences) {
      throw new Error("Preferences don't exist");
    }

    const cryptoAssets = user_preferences.assets;
    cryptoAssets.map((symbol) => symbol.toLowerCase());
    const symbols = cryptoAssets.join(", ");

    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY },
    };

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&symbols=${symbols}`,
      options,
    );
    const data = await response.json();
    return data;
    // Result for exmple: { btc: { usd: 93196 }, eth: { usd: 3219.22 } }
  } catch (err) {
    console.log("Can't fetch crypto prices");
    // TODO: FALLBACK
  }
}
