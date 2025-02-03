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
    <div>
      <h1 className=" hidden md:block text-xl text-center font-semibold text-gray-700 mb-3">
        Mis recetas
      </h1>
      <div>
        {savedRecipes.length === 0 ? (
          <p>No hay recetas guardadas</p>
        ) : (
          savedRecipes.map((recipe) => (
            <div
              key={recipe.title}
              className="flex justify-center border-2 border-cyan-700/75 px-2 py-1 mb-2 rounded-md gap-x-1"
            >
              <button
                onClick={() => onRecipeClick(recipe.content)}
                className=""
              >
                <p className="text-gray-700 ">
                  {truncateText(recipe.title, 20)}
                </p>
              </button>
              <button
                onClick={() => deleteRecipeHandle(recipe.title)}
                className="py-1 px-2 rounded-md mb-2"
              >
                <Image
                  className="cursor-pointer min-w-<18> min-h-<18>"
                  src="/Icons/icons8-delete-red.svg"
                  width={18}
                  height={18}
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
