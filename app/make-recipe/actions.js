// app/api/apiService.js
import { getRecipeFromClaude } from "@/app/api/chat/route";
import { generateRecipeByIdea } from "@/app/api/chat/route";
import { auth, db } from "@/app/lib/firebase";

import {
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  collection,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

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

export const checkAndUpdateApiUsage = async (userId) => {
  try {
    const API_CALLS_LIMIT = 10;
    const USAGE_COLLECTION = "apiUsage";

    //get ref to the user API usage document

    const userApiUsageRef = doc(db, USAGE_COLLECTION, userId);
    const userApiUsageDoc = await getDoc(userApiUsageRef);

    const currentDate = new Date();
    const firstDayofMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    if (
      !userApiUsageDoc.exists() ||
      userApiUsageDoc.data().lastResetDate.toDate() < firstDayofMonth
    ) {
      await setDoc(userApiUsageRef, {
        userId,
        callsCount: 1,
        lastResetDate: Timestamp.fromDate(currentDate),
      });
      return false;
    }

    const currentUsage = userApiUsageDoc.data().callsCount;
    if (currentUsage >= API_CALLS_LIMIT) {
      return true;
    } else {
      // Increment the usage count
      await setDoc(userApiUsageRef, {
        userId,
        callsCount: currentUsage + 1,
        lastResetDate: userApiUsageDoc.data().lastResetDate,
      });
      return false;
    }
  } catch (error) {
    console.error("Error checking API usage:", error);
    return "";
  }
};

export const fetchApiUsage = async (userId) => {
  try {
    const USAGE_COLLECTION = "apiUsage";

    const userApiUsageRef = doc(db, USAGE_COLLECTION, userId);
    const userApiUsageDoc = await getDoc(userApiUsageRef);
    return userApiUsageDoc.data().callsCount;
  } catch (error) {
    toast.error("Error al obtener el uso de la API");
    console.error("Error fetching API usage:", error);
    return;
  }
};
