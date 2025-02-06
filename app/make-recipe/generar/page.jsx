"use client";
import IngredientForm from "../components/IngredientForm";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getRecipeFromClaude } from "@/app/api/chat/route";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { saveRecipe } from "@/app/actions/saveRecipe";
import LoadingCircle from "@/app/Components/LoadingCircle";
import Reader from "@/app/Components/Reader";
import { ToastContainer, toast } from "react-toastify";
import NotificationCard from "@/app/Components/Notification";
export default function GenerateForms() {
  //States
  const [ingredients, setIngredients] = useState(["arroz", "pollo", "papa"]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [savedLoading, setSavedLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

  //Conditional renders controls
  const generateShow = ingredients.length >= 3;
  const isClearBtnVisible = ingredients.length > 0;

  //Form data handle
  function formDataHandle(formData) {
    const ingredient = formData.get("ingredient");
    setIngredients([...ingredients, ingredient]);
  }

  function clearAllIngredients() {
    setIngredients([]);
  }

  // handle delete ingredient array
  function formDataHandle(formData) {
    const ingredient = formData.get("ingredient");
    setIngredients([...ingredients, ingredient]);
  }
  //Function to get recipe from AI
  async function getRecipe() {
    setLoading(true);
    try {
      const recipeResponse = await getRecipeFromClaude(ingredients);
      setRecipe(recipeResponse);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  }

  // save recipe handle function
  async function saveRecipeHandle() {
    try {
      setSavedLoading(true);
      await saveRecipe(recipe);
      toast.success(
        <NotificationCard notificationText="Receta guardada con exito!" />
      );
      setSavedLoading(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error(
        <NotificationCard notificationText="Error al guardar la receta" />
      );
    }
  }
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Handle delete ingredient array
  function handleDelete(ingredientToDelete) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  }

  return (
    <div className="flex gap-x-1 w-full  border-r-2 p-4">
      {/* Left */}
      <div className="w-2/4 px-2 border-r-2">
        <h1 className="text-2xl font-semibold text-center text-gray-800/90">
          Ingresa tu ingredientes 🥗
        </h1>
        <div className="">
          <div className="">
            <IngredientForm
              ingredients={ingredients}
              formDataHandle={formDataHandle}
              getRecipe={getRecipe}
              loading={loading}
              generateShow={generateShow}
            />
          </div>
        </div>
        {/* Clear BTN */}
        <div className="flex gap-x-2 mt-2">
          {isClearBtnVisible && (
            <button
              className="border-cyan-700/70 text-cyan-700/70 border-[2.5px] p-2  rounded-lg mx-auto text-md"
              onClick={clearAllIngredients}
            >
              Borrar Ingredientes
            </button>
          )}
          {/* Save Recipe Button */}
          {recipe.length > 2 ? (
            <button
              className="border-cyan-700/70 text-cyan-700/70 border-[3.5px] p-2 font-semibold rounded-lg mx-auto text-lg"
              onClick={saveRecipeHandle}
            >
              {savedLoading ? "Guardando..." : "Guardar Receta"}
            </button>
          ) : null}
          <ToastContainer position="top-right" hideProgressBar={true} />
        </div>
        <section className="bg-gray-200/90 p-4 mt-4 rounded-lg max-h-48 overflow-y-scroll  scrollbar-thin">
          <h3 className="text-xl text-gray-700/90 text-center mt-3 ml-1">
            Ingredientes disponible:
          </h3>
          <div className=" border-r-2 space-y-2 mt-4 ">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient}
                className="flex justify-center gap-x-3 items-center"
              >
                <p className="text-gray-700 text-xl text-center font-semibold">
                  {ingredient}
                </p>
                <button onClick={() => handleDelete(ingredient)}>
                  <Image
                    src="/Icons/icons8-delete-red.svg"
                    width={18}
                    height={18}
                    alt="delete icon"
                  />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Right */}
      <div className="w-3/4">
        {loading ? (
          <div className="w-fit mx-auto mt-20">
            <LoadingCircle width={75} height={75} />
          </div>
        ) : (
          <Reader recipe={recipe} />
        )}
      </div>
    </div>
  );
}
