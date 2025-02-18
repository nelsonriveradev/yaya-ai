// app/api/apiService.js
import { getRecipeFromClaude } from "@/app/api/chat/route";
import { generateRecipeByIdea } from "@/app/api/chat/route";
import { auth, db } from "@/app/lib/firebase";
import { setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const generateRecipeByIngredients = async (ingredients) => {
  try {
    return await getRecipeFromClaude(ingredients);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return "";
  }
};

export const getRecipeByIdea = async (idea) => {
  try {
    const responseIdea = await generateRecipeByIdea(idea);
    console.log("responseIdea", responseIdea);
    return responseIdea;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return "";
  }
};
