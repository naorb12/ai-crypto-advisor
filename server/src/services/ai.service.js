import openrouter from "../clients/openRouter.js";

export async function generateAIInsight(typeOfInvestor, cryptoAssets) {
  try {
    const prompt = `Give a short crypto insight of the day for a ${typeOfInvestor}
                    who had discovered interest in ${cryptoAssets}.
                    Not the price, just a short advice in 2 sentences maximum.
                    Don't give a line for each asset, make it flow naturally in the conversation.
                    Don't introduce the answer. Keep it short!.`;
    const stream = await openrouter.chat.send({
      model: "google/gemma-3-27b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      maxTokens: 90,
      stream: true,
    });

    let result = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        result += content;
      }
    }

    return result.trim();
  } catch (err) {
    console.log(err);
  }
}
