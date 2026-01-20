import "dotenv/config";

export async function getCoinPrices(cryptoAssets) {
  const options = {
    method: "GET",
    headers: { "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY },
  };

  cryptoAssets.map((symbol) => symbol.toLowerCase());
  const symbols = cryptoAssets.join(", ");
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&symbols=${symbols}`,
      options,
    );
    const data = await response.json();
    return data;
    // Result for exmple: { btc: { usd: 93196 }, eth: { usd: 3219.22 } }
  } catch (err) {
    console.log("Can't fetch crypto prices");
  }
}
