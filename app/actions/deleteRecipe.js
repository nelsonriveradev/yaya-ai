import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export async function deleteRecipe(title) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const recipesRef = collection(db, "recipes");
  const q = query(
    recipesRef,
    where("uid", "==", user.uid),
    where("title", "==", title)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error(
      "No matching document found or you do not have permission to delete this document."
    );
  }

  const recipeDoc = querySnapshot.docs[0];
  await deleteDoc(doc(db, "recipes", recipeDoc.id));
}
