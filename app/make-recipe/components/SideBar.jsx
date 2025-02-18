"use client";
import { fetchRecipes } from "../../actions/fetchRecipes";
import { deleteRecipe } from "../../actions/deleteRecipe";
import { truncateText } from "../../../utils/truncateText";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SideBar({ updateSibebar, onRecipeClick }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    async function fetchSavedRecipes() {
      try {
        const recipes = await fetchRecipes();
        setSavedRecipes(Array.isArray(recipes) ? recipes : []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setSavedRecipes([]);
      }
    }
    fetchSavedRecipes();
  }, [updateSibebar]);

  async function deleteRecipeHandle(title) {
    try {
      await deleteRecipe(title);
      setSavedRecipes((prev) =>
        prev.filter((recipe) => recipe.title !== title)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error al borrar la receta", error);
    }
  }
  return (
    <div className="">
      <h1 className=" hidden md:block text-xl text-center font-semibold text-gray-700 mb-3">
        Mis recetas
      </h1>
      <div className=" flex flex-col items-center">
        {savedRecipes.length === 0 ? (
          <p>No hay recetas guardadas</p>
        ) : (
          savedRecipes.map((recipe) => (
            <div
              key={recipe.title}
              className="flex items-center justify-between border-2 border-cyan-700/75 px-4 py-1 mb-2 rounded-md gap-x-2 w-5/6 hover:bg-cyan-700/75 "
            >
              <button
                onClick={() => onRecipeClick(recipe.content)}
                className=""
              >
                <p className="text-gray-700 hover:underline hover:text-white">
                  {truncateText(recipe.title.replace(/^#\s*/, ""), 20)}
                </p>
              </button>
              <button
                onClick={() => deleteRecipeHandle(recipe.title)}
                className=" rounded-md "
              >
                <Image
                  className="cursor-pointer min-w-<18> min-h-<18>"
                  src="https://img.icons8.com/ios/50/delete-forever--v1.png"
                  width={20}
                  height={20}
                  alt="delete icon"
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
