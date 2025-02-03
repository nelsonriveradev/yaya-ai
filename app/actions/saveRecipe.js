import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export async function saveRecipe(mdContent) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  const titleMatch = mdContent.match(/^.*/);
  const title = titleMatch ? titleMatch[0] : "Untitled";

  const recipeDoc = doc(db, "recipes", `${user.uid}-${Date.now()}`);
  await setDoc(recipeDoc, {
    uid: user.uid,
    title: title,
    content: mdContent,
    createdAt: new Date(),
  });
}
