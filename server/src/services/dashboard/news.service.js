import "dotenv/config";
import { getPreferencesFromDB } from "../user-preferences.service.js";

export async function getMarketNews(userId) {
  try {
    const user_preferences = await getPreferencesFromDB(userId);

    if (!user_preferences) {
      throw new Error("Preferences don't exist");
    }

    const cryptoAssets = user_preferences.assets;
    const interests = user_preferences.interests;
    console.log(cryptoAssets);
    console.log(interests);

    const response = await fetch(
      `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${process.env.CRYPTO_PANIC_API_KEY}&public=true&currencies=${cryptoAssets.join(",")}`,
    );

    if (!response.ok) {
      throw new Error("Couldn't fetch news");
    }

    const data = await response.json();
    const result = getNewByInterests(data, interests);
    console.log(data.results);
    console.log("NOW THE FILTERED!");

    console.log(result);
  } catch (err) {
    console.log(err);

    // FALLBACK STATIC NEWS
  }
}

// Result example:
//  {
//   next: null,
//   previous: null,
//   results: [
//     {
//       id: 28943580,
//       slug: 'Content-Creation-Opportunities-in-the-InfoFi-Era',
//       title: 'Content Creation Opportunities in the InfoFi Era',
//       description: 'Stacy Muur posted on X about the potential for content creators to add value in the new InfoFi epoch. As the digital landscape evolves, there are increasing opportunities for individuals to contribute meaningfully through content creation. This shift presents a chance for creators to leverage their skills and insights to engage audiences and provide valuable information. The InfoFi era emphasizes the importance of innovative and impactful content, encouraging creators to explore new avenues and platforms to share their work',
//       published_at: '2026-01-19T09:15:12Z',
//       created_at: '2026-01-19T09:15:12+00:00',
//       kind: 'news'
//     },
//   }

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
