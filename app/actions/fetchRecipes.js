import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export async function fetchRecipes() {
  const user = auth.currentUser;
  if (!user) {
    return;
  }

  const recipesRef = collection(db, "recipes");
  const q = query(recipesRef, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  const recipe = [];
  querySnapshot.forEach((doc) => {
    recipe.push(doc.data());
  });
  console.log(querySnapshot);

  return recipe;
}
