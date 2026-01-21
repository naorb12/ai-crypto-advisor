import "dotenv/config";

export async function getCryptoMeme() {
  try {
    const res = await fetch(
      "https://www.reddit.com/r/cryptocurrencymemes/hot.json?limit=50",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const json = await res.json();

    const posts = json.data.children
      .map((c) => c.data)
      .filter((p) => p.post_hint === "image" && !p.over_18);

    if (!posts.length) {
      console.log("No meme found");
      return null;
    }

    const meme = posts[Math.floor(Math.random() * posts.length)];

    console.log("MEME:");
    console.log({
      title: meme.title,
      url: meme.url,
      upvotes: meme.ups,
      subreddit: meme.subreddit,
    });

    return {
      title: meme.title,
      url: meme.url,
      upvotes: meme.ups,
      subreddit: meme.subreddit,
    };
    // Result for example:
    // {
    // title: 'Banks, lawsuits and other cool stories',
    // url: 'https://i.redd.it/lj4y5wbh5idg1.jpeg',
    // upvotes: 92,
    // subreddit: 'cryptocurrencymemes'
    // }
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
