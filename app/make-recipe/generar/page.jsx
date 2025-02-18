// app/make-recipe/generate/page.jsx
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import IngredientForm from "../components/IngredientForm";
import IdeaForm from "../components/IdeaForm";
import RecipeViewer from "../components/RecipeViewer";
import { getRecipeByIdea, generateRecipeByIngredients } from "../actions";
import { saveRecipe } from "@/app/actions/saveRecipe";
import NotificationCard from "@/app/Components/Notification";
import { ToastContainer, toast } from "react-toastify";
export default function GenerateForms() {
  // State to store user input from forms
  const [ingredients, setIngredients] = useState([]); // Stores ingredient list
  const [idea, setIdea] = useState(""); // Stores recipe idea
  const [recipe, setRecipe] = useState(""); // Stores generated recipe
  const [loading, setLoading] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [apiLimit, setApiLimit] = useState();
  const [savingRecipe, setSavingRecipe] = useState(false);

  // Check if user has reached API limit

  // Function to update ingredients list
  const handleIngredientsChange = (newIngredients) => {
    setIngredients(newIngredients);
  };
  // delete all ingredients
  function deleteAllIngredients() {
    setIngredients([]);
  }

  // Function to update recipe idea
  const handleIdeaChange = (newIdea) => {
    setIdea(newIdea);
  };

  // Function to generate a recipe (using API)
  async function getRecipe() {
    try {
      setLoading(true);
      const recipeResponse = await generateRecipeByIngredients(ingredients);
      setRecipe(recipeResponse);
      console.log(apiLimit);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error generating recipe:", error);
    }
  }

  async function getRecipeIdea() {
    setLoading(true);
    const recipeResponse = await getRecipeByIdea(idea);
    setRecipe(recipeResponse);
    setLoading(false);
  }

  function recipeFunc() {
    if (selectedComponent === "ingredientes") {
      getRecipe();
    } else if (selectedComponent === "idea") {
      getRecipeIdea();
    }
  }

  async function handleRecipeSave() {
    try {
      setSavingRecipe(true);
      await saveRecipe(recipe);
      toast.success("Receta guardada con éxito");
      setSavingRecipe(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error("Error al guardar la receta");
    }
  }

  return (
    <div className="flex gap-x-1 w-full border-r-2 p-4">
      <ToastContainer position="top-right" stacked="true" />
      {/* Left - Form Selector */}
      <div className="w-2/6 px-2 border-r-2">
        <select
          className="block w-full p-2  border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
        >
          <option value="">Selecciona un método</option>
          <option value="ingredientes">Ingredientes Disponibles</option>
          <option value="idea">Escribe tu idea</option>
        </select>

        {/* Render the correct form */}
        {selectedComponent === "ingredientes" && (
          <IngredientForm
            ingredients={ingredients}
            onIngredientsChange={handleIngredientsChange}
          />
        )}
        {selectedComponent === "idea" && (
          <IdeaForm idea={idea} onIdeaChange={handleIdeaChange} />
        )}

        {/* Generate Recipe Button */}
        <div className="">
          {ingredients.length > 0 && (
            <button
              className=" text-gray-800  py-2 no-underline  px-4 mt-4 rounded hover:bg-transparent hover:text-cyan-600/70 hover:underline"
              onClick={deleteAllIngredients}
            >
              Borrar ingredientes
            </button>
          )}
        </div>
        {selectedComponent === "" ? null : (
          <div className="flex justify-between items-center">
            <button
              onClick={() => recipeFunc()}
              className={`${
                loading ? "bg-cyan-600/70" : "bg-cyan-700"
              } text-white px-2 py-1 mt-4 rounded border-2 border-transparent hover:bg-transparent hover:text-cyan-600 hover:border-cyan-600 ${
                loading && "animate-pulse"
              }`}
              disabled={loading}
            >
              {loading ? <p>Generando 🔥</p> : <p>Generar Receta 🍳</p>}
            </button>

            {/* Save Recipe Button */}
            <button
              className=" text-cyan-700 py-1 px-2 mt-4 border-2 border-transparent rounded hover:bg-transparent hover:text-cyan-600 hover:border-cyan-600"
              onClick={handleRecipeSave}
            >
              Guardar Receta
            </button>
          </div>
        )}
      </div>

      {/* Right - Recipe Viewer */}
      <RecipeViewer loading={loading} recipe={recipe} />
    </div>
  );
}
