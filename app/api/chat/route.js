// prettier-ignore
"use server"
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();
const SYSTEM_PROMPT =
  "You are an assistant called 'Yaya' that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. If you receive all ingredients in Spanish please respond the recipe in Spanish";
// USE ACTIONS.JS NEXT!!!!
export async function getRecipeFromClaude(ingredientsText) {
  const apiCLaudeKey = process.env.ANTHROPIC_API_KEY;
  const anthropic = new Anthropic({
    apiKey: apiCLaudeKey,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${apiCLaudeKey}`,
    },
  });

  try {
    const res = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      system: SYSTEM_PROMPT,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `I have this ingredients ${ingredientsText}. Can you suggest a recipe for me to make?`,
        },
      ],
    });
    return res.content[0].text;
  } catch (error) {
    return error;
  }
}
