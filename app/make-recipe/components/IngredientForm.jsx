// components/IngredientForm.jsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function IngredientForm({ ingredients, onIngredientsChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    onIngredientsChange([...ingredients, inputValue]); // Send new list to parent
    setInputValue(""); // Clear input
  };

  const handleDelete = (ingredientToDelete) => {
    onIngredientsChange(
      ingredients.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  };

  return (
    <div className="mt-8 ">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className=" border-cyan-600 p-2 rounded-lg focus:outline-2 focus:outline-cyan-600"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añadir ingrediente..."
        />
        <button
          type="submit"
          className="bg-cyan-600 text-white border-2 border-transparent px-2 py-1 rounded hover:bg-cyan-600/60 hover:border-cyan-600 "
        >
          <Image
            src="/Icons/icons8-checkmark.svg"
            width={22}
            height={22}
            alt="check-mark icon"
          />
        </button>
      </form>

      <ul className="mt-4 h-32 overflow-y-scroll scrollbar-thin scroll-smooth border-2 border-gray-500 rounded-lg shadow-sm">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex justify-between items-center  p-2 gap-y-3"
          >
            {ingredient}
            <button
              onClick={() => handleDelete(ingredient)}
              className="text-red-500"
            >
              <Image
                src="/Icons/icons8-delete-red.svg"
                width={14}
                height={14}
                alt="delete icon"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
