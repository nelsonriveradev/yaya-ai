"use client";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import RecipeViewer from "../components/RecipeViewer";

export default function Page() {
  const [updateSibebar, setUpdateSibebar] = useState(false);
  const [recipe, setRecipe] = useState("");

  // Handle displaying a selected recipe
  function handleDisplayRecipe(selectedRecipe) {
    setRecipe(selectedRecipe);
  }
  return (
    <div className="flex gap-x-2">
      <div className="w-1/4 border-r-2 p-2">
        <SideBar onRecipeClick={handleDisplayRecipe} />
      </div>
      <RecipeViewer recipe={recipe} />
    </div>
  );
}
