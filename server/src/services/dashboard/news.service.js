import "dotenv/config";

export async function getMarketNews() {
  try {
    const response = await fetch(
      `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${process.env.CRYPTO_PANIC_API_KEY}&public=true`,
    );

    if (!response.ok) {
      throw new Error("Couldn't fetch news");
    }

    const json = await response.json();

    console.log(json);
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
