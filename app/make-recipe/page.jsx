"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Components
import IngredientForm from "./components/IngredientForm";
import NavBar from "../Components/NavBar";
import SideBar from "./components/SideBar";
import LoadingCircle from "../Components/LoadingCircle";
// React stuff
import { Suspense, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ToastContainer, toast } from "react-toastify";
import remarkGfm from "remark-gfm";
// Functions or Firebase
import { getRecipeFromClaude } from "../api/chat/route.js";
import withAuth from "@/utils/WithAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import { saveRecipe } from "../actions/saveRecipe";
import NotificationCard from "../Components/Notification";

function MakeRecipePage() {
  const [loading, setLoading] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [userName, setUserName] = useState("");
  const [updateSibebar, setUpdateSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  const router = useRouter();
  const isClearBtnVisible = ingredients.length > 0;

  function clearAllIngredients() {
    setIngredients([]);
  }

  // Fetch userName to display it
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  // Save Recipe handle function
  async function saveRecipeHandle() {
    try {
      setSavedLoading(true);
      await saveRecipe(recipe);
      toast.success(
        <NotificationCard notificationText="Receta guardada con exito!" />
      );
      setUpdateSidebar((prev) => !prev);
      setSavedLoading(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error(
        <NotificationCard notificationText="Error al guardar la receta" />
      );
    }
  }

  // Function to get recipe from AI
  const generateShow = ingredients.length >= 3;
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

  function formDataHandle(formData) {
    const ingredient = formData.get("ingredient");
    setIngredients([...ingredients, ingredient]);
  }

  // Handle delete ingredient array
  function handleDelete(ingredientToDelete) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle displaying a selected recipe
  function handleDisplayRecipe(selectedRecipe) {
    setRecipe(selectedRecipe);
  }

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Toggle Sidebar Button */}
        <button
          className="md:hidden p-2 bg-white text-gray-700 border-2 border-cyan-700 rounded-lg my-2 w-2/4 self-center"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <div className="flex items-center justify-center gap-x-1">
              <p>Mis Recetas </p>
              <Image
                className="rotate-180"
                src="/Icons/icons8-arrow-down.svg"
                width={18}
                height={18}
                alt="down arrow icon"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-x-1">
              <p>Mis Recetas </p>
              <Image
                className=""
                src="/Icons/icons8-arrow-down.svg"
                width={18}
                height={18}
                alt="down arrow icon"
              />
            </div>
          )}
        </button>
        {/* SideBar */}
        <div
          className={`w-full md:w-1/4 border-r-2 p-4 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <SideBar
            updateSibebar={updateSibebar}
            onRecipeClick={handleDisplayRecipe}
          />
        </div>
        {/* LEFT */}
        <div className="w-full md:w-2/4 border-r-2 p-4">
          <h2 className="text-4xl font-bold text-center text-gray-800/90">
            Hola! <span className="text-cyan-700/70">{userName}</span>
          </h2>
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
          <div className="mt-2">
            {isClearBtnVisible && (
              <button
                className="border-cyan-700/70 text-cyan-700/70 border-[2.5px] p-2  rounded-lg mx-auto text-md"
                onClick={clearAllIngredients}
              >
                Borrar Ingredientes
              </button>
            )}
          </div>
          <section className="bg-gray-200/90 p-4 mt-4 rounded-lg h-1/2 overflow-y-scroll  scrollbar-thin">
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

        {/* RIGHT panel (recipe viewer)*/}
        <section className="w-full md:w-3/4 border-r-2 p-4 h-auto">
          <ToastContainer position="bottom-right" hideProgressBar={true} />
          {/* Save Recipe Button */}
          {recipe.length > 2 ? (
            <button
              className="border-cyan-700/70 text-cyan-700/70 border-[3.5px] p-2 font-semibold rounded-lg mx-auto text-lg"
              onClick={saveRecipeHandle}
            >
              {savedLoading ? "Guardando..." : "Guardar Receta"}
            </button>
          ) : null}

          {loading ? (
            <div className="w-fit mx-auto mt-20">
              <LoadingCircle width={100} height={100} />
            </div>
          ) : (
            <Suspense fallback={<LoadingCircle width={100} height={100} />}>
              <ReactMarkdown
                className="prose overflow-y-scroll h-[35%] w-full scrollbar-thin self-center"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {recipe}
              </ReactMarkdown>
            </Suspense>
          )}
        </section>
      </div>
    </div>
  );
}

export default withAuth(MakeRecipePage);
