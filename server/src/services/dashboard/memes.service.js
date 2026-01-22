import "dotenv/config";

export async function getCryptoMeme() {
  try {
    const res = await fetch(
      "https://meme-api.com/gimme/cryptocurrencymemes/50",
    );
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const json = await res.json();

    const posts = json.memes.filter((m) => !m.nsfw);

    if (!posts.length) {
      return null;
    }

    const meme = posts[Math.floor(Math.random() * posts.length)];

    return {
      title: meme.title,
      url: meme.url,
      upvotes: meme.ups,
      subreddit: meme.subreddit,
    };
  } catch (err) {
    console.log(err);
    return {
      title: "Default Crypto Meme",
      url: `${process.env.SERVER_URL || "http://localhost:3000"}/def-crypto-meme.png`,
      upvotes: 0,
      subreddit: "default",
    };
  }
}
