import openrouter from "../../clients/openrouter.js";
import { getPreferencesFromDB } from "../user-preferences.service.js";

export async function generateAIInsight(userId) {
  try {
    const user_preferences = await getPreferencesFromDB(userId);

    if (!user_preferences) {
      throw new Error("Preferences don't exist");
    }

    const typeOfInvestor = user_preferences.type_of_onvestor;
    const cryptoAssets = user_preferences.assets;
    const interests = user_preferences.interests;

    const prompt = `Give a short crypto insight of the day for a ${typeOfInvestor}
                    who had discovered interest in ${cryptoAssets} 
                    with content type of ${interests} (so adapt the style of insight to that).
                    Not the prices of the assets, just a short advice.
                    Don't give a line for each asset, make it flow naturally in the conversation.
                    Don't introduce the answer.`;
    return await getAIResponse("google/gemma-3-27b-it:free", prompt);
    
  } catch (err) {
    console.log(err);
    return "Stay disciplined and let your strategy drive decisions, not short-term noise. Focus on understanding why these assets matter in your broader thesis, keep risk sized conservatively, and use today to refine signals, narratives, or patterns that actually align with your investing style—consistency beats clever moves.";
  }
}

async function getAIResponse(model, prompt) {
  const stream = await openrouter.chat.send({
    model: model,
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
}