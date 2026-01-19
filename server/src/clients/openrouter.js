import "dotenv/config";
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export default openrouter;
