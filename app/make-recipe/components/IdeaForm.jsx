// components/IdeaForm.jsx
"use client";

export default function IdeaForm({ idea, onIdeaChange }) {
  return (
    <textarea
      className="mt-6 resize-none text-gray-800 p-2 rounded-xl w-full h-1/6 focus:outline-2 focus:outline-cyan-600 focus:drop-shadow-md"
      value={idea}
      onChange={(e) => onIdeaChange(e.target.value)}
      placeholder="Describe tu idea de receta..."
    />
  );
}
