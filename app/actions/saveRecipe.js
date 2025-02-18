import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export async function saveRecipe(recipe) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  // if (typeof recipe !== "string") {
  //   throw new Error("Recipe content must be a string");
  // }
  console.log("recipe", recipe);

  // Extract the first line of the recipe to use as the title
  const titleMatch = recipe.match(/^.*$/m);
  const title = titleMatch ? titleMatch[0].replace(/^#\s*/, "") : "Untitled";

  const recipeDoc = doc(db, "recipes", `${user.uid}-${Date.now()}`);
  await setDoc(recipeDoc, {
    uid: user.uid,
    title: title,
    content: recipe,
    createdAt: new Date(),
  });
}
